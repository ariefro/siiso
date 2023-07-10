import Image from 'next/image';
import Link from 'next/link';
import { InfoIcon } from './icons';

export default function Artist({ artist }) {
  return (
    <li className='p-3 group hover:bg-zinc-800 hover:cursor-pointer hover:opacity-100 rounded-sm'>
      <Link
        href={'/artists/' + artist.id}
        className='flex items-center space-x-4'
      >
        <div className='relative'>
          {artist?.images?.[0].url && (
            <div className='flex justify-center items-center'>
              <Image
                src={artist?.images?.[0].url}
                width={50}
                height={50}
                alt='photo album'
                className='rounded-full w-[50px] h-[50px] group-hover:opacity-40 hover:ease-out duration-500'
              ></Image>
              <span className='info-icon'>
                <InfoIcon />
              </span>
            </div>
          )}
        </div>
        <p className='text-sm md:text-base text-gray-200 group-hover:text-white'>
          {artist?.name}
        </p>
      </Link>
    </li>
  );
}
