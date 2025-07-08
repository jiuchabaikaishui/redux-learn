import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
// import {increment, incrementByAmount} from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice"
import authReducer from "../features/auth/authSlice"
import asyncPostsReducer from "../features/posts/asyncPostsSlice";
import asyncUsersReducer from "../features/users/asyncUsersSlice";
import asyncAuthReducer from "../features/auth/asyncAuthSlice";
import notificationsReducer from "../features/notifications/notificationsClice";

import { listenerMiddleware } from "./listenerMiddleware";

export default configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
        auth: authReducer,
        asyncPosts: asyncPostsReducer,
        asyncUsers: asyncUsersReducer,
        asyncAuth: asyncAuthReducer,
        notifications: notificationsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

// const store = configureStore({
//     reducer: counterReducer
// })

// const exampleThunkFunction = (dispatch, getState) => {
//     const stateBefore = getState()
//     console.log('Counter before: ', stateBefore);
//     dispatch(increment())
//     const stateAfter = getState()
//     console.log('Counter after: ', stateAfter);
// }
// store.dispatch(exampleThunkFunction)

// const logAndAdd = (amount) => {
//     return (dispatch, getState) => {
//         const stateBefore = getState()
//         console.log('Counter before: ', stateBefore);
//         dispatch(incrementByAmount(amount))
//         const stateAfter = getState()
//         console.log('Counter after: ', stateAfter);
//     }
// }
// store.dispatch(logAndAdd(10))
