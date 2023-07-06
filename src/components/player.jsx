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
import {
  currentTrackState,
  isPlayingState,
  repeatState,
  shuffleState,
  volumeState,
} from '@/atoms/track-atom';
import { useRecoilValue } from 'recoil';
import { deviceState } from '@/atoms/device-atom';
import Link from 'next/link';
import { userState } from '@/atoms/user-atom';

export default function Player() {
  const spotifyApi = useSpotify();
  const user = useRecoilValue(userState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useRecoilState(volumeState);
  const [shufflePlayback, setShufflePlayback] = useRecoilState(shuffleState);
  const [repeatMode, setRepeatMode] = useRecoilState(repeatState);
  const [changeTrack, setChangeTrack] = useState(false);
  const [hover, setHover] = useState(false);
  const device = useRecoilValue(deviceState);

  const fetchData = async () => {
    const currentTrack = await fetchCurrentPlayingTrack();
    setCurrentTrack(currentTrack?.body?.item);
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
      className='fixed z-50 bottom-0 flex text-xs py-6 w-full bg-gradient-to-t from-zinc-700 to-zinc-900 justify-between items-center'
    >
      {user?.product === 'premium' && !isDeviceAvailable && hover && (
        <div className='bg-zinc-700 w-full fixed h-20 flex justify-center items-center bg-opacity-60'>
          <p className='opacity-100 text-white font-bold text-xs md:text-sm text-center'>
            There was no active device found.
            <br />
            Try launching your{' '}
            <span className='capitalize text-green-400'>
              <Link href='https://open.spotify.com/' target='_blank'>
                spotify web player
              </Link>
            </span>
            .
          </p>
        </div>
      )}
      {user?.product === 'premium' && (
        <div className='flex w-full'>
          <div className='text-white flex ml-8 md:ml-12 sm:w-1/4 space-x-4 md:space-x-6'>
            {currentTrack?.album.images?.[0].url && (
              <Image
                src={currentTrack?.album.images?.[0].url}
                width={60}
                height={60}
                alt='photo album'
                className='md:inline'
              ></Image>
            )}
            <div className='flex flex-col justify-center space-y-1'>
              <p>{currentTrack?.name}</p>
              <p className='text-[0.68rem] text-gray-400'>
                {currentTrack?.artists?.[0].name}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-6 md:space-x-12 grow justify-center text-zinc-300 '>
            <button
              onClick={() => handleSetShuffle()}
              className={`hidden sm:inline ${
                shufflePlayback ? 'text-green-400' : 'hover:text-white'
              }`}
            >
              <ShuffleIcon />
            </button>
            <button
              onClick={() => handleSkipToPrevious()}
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
              onClick={() => handleSkipNext()}
              className='hover:text-white'
            >
              <ForwardStepIcon />
            </button>
            <button
              onClick={() => handleSetRepeatMode()}
              className={`hidden sm:inline ${
                repeatMode == 'track'
              } ? 'text-green-400' : 'hover:text-white'`}
            >
              <RepeatIcon />
            </button>
          </div>
          <div className='text-white w-1/4 hidden sm:flex justify-end mr-8 md:mr-12'>
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
      )}
    </div>
  );
}
