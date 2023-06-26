import { play, spotifyApi } from '@/lib/spotify';
import { milisToMinutesAndSeconds } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';
import Error from './error';

export default function Track({ track }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(false);

  const playTrack = async () => {
    try {
      await spotifyApi.play({
        uris: [track.uri],
      });
      setCurrentTrack(track);
    } catch (error) {
      console.log('error===', error);
      setError(true);
    }
  };

  return (
    <li
      className='mb-6 items-center space-x-5 flex hover:cursor-pointer'
      onClick={() => playTrack()}
    >
      {error && <Error />}
      {track?.album?.images?.[0].url && (
        <Image
          src={track?.album?.images?.[0].url}
          width={50}
          height={50}
          alt='photo album'
        ></Image>
      )}
      <div className='grid grid-cols-12 w-full'>
        <div className='space-y-1 col-span-11'>
          <p className='text-sm md:text-base text-white truncate'>
            {track?.name}
          </p>
          <p className='text-xs text-gray-400 truncate'>
            {track?.artists?.[0].name} - {track?.album?.name}
          </p>
        </div>
        <div>
          <p className='text-xs text-gray-400 text-right'>
            {milisToMinutesAndSeconds(track?.duration_ms)}
          </p>
        </div>
      </div>
    </li>
  );
}
