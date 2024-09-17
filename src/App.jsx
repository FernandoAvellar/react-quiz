import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Action is unknown');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  useEffect(function () {
    async function fetchData() {
      try {
        const resp = await fetch('http://localhost:8000/questions');
        const data = await resp.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
