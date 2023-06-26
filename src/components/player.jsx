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
  fetchCurrentPlaybackState,
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

export default function Player({ className }) {
  const spotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(80);
  const [shufflePlayback, setShufflePlayback] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [changeTrack, setChangeTrack] = useState(false);

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

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      adjustVolume(volume);
    }, 300),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, debouncedAdjustVolume]);

  return (
    <div
      className={`${className} hidden md:flex text-xs py-6 w-full bg-gradient-to-t from-zinc-700 to-zinc-900 justify-between items-center`}
    >
      <div className='text-white flex ml-8 w-1/4 space-x-4'>
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
      <div className='flex items-center space-x-6 grow justify-center text-zinc-300 '>
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
      <div className='text-white pr-8 w-1/4 flex justify-center'>
        <input
          type='range'
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
