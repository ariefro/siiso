import useSpotify from '@/hook/useSpotify';
import {
  BackwardStepIcon,
  ForwardStepIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
} from './icons';
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
import Image from 'next/image';
import { debounce } from 'lodash';
import { useRecoilState } from 'recoil';
import { currentTrackState, isPlayingState } from '@/atoms/track-atom';
import { useRecoilValue } from 'recoil';
import { deviceState } from '@/atoms/device-atom';

export default function Player() {
  const spotifyApi = useSpotify();
  const currentTrack = useRecoilValue(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(80);
  const [shufflePlayback, setShufflePlayback] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [changeTrack, setChangeTrack] = useState(false);
  const [hover, setHover] = useState(false);
  const device = useRecoilValue(deviceState);

  const fetchData = async () => {
    const currentTrack = await fetchCurrentPlayingTrack();
    setIsPlaying(currentTrack?.body?.is_playing);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [changeTrack, spotifyApi]);

  const handlePlayPause = () => {
    if (isPlaying === true) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const handleSkipNext = (state) => {
    skipToNext();
    setIsPlaying(true);
    setChangeTrack(!state);
  };

  const handleSkipToPrevious = async (state) => {
    skipToPrevious();
    setIsPlaying(true);
    setChangeTrack(!state);
  };

  const handleSetShuffle = (state) => {
    setShuffle(!state);
    setShufflePlayback(!state);
  };

  const handleSetRepeatMode = () => {
    const newRepeatMode = repeatMode === 'off' ? 'track' : 'off';
    setRepeat(newRepeatMode);
    setRepeatMode(newRepeatMode);
  };

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

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className='fixed bottom-0 flex text-xs py-6 w-full bg-gradient-to-t from-zinc-700 to-zinc-900 justify-between items-center'
    >
      {!isDeviceAvailable && hover ? (
        <div className='bg-zinc-700 w-full fixed h-20 flex justify-center items-center bg-opacity-60'>
          <p className='opacity-100 text-white font-bold text-xs md:text-sm text-center'>
            There was no active device found.
            <br />
            Try launching your Spotify web player.
          </p>
        </div>
      ) : (
        <div></div>
      )}
      <div className='text-white flex ml-8 md:ml-12 w-1/4 space-x-4 md:space-x-6'>
        {currentTrack?.album.images?.[0].url && (
          <Image
            src={currentTrack?.album.images?.[0].url}
            width={60}
            height={60}
            alt='photo album'
            className='hidden md:inline'
          ></Image>
        )}
        <div className='flex flex-col justify-center space-y-1'>
          <p className=''>{currentTrack?.name}</p>
          <p className='text-[0.68rem] text-gray-400'>
            {currentTrack?.artists?.[0].name}
          </p>
        </div>
      </div>
      <div className='flex items-center space-x-6 md:space-x-12 grow justify-center text-zinc-300 '>
        <button
          onClick={() => handleSetShuffle(shufflePlayback)}
          className={shufflePlayback ? 'text-green-400' : 'hover:text-white'}
        >
          <ShuffleIcon />
        </button>
        <button
          onClick={() => handleSkipToPrevious(changeTrack)}
          className='hover:text-white'
        >
          <BackwardStepIcon />
        </button>
        {isPlaying ? (
          <button
            onClick={() => handlePlayPause()}
            className='hover:text-white'
          >
            <PauseIcon />
          </button>
        ) : (
          <button
            onClick={() => handlePlayPause()}
            className='hover:text-white'
          >
            <PlayIcon />
          </button>
        )}
        <button
          onClick={() => handleSkipNext(changeTrack)}
          className='hover:text-white'
        >
          <ForwardStepIcon />
        </button>
        <button
          onClick={() => handleSetRepeatMode()}
          className={
            repeatMode == 'track' ? 'text-green-400' : 'hover:text-white'
          }
        >
          <RepeatIcon />
        </button>
      </div>
      <div className='text-white w-1/4 flex justify-end mr-8 md:mr-12'>
        <input
          type='range'
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
          className='w-20 md:w-32'
        />
      </div>
    </div>
  );
}
