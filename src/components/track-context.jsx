import { deviceState } from '@/atoms/device-atom';
import {
  currentTrackState,
  isPlayingState,
  repeatState,
  shuffleState,
  volumeState,
} from '@/atoms/track-atom';
import {
  adjustVolume,
  fetchCurrentPlaybackState,
  fetchCurrentPlayingTrack,
  spotifyApi,
} from '@/lib/spotify';
import { debounce } from 'lodash';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';

export const TrackContext = createContext();

export default function TrackProvider({ children }) {
  const device = useRecoilValue(deviceState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useRecoilState(volumeState);
  const [shuffleMode, setShuffleMode] = useRecoilState(shuffleState);
  const [repeatMode, setRepeatMode] = useRecoilState(repeatState);

  const fetchData = async () => {
    const res = await fetchCurrentPlaybackState();
    setCurrentTrack(res?.body?.item);
    setIsPlaying(res?.body?.is_playing);
    setShuffleMode(res?.body?.shuffle_state);
    setRepeatMode(res?.body?.repeat_state);
    setVolume(res?.body?.device.volume_percent);
  };

  useEffect(() => {
    fetchData();
  }, [spotifyApi]);

  const isDeviceAvailable =
    device?.body?.devices.length != 0 && device?.body?.devices?.[0].is_active;

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      adjustVolume(volume);
    }, 300),
    []
  );

  useEffect(() => {
    if (isDeviceAvailable && volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, debouncedAdjustVolume, isDeviceAvailable]);

  return (
    <TrackContext.Provider
      value={{ currentTrack, isPlaying, volume, shuffleMode, repeatMode }}
    >
      {children}
    </TrackContext.Provider>
  );
}
