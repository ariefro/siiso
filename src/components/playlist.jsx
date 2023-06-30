import Image from 'next/image';
import Link from 'next/link';

export default function Playlist({ playlist }) {
  return (
    <li className='space-y-5 flex flex-col items-center text-center'>
      <Link href={'/playlists/' + playlist.id}>
        {playlist?.images?.[0].url && (
          <Image
            src={playlist?.images?.[0].url}
            width={320}
            height={320}
            className='mx-auto hover:opacity-50 hover:ease-out duration-500'
            alt='photo album'
          ></Image>
        )}
      </Link>
      <div className='space-y-1'>
        <Link href={'/playlists/' + playlist.id}>
          <span className='text-center text-white text-sm sm:text-sm hover:underline'>
            {playlist.name}
          </span>
        </Link>
        <p className='text-center text-gray-400 text-xs sm:text-[0.7rem] font-light'>
          {playlist.tracks.total} TRACK
        </p>
      </div>
    </li>
  );
}
