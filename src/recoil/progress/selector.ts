import { selector } from 'recoil';
import { goalState, roundState } from '@/recoil/progress/atoms';

export const incrementRound = (currentRound: number) => {
  if (currentRound < 3) {
    return currentRound + 1;
  } else {
    return 0;
  }
};

export const incrementGoal = (currentGoal: number) => {
  if (currentGoal < 12) {
    return currentGoal + 1;
  } else {
    return 0;
  }
};

export const roundStateSelector = selector<number>({
  key: 'roundStateSelector',
  get: ({ get }) => {
    const round = get(roundState);
    return round;
  },
  set: ({ set }) => {
    set(roundState, (cur) => {
      const newRound = incrementRound(cur);
      if (newRound === 0) {
        set(goalState, (prevGoal) => incrementGoal(prevGoal));
      }
      return newRound;
    });
  },
});
