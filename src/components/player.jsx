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
    <>
      {user?.product === 'premium' && isDeviceAvailable && (
        <div className='fixed z-50 bottom-0 flex text-xs py-6 w-full bg-gradient-to-t from-zinc-700 to-zinc-900 justify-between items-center'>
          <div className='flex w-full'>
            <div
              className={`${
                currentTrack !== undefined
                  ? 'text-white flex ml-8 md:ml-12 w-1/2 sm:w-1/4 space-x-4 md:space-x-6'
                  : 'hidden'
              } `}
            >
              {currentTrack?.album.images?.[0].url && (
                <Image
                  src={currentTrack?.album.images?.[0].url}
                  width={60}
                  height={60}
                  alt='photo album'
                  className='md:inline w-10 h-10'
                ></Image>
              )}
              <div className='flex flex-col justify-center space-y-1'>
                <p>{currentTrack?.name}</p>
                <p className='text-[0.68rem] text-gray-400'>
                  {currentTrack?.artists?.[0].name}
                </p>
              </div>
            </div>

            <div className='flex items-center grow justify-center text-zinc-300 '>
              <button
                onClick={() => handleSetShuffle()}
                className={`hidden sm:inline ml-4 sm:ml-8 ${
                  shufflePlayback ? 'text-green-400' : 'hover:text-white'
                }`}
              >
                <ShuffleIcon />
              </button>
              <button
                onClick={() => handleSkipToPrevious()}
                className='hover:text-white ml-4 sm:ml-8'
              >
                <BackwardStepIcon />
              </button>
              {isPlaying ? (
                <button
                  onClick={() => handlePlayPause()}
                  className='hover:text-white mr-4 ml-4 sm:mr-8 sm:ml-8'
                >
                  <PauseIcon />
                </button>
              ) : (
                <button
                  onClick={() => handlePlayPause()}
                  className='hover:text-white mr-4 ml-4 sm:mr-8 sm:ml-8'
                >
                  <PlayIcon />
                </button>
              )}
              <button
                onClick={() => handleSkipNext()}
                className='hover:text-white mr-4 sm:mr-8'
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
            <div
              className={`${
                currentTrack !== undefined
                  ? 'text-white w-1/4 hidden sm:flex justify-end mr-8 md:mr-12'
                  : 'hidden'
              }`}
            >
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
        </div>
      )}
    </>
  );
}
