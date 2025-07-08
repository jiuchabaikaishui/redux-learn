import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {username: null},
    reducers: {
        userLoggedIn(state, action) {state.username = action.payload},
        userLoggedOut(state) {state.username = null}
    }
})

export const {userLoggedIn, userLoggedOut} = authSlice.actions

export const selectCurrentUsername = (state) => state.auth.username

export default authSlice.reducer