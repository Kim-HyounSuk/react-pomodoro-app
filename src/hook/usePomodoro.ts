import { useEffect } from 'react';
import { isRunningState, timeState } from '@/recoil/timer/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { roundStateSelector } from '@/recoil/progress/selector';

const usePomodoro = () => {
  const init = 25 * 60;

  const [time, setTime] = useRecoilState(timeState);
  const [isRunning, setIsRunning] = useRecoilState(isRunningState);
  const setRoundState = useSetRecoilState(roundStateSelector);

  const startPomodoro = () => {
    setIsRunning(true);
  };

  const stopPomodoro = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time <= 0) {
      clearInterval(timer);
      setIsRunning(false);
      setTime(init);
      setRoundState((cur) => cur);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time, setTime, setIsRunning, setRoundState]);

  return {
    startPomodoro,
    stopPomodoro,
  };
};

export default usePomodoro;
