import { createSlice } from "@reduxjs/toolkit";
import { selectCurrentUsername } from "../auth/authSlice";

const initialState = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    selectors: {
        selectAllUsers: usersState => usersState,
        selectUserById: (usersState, id) => usersState.find(user => user.id === id)
    }
})

export default usersSlice.reducer

export const {selectAllUsers, selectUserById} = usersSlice.selectors

export const selectCurrentUser = (state) => {
    const currentUsername = selectCurrentUsername(state)
    return selectUserById(state, currentUsername)
}