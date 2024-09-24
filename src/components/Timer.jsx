import { useEffect } from 'react';
import { useQuiz } from '../context/useQuiz';

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const formattedTime = () => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return <div className="timer">{formattedTime()}</div>;
}
