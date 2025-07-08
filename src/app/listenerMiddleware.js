import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addPostsListeners } from "../features/posts/asyncPostsSlice";

export const listenerMiddleware = createListenerMiddleware()

addPostsListeners(listenerMiddleware.startListening)