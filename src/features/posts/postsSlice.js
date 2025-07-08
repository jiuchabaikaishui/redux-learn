import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { userLoggedOut } from "../auth/authSlice";

const initialReactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
  }

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', user: '0', 
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {...initialReactions}
    },
    { id: '2', title: 'Second Post', content: 'More text', user: '2',
        date: sub(new Date(), {minutes: 5}).toISOString(),
        reactions: {...initialReactions}
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {payload: {id: nanoid(), title, content, user: userId, 
                    date: new Date().toISOString(),
                    reactions: {...initialReactions}
                }}
            }
        },
        postUpdated: (state, action) => {
            const {id, title, content} = action.payload
            const existingPost = state.find(post => post.id === id)
            console.log('existingPost: ', existingPost);

            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded: (state, action) => {
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)
            console.log('existingPost: ', existingPost);
            
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    selectors: {
        selectAllPosts: (postsState) => postsState,
        selectPostById: (postsState, postId) => postsState.find(post => post.id === postId)
    },
    extraReducers: (builder) => {
        builder.addCase(userLoggedOut, (state) => {
            return initialState
        })
    }
})

export const {selectAllPosts, selectPostById} = postsSlice.selectors

// function postUpdated(title, content) {
//     const id = nanoid()
//     return {
//         type: 'posts/postAdded',
//         payload: {id, title, content}
//     }
// }

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// export const selectAllPosts = state => state.posts
// export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId)