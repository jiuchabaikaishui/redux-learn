import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { logout } from "../auth/asyncAuthSlice";
import { client } from "../../api/client";

export const addPostsListeners = (startListening) => {
    startListening({
        actionCreator: addNewPost.fulfilled,
        effect: async (action, listenerApi) => {
            const {toast} = await import('react-tiny-toast')
            console.log('toast: ', toast);
            
            const toastId = toast.show('New post added!', {
                variant: 'success',
                position: 'bottom-right',
                pause: true
            })

            await listenerApi.delay(5000)
            toast.remove(toastId)
        }
    })
}

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

export const fetchPosts = createAsyncThunk('asyncPosts/fetchPosts', async () => {
    console.log('asyncPosts');
    const response = await client.get('/fakeApi/posts')
    console.log('data: ', response.data);
    return response.data
}, {
    condition: (arg, thunkApi) => {
        const postsStatus = selectPostsStatus(thunkApi.getState())
        return postsStatus === 'idle'
    }
})

export const addNewPost = createAsyncThunk('asyncPosts/addNewPost', async (initialPost) => {
    console.log('initialPost: ', initialPost);
    
    const request = await client.post('/fakeApi/posts', initialPost)
    return request.data
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

const asyncPostsSlice = createSlice({
    name: 'asyncPosts',
    initialState: initialState,
    reducers: {
        postUpdated: (state, action) => {
            const {id, title, content} = action.payload
            postsAdapter.updateOne(id, {title, content})
        },
        reactionAdded: (state, action) => {
            const {postId, reaction} = action.payload
            const existingPost = state.entities[postId]
            console.log('existingPost: ', existingPost);
            
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    selectors: {
        selectPostsStatus: (postsState) => postsState.status,
        selectPostsError: (postsState) => postsState.error
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            return initialState
        })
        .addCase(fetchPosts.pending, (state, action) => {
            console.log('pending');
            state.status = 'pending'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            console.log('succeeded');
            state.status = 'succeeded'
            postsAdapter.setAll(state, action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            console.log('failed');
            state.status = 'failed'
            state.error = action.error.message ?? 'Unknown Error'
        })
        .addCase(addNewPost.fulfilled, postsAdapter.addOne)
    }
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById, 
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => state.asyncPosts)
export const { selectPostsStatus, selectPostsError } = asyncPostsSlice.selectors

export const { postAdded, postUpdated, reactionAdded } = asyncPostsSlice.actions

export default asyncPostsSlice.reducer

// export const selectPostsByUser = (state, userId) => selectAllPosts(state).filter(post => post.user === userId)
export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) => posts.filter(post => post.user === userId))

// console.log(postUpdated({ id: '123', title: 'First Post', content: 'Some text here' }));




// import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
// import { logout } from "../auth/asyncAuthSlice";
// import { client } from "../../api/client";

// export const fetchPosts = createAsyncThunk('asyncPosts/fetchPosts', async () => {
//     console.log('asyncPosts');
//     const response = await client.get('/fakeApi/posts')
//     console.log('data: ', response.data);
//     return response.data
// }, {
//     condition: (arg, thunkApi) => {
//         const postsStatus = selectPostsStatus(thunkApi.getState())
//         return postsStatus === 'idle'
//     }
// })

// export const addNewPost = createAsyncThunk('asyncPosts/addNewPost', async (initialPost) => {
//     console.log('initialPost: ', initialPost);
    
//     const request = await client.post('/fakeApi/posts', initialPost)
//     return request.data
// })

// const initialState = {
//     posts: [],
//     status: 'idle',
//     error: null
// }

// const asyncPostsSlice = createSlice({
//     name: 'asyncPosts',
//     initialState: initialState,
//     reducers: {
//         postUpdated: (state, action) => {
//             const {id, title, content} = action.payload
//             const existingPost = state.posts.find(post => post.id === id)
//             console.log('existingPost: ', existingPost);

//             if (existingPost) {
//                 existingPost.title = title
//                 existingPost.content = content
//             }
//         },
//         reactionAdded: (state, action) => {
//             const {postId, reaction} = action.payload
//             const existingPost = state.posts.find(post => post.id === postId)
//             console.log('existingPost: ', existingPost);
            
//             if (existingPost) {
//                 existingPost.reactions[reaction]++
//             }
//         }
//     },
//     selectors: {
//         selectAllPosts: (postsState) => postsState.posts,
//         selectPostById: (postsState, postId) => postsState.posts.find(post => post.id === postId),
//         selectPostsStatus: (postsState) => postsState.status,
//         selectPostsError: (postsState) => postsState.error
//     },
//     extraReducers: (builder) => {
//         builder.addCase(logout.fulfilled, (state) => {
//             return initialState
//         })
//         .addCase(fetchPosts.pending, (state, action) => {
//             console.log('pending');
//             state.status = 'pending'
//         })
//         .addCase(fetchPosts.fulfilled, (state, action) => {
//             console.log('succeeded');
//             state.status = 'succeeded'
//             state.posts.push(...action.payload)
//         })
//         .addCase(fetchPosts.rejected, (state, action) => {
//             console.log('failed');
//             state.status = 'failed'
//             state.error = action.error.message ?? 'Unknown Error'
//         })
//         .addCase(addNewPost.fulfilled, (state, action) => {
//             state.posts.push(action.payload)
//         })
//     }
// })

// export const {selectAllPosts, selectPostById, selectPostsStatus, selectPostsError} = asyncPostsSlice.selectors

// export const { postAdded, postUpdated, reactionAdded } = asyncPostsSlice.actions

// export default asyncPostsSlice.reducer

// // export const selectPostsByUser = (state, userId) => selectAllPosts(state).filter(post => post.user === userId)
// export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) => posts.filter(post => post.user === userId))

// // console.log(postUpdated({ id: '123', title: 'First Post', content: 'Some text here' }));





// import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// import { userLoggedOut } from "../auth/authSlice";
// import { client } from "../../api/client";
// import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

// export const createAppSlice = buildCreateSlice({
//   creators: { asyncThunk: asyncThunkCreator }
// })

// const initialReactions = {
//     thumbsUp: 0,
//     tada: 0,
//     heart: 0,
//     rocket: 0,
//     eyes: 0
//   }

// const initialState = {
//     posts: [],
//     status: 'idle',
//     error: null
// }

// const asyncPostsSlice = createAppSlice({
//     name: 'asyncPosts',
//     initialState: initialState,
//     reducers: (create) => {
//         return {
//             postAdded: create.preparedReducer((title, content, userId) => {
//                 return {payload: {id: nanoid(), title, content, user: userId, 
//                     date: new Date().toISOString(),
//                     reactions: {...initialReactions}
//                 }}
//             }, (state, action) => {
//                 state.posts.push(action.payload)
//             }),
//             postUpdated: create.reducer((state, action) => {
//                 const {id, title, content} = action.payload
//                 const existingPost = state.posts.find(post => post.id === id)
//                 console.log('existingPost: ', existingPost);
    
//                 if (existingPost) {
//                     existingPost.title = title
//                     existingPost.content = content
//                 }
//             }),
//             reactionAdded: create.reducer((state, action) => {
//                 const {postId, reaction} = action.payload
//                 const existingPost = state.posts.find(post => post.id === postId)
//                 console.log('existingPost: ', existingPost);
                
//                 if (existingPost) {
//                     existingPost.reactions[reaction]++
//                 }
//             }),
//             fetchPosts: create.asyncThunk(async () => {
//                 const response = await client.get('/fakeApi/posts')
//                 return response.data
//             }, {
//                 options: {
//                     condition: (arg, thunkApi) => {
//                         const postsStatus = thunkApi.getState().asyncPosts.status
//                         return postsStatus === 'idle'
//                     }
//                 },
//                 pending: (state, action) => {
//                     state.status = 'pending'
//                 },
//                 fulfilled: (state, action) => {
//                     state.status = 'succeeded'
//                     state.posts.push(...action.payload)
//                 },
//                 rejected: (state, action) => {
//                     state.status = 'failed'
//                     state.error = action.error.message ?? 'Unknown Error'
//                 }
//             })
//         }
//     },
//     selectors: {
//         selectAllPosts: (postsState) => postsState.posts,
//         selectPostById: (postsState, postId) => postsState.posts.find(post => post.id === postId),
//         selectPostsStatus: (postsState) => postsState.status,
//         selectPostsError: (postsState) => postsState.error
//     },
//     extraReducers: (builder) => {
//         builder.addCase(userLoggedOut, (state) => {
//             return initialState
//         })
//     }
// })

// export const {selectAllPosts, selectPostById, selectPostsStatus, selectPostsError} = asyncPostsSlice.selectors

// export const { postAdded, postUpdated, reactionAdded, fetchPosts } = asyncPostsSlice.actions

// export default asyncPostsSlice.reducer



