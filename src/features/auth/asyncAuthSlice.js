import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const login = createAsyncThunk('asyncAuth/login', async (username) => {
    await client.post('/fakeApi/login', {username})
    return username
})
export const logout = createAsyncThunk('asyncAuth/logout', async () => {
    await client.post('/fakeApi/logout', {})
})

const authSlice = createSlice({
    name: 'asyncAuth',
    initialState: {username: null},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.username = action.payload
        }).addCase(logout.fulfilled, (state) => {
            state.username = null
        })
    }
})

export const selectCurrentUsername = (state) => state.asyncAuth.username

export default authSlice.reducer