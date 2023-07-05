import { atom } from 'recoil';

export const currentTrackState = atom({
  key: 'currentTrackState',
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});

export const rangeTimeTrackState = atom({
  key: 'rangeTimeTrackState',
  default: 'long_term',
});

export const volumeState = atom({
  key: 'volumeState',
  default: 80,
});

export const shuffleState = atom({
  key: 'shuffleState',
  default: false,
});

export const repeatState = atom({
  key: 'repeatState',
  default: false,
});
