import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, 
        increment,
        reset,
        incrementByAmount } from './counterSlice'

const Counter = () => {
    const count = useSelector((state) => state.counter.count)  // useSelector hook to access the counter state value
    const dispatch = useDispatch()  // useDispatch hook to dispatch actions

    const [incrementAmount, setIncrementAmount] = React.useState('0')

    const addValue = Number(incrementAmount) || 0 // ensure that the value is a number

    const resetAll = () => {
        setIncrementAmount('0')
        dispatch(reset())
    }

  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>

        <input
            type="text"
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
        />

        <div>
            <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
            <button onClick={resetAll}>Reset</button>
        </div>
        </section>
  )
}

export default Counter