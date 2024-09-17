import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'defCounter':
      return { ...state, count: action.payload };
    case 'defStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default: {
      throw new Error('Unknow action: ' + action.type);
    }
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + state.count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={state.step}
          onChange={(e) =>
            dispatch({ type: 'defStep', payload: Number(e.target.value) })
          }
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: 'dec' })}>-</button>
        <input
          value={state.count}
          onChange={(e) =>
            dispatch({ type: 'defCounter', payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
