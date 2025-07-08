import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { selectCurrentUsername } from "../auth/asyncAuthSlice";
import { client } from "../../api/client";

export const fetchUsers = createAsyncThunk('asyncUsers/fetchUsers', async () => {
    const request = await client.get('/fakeApi/users')
    return request.data
})
const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
    name: 'asyncUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    }
})

export default usersSlice.reducer

export const {
    selectAll: selectAllUsers, 
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state) => state.asyncUsers)

export const selectCurrentUser = (state) => {
    const currentUsername = selectCurrentUsername(state)
    if (!currentUsername) {
        return
    }
    return selectUserById(state, currentUsername)
}


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { selectCurrentUsername } from "../auth/asyncAuthSlice";
// import { client } from "../../api/client";

// export const fetchUsers = createAsyncThunk('asyncUsers/fetchUsers', async () => {
//     const request = await client.get('/fakeApi/users')
//     return request.data
// })

// const initialState = []

// const usersSlice = createSlice({
//     name: 'asyncUsers',
//     initialState,
//     reducers: {},
//     selectors: {
//         selectAllUsers: usersState => usersState,
//         selectUserById: (usersState, id) => usersState.find(user => user.id === id)
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {
//             return action.payload
//         })
//     }
// })

// export default usersSlice.reducer

// export const {selectAllUsers, selectUserById} = usersSlice.selectors

// export const selectCurrentUser = (state) => {
//     const currentUsername = selectCurrentUsername(state)
//     return selectUserById(state, currentUsername)
// }