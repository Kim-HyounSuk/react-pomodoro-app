import { atom } from 'recoil';

export const roundState = atom<number>({
  key: 'roundState',
  default: 0,
});

export const goalState = atom<number>({
  key: 'goalState',
  default: 0,
});
