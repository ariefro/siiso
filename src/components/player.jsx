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

export default function Player({ className }) {
  const spotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  const fetchData = async () => {
    const currentTrack = await fetchCurrentPlayingTrack();
    setCurrentTrack(currentTrack?.body?.item);
    setIsPlaying(currentTrack?.body?.is_playing);
  };

  useEffect(() => {
    fetchData();
  }, [spotifyApi, isPlaying]);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying === true) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
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
      className={`${className} hidden md:flex text-xs h-24 w-full bg-black justify-between items-center`}
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
      <div className='flex items-center space-x-6 grow justify-center text-zinc-300'>
        <button onClick={() => setShuffle()} className='hover:text-white'>
          <ShuffleIcon />
        </button>
        <button onClick={() => skipToPrevious()}>
          <BackwardStepIcon />
        </button>
        {isPlaying ? (
          <button onClick={() => handlePlayPause()}>
            <PauseIcon />
          </button>
        ) : (
          <button onClick={() => handlePlayPause()}>
            <PlayIcon />
          </button>
        )}
        <button onClick={() => skipToNext()}>
          <ForwardStepIcon />
        </button>
        <button onClick={() => setRepeat()}>
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
          className=''
        />
      </div>
    </div>
  );
}
