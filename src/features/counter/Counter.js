import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync } from "./counterSlice";
import { useState } from "react";

import store from "../../app/store";
import { selectCount } from "./counterSlice";
console.log('count: ', selectCount(store.getState()));

export default function Counter() {
    const count = useSelector(selectCount)
    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState("2")
    const incrementValue = Number(incrementAmount) || 0
    return (<div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <br></br>
        <input type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)}></input>
        <button onClick={() => dispatch(incrementByAmount(incrementValue))}>+</button>
        <button onClick={() => dispatch(incrementAsync(incrementValue))}>异步+</button>
        <button onClick={() => dispatch(incrementIfOdd(incrementValue))}>奇数+</button>
    </div>)
}