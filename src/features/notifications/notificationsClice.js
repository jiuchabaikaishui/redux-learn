import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_unuse, thunkApi) => {
    const allNotifications = selectAllNotifications(thunkApi.getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
    return response.data
})

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = notificationsAdapter.getInitialState()

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        allNotificationsRead(state) {
            Object.values(state.entities).forEach(notification => {
                notification.read = true
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            console.log('fetchNotifications payload: ', action.payload);
            
            const notificationsWithMetadata = action.payload.map(notification => ({
                ...notification,
                read: false,
                isNew: true
            }))
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })
            notificationsAdapter.upsertMany(state, notificationsWithMetadata)
        })
    }
})

export const {allNotificationsRead} = notificationsSlice.actions

export const {
    selectAll: selectAllNotifications, 
    selectById: selectNotificationById,
    selectIds: selectNotificationIds
} = notificationsAdapter.getSelectors(state => state.notifications)

export const selectUnreadNotificationsCount = state => {
    const allNotifications = selectAllNotifications(state)
    return allNotifications.filter(notification => !notification.read).length
}

export default notificationsSlice.reducer