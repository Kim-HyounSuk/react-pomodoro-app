import { useRecoilValue } from 'recoil';
import usePomodoro from '@/hook/usePomodoro';
import { pomodoroSelector } from '@/recoil/timer/seletors';
import { goalState, roundState } from '@/recoil/progress/atoms';
import styled from 'styled-components';
import { isRunningState } from '@/recoil/timer/atoms';
import { motion } from 'framer-motion';

const App = () => {
  const { startPomodoro, stopPomodoro } = usePomodoro();
  const isRunning = useRecoilValue(isRunningState);
  const time = useRecoilValue(pomodoroSelector);
  const round = useRecoilValue(roundState);
  const goal = useRecoilValue(goalState);

  return (
    <Container>
      <Title>Pomodoro</Title>
      <TimerWrapper>
        <Time key={time[0]} variants={timeVariants} initial={'init'} animate={'pre'}>
          {String(time[0]).padStart(2, '0')}
        </Time>
        <span>:</span>
        <Time key={time[1]} variants={timeVariants} initial={'init'} animate={'pre'}>
          {String(time[1]).padStart(2, '0')}
        </Time>
      </TimerWrapper>
      <Button
        variants={buttonVariants}
        whileHover={'hover'}
        whileTap={'tap'}
        onClick={isRunning ? stopPomodoro : startPomodoro}
      >
        {isRunning ? (
          <svg
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path d='M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z' />
          </svg>
        ) : (
          <svg
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
          </svg>
        )}
      </Button>
      <ProgressWrapper>
        <ProgressInfo>
          <span>{`${round}/4`}</span>
          <span>ROUND</span>
        </ProgressInfo>
        <ProgressInfo>
          <span>{`${goal}/12`}</span>
          <span>GOAL</span>
        </ProgressInfo>
      </ProgressWrapper>
    </Container>
  );
};

const timeVariants = {
  init: {
    scale: 0.8,
    opacity: 0.3,
  },
  pre: {
    scale: 1,
    opacity: 1,
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    opacity: 0.6,
    transition: {
      duration: 0.1,
    },
  },
  tap: {
    scale: 1,
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 15px;
  gap: 80px;
  justify-content: center;
  align-items: center;
`;

const TimerWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  font-size: 52px;
  font-weight: 900;
  span {
    opacity: 0.5;
  }
`;

const Time = styled(motion.div)`
  padding: 60px 35px;
  border-radius: 15px;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Button = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  padding: 25px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.btnColor};
  opacity: 0.3;
`;

const Title = styled.h1`
  font-size: 62px;
  font-weight: 900;
  text-align: center;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  span:nth-child(1) {
    opacity: 0.6;
    font-size: 32px;
  }
`;

export default App;
