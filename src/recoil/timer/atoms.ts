import { atom } from 'recoil';

export const timeState = atom<number>({
  key: 'timeState',
  default: 25 * 60,
});

export const isRunningState = atom<boolean>({
  key: 'isRunningState',
  default: false,
});
