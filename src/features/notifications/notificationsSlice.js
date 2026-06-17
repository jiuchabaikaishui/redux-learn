import { 
    createSlice, 
    createAsyncThunk, 
    createEntityAdapter, 
    createSelector,
    createAction,
    isAnyOf
 } from "@reduxjs/toolkit";
import { client } from "../../api/client";

import { apiSlice } from "../api/apiSlice";

import { forceGenerateNotifications } from "../../api/server";

const notificationsReceived = createAction('notifications/notificationsReceived')

export const apiSliceWithNotifications = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query({
            query: () => '/notifications',
            async onCacheEntryAdded(arg, lifecycleApi) {
                // 当开始订阅缓存时创建一个websocket连接
                const ws = new WebSocket('ws://localhost')
                try {
                    // 等待初始查询解析后再继续
                    await lifecycleApi.cacheDataLoaded
                    // 当从 socket 连接到服务器接收数据时，使用接收到的消息更新查询结果
                    const listener = (event) => {
                        const message = JSON.parse(event.data)

                        switch (message.type) {
                            case 'notifications':
                                // 插入所有从websocket接收到的通知到现有的RTKQ缓存数组
                                lifecycleApi.updateCachedData(draft => {
                                    draft.push(...message.payload)
                                    draft.sort((a, b) => b.date.localeCompare(a.date))
                                })

                                // 调度一个额外的动作，这样就可以跟踪“read”状态
                                lifecycleApi.dispatch(notificationsReceived(message.payload))
                                break;
                            default:
                                break;
                        }
                    }
                    ws.addEventListener('message', listener)
                } catch {
                    //如果‘ cacheEntryRemoved ’在‘ cacheDataLoaded ’之前被解析，在这种情况下 cacheDataLoaded 将抛出
                }

                // 当缓存订阅不再激活时，cacheEntryRemoved将解析
                await lifecycleApi.cacheEntryRemoved
                // 一旦 cacheEntryRemoved 承诺被解析，执行清理步骤
                ws.close()
            }
        })
    })
})

export const { useGetNotificationsQuery } = apiSliceWithNotifications

const matchNotificationsReceived = isAnyOf(notificationsReceived, apiSlice.endpoints.getNotifications.matchFulfilled)

export const selectNotificationsResult = apiSliceWithNotifications.endpoints.getNotifications.select
const selectNotificationsData = createSelector(selectNotificationsResult, notificationsResult => notificationsResult.data ?? [])
export const fetchNotificationsWebsocket = () => (dispatch, getState) => {
    const allNotifications = selectNotificationsData(getState())
    console.log('allNotifications: ', allNotifications);
    const [latestNotification = {}] = allNotifications
    console.log('latestNotification: ', latestNotification);
    const latestTimestamp = latestNotification.date ? latestNotification : ''
    console.log('latestTimestamp: ', latestTimestamp);
    
    // 硬编码调用模拟服务器，模拟 websockets 服务器推送场景
    forceGenerateNotifications(latestTimestamp)
}

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_unuse, thunkApi) => {
    // 删除 时间戳
    const response = await client.get(`/fakeApi/notifications`)
    return response.data
})

const metadataAdapter = createEntityAdapter()
const initialState = metadataAdapter.getInitialState()

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        allNotificationsRead(state) {
            // 重命名 `metadata`
            Object.values(state.entities).forEach(metadata => {
                metadata.read = true
            });
        }
    },
    extraReducers: (builder) => {
        // 使用 addMatcher 监听端点 matchcompleted 操作
        builder.addMatcher(matchNotificationsReceived, (state, action) => {
            console.log('fetchNotifications payload: ', action.payload);
            
            // 添加用于跟踪新通知的客户端元数据
            const notificationsWithMetadata = action.payload.map(notification => ({
                id: notification.id,
                read: false,
                isNew: true
            }))

            // 重命名 `metadata`
            Object.values(state.entities).forEach(metadata => {
                metadata.isNew = !metadata.read
            })
            metadataAdapter.upsertMany(state, notificationsWithMetadata)
        })
    }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

// 重命名 选择器
export const {
    selectAll: selectAllNotificationsMetadata,
    selectEntities: selectMetadataEntities
} = metadataAdapter.getSelectors((state) => {
    return state.notifications
})

export const selectUnreadNotificationsCount = (state) => {
    const allMetadata = selectAllNotificationsMetadata(state)
    const unreadNotifications = allMetadata.filter(metadata => !metadata.read)
    return unreadNotifications.length
}

// // export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_unuse, thunkApi) => {
// //     const allNotifications = selectAllNotifications(thunkApi.getState())
// //     const [latestNotification] = allNotifications
// //     const latestTimestamp = latestNotification ? latestNotification.date : ''
// //     const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
// //     return response.data
// // })

// const notificationsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => b.date.localeCompare(a.date)
// })
// const initialState = notificationsAdapter.getInitialState()

// const notificationsSlice = createSlice({
//     name: 'notifications',
//     initialState,
//     reducers: {
//         allNotificationsRead(state) {
//             Object.values(state.entities).forEach(notification => {
//                 notification.read = true
//             });
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchNotifications.fulfilled, (state, action) => {
//             console.log('fetchNotifications payload: ', action.payload);
            
//             const notificationsWithMetadata = action.payload.map(notification => ({
//                 ...notification,
//                 read: false,
//                 isNew: true
//             }))
//             Object.values(state.entities).forEach(notification => {
//                 notification.isNew = !notification.read
//             })
//             notificationsAdapter.upsertMany(state, notificationsWithMetadata)
//         })
//     }
// })

// export const {allNotificationsRead} = notificationsSlice.actions

// export const {
//     selectAll: selectAllNotifications, 
//     selectById: selectNotificationById,
//     selectIds: selectNotificationIds
// } = notificationsAdapter.getSelectors(state => state.notifications)

// export const selectUnreadNotificationsCount = state => {
//     const allNotifications = selectAllNotifications(state)
//     return allNotifications.filter(notification => !notification.read).length
// }

// export default notificationsSlice.reducer