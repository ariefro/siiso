import { milisToMinutesAndSeconds } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { InfoIcon } from './icons';

export default function Track({ track }) {
  return (
    <li className='list-none mb-1'>
      <Link
        href={'/tracks/' + track.id}
        className='flex group items-center space-x-5 p-3 rounded-sm hover:cursor-pointer hover:bg-zinc-800 hover:opacity-100'
      >
        <div className='relative'>
          {track?.album?.images?.[0].url && (
            <div className='flex justify-center items-center'>
              <Image
                src={track?.album?.images?.[0].url}
                width={50}
                height={50}
                alt='photo album'
                className='group-hover:opacity-40 hover:ease-out duration-500'
              ></Image>
              <span className='info-icon'>
                <InfoIcon />
              </span>
            </div>
          )}
        </div>
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
            <p className='text-xs mt-1 text-gray-400 text-right'>
              {milisToMinutesAndSeconds(track?.duration_ms)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
