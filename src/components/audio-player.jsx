import useSpotify from '@/hook/useSpotify';
import {
  adjustVolume,
  fetchCurrentPlayingTrack,
  pause,
  play,
  setRepeat,
  setShuffle,
  skipToNext,
  skipToPrevious,
} from '@/lib/spotify';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useRecoilState } from 'recoil';
import {
  currentTrackState,
  isPlayingState,
  repeatState,
  shuffleState,
  volumeState,
} from '@/atoms/track-atom';
import { useRecoilValue } from 'recoil';
import { deviceState } from '@/atoms/device-atom';
import { userState } from '@/atoms/user-atom';
import { Controls, CurrentTrackInfo, VolumeBar } from '.';

export default function AudioPlayer() {
  const spotifyApi = useSpotify();
  const user = useRecoilValue(userState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useRecoilState(volumeState);
  const [shufflePlayback, setShufflePlayback] = useRecoilState(shuffleState);
  const [repeatMode, setRepeatMode] = useRecoilState(repeatState);
  const device = useRecoilValue(deviceState);
  const [changeTrack, setChangeTrack] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCurrentPlayingTrack();
      setCurrentTrack(res?.body?.item);
      setIsPlaying(res?.body?.is_playing);
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [changeTrack, spotifyApi, setCurrentTrack, setIsPlaying]);

  const handlePlayPause = () => {
    if (isPlaying === true) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const handleSkipNext = () => {
    skipToNext();
    setIsPlaying(true);
    setChangeTrack(!changeTrack);
  };

  const handleSkipToPrevious = async () => {
    skipToPrevious();
    setIsPlaying(true);
    setChangeTrack(!changeTrack);
  };

  const handleSetShuffle = () => {
    setShuffle(!shufflePlayback);
    setShufflePlayback(!shufflePlayback);
  };

  const handleSetRepeatMode = () => {
    const newRepeatMode = repeatMode === 'off' ? 'track' : 'off';
    setRepeat(newRepeatMode);
    setRepeatMode(newRepeatMode);
  };

  const isDeviceAvailable = device?.length != 0 && device?.[0].is_active;

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      adjustVolume(volume);
    }, 300),
    []
  );

  useEffect(() => {
    if (isDeviceAvailable && volume > 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, debouncedAdjustVolume, isDeviceAvailable]);

  return (
    <>
      {user?.product === 'premium' && isDeviceAvailable && (
        <div className='fixed z-50 bottom-0 flex text-xs py-6 w-full bg-black justify-between items-center'>
          <div className='flex w-full'>
            <CurrentTrackInfo currentTrack={currentTrack} />
            <Controls
              handlePlayPause={handlePlayPause}
              handleSkipNext={handleSkipNext}
              handleSkipToPrevious={handleSkipToPrevious}
              handleRepeatMode={handleSetRepeatMode}
              handleShuffleMode={handleSetShuffle}
              shufflePlayback={shufflePlayback}
              repeatMode={repeatMode}
              isPlaying={isPlaying}
            />
            <VolumeBar
              currentTrack={currentTrack}
              setVolume={setVolume}
              volume={volume}
            />
          </div>
        </div>
      )}
    </>
  );
}
