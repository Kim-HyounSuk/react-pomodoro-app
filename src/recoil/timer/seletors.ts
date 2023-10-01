import { selector } from 'recoil';
import { timeState } from '@/recoil/timer/atoms';

export const pomodoroSelector = selector({
  key: 'pomodoroSelector',
  get: ({ get }) => {
    const time = get(timeState);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return [minutes, seconds];
  },
});
