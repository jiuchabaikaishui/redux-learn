import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount) => {
    const response = await fetchCount(amount)
    return response.data
})

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        status: 'idle'
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    },
    selectors: {
        selectCount: counter => counter.value
    },
    extraReducers: (builder) => {
        builder
        .addCase(incrementAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.value += action.payload
        })
        .addCase(incrementAsync.rejected, state => {
            state.status = 'failed'
        })
    }
})

export const { selectCount } = counterSlice.selectors

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

export const incrementIfOdd = (amount) => (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue%2 === 1) {
        dispatch(incrementByAmount(amount))
    }
}

console.log(counterSlice.actions.increment());
// {type: 'counter/increment', payload: undefined}
const newState = counterSlice.reducer({value: 10}, counterSlice.actions.increment)
console.log(newState);
// {value: 11}