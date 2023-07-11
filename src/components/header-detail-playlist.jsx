import { playlistState } from '@/atoms/playlist-atom';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

export default function HeaderDetailPlaylist() {
  const playlistData = useRecoilValue(playlistState);

  return (
    <div className='my-16 space-y-3 flex flex-col items-center md:w-72 md:mr-12'>
      {playlistData?.images?.[0].url && (
        <Image
          src={playlistData?.images?.[0].url}
          alt='photo album'
          height={360}
          width={360}
          className='hidden md:inline-block bg-red-700'
        ></Image>
      )}
      <h2 className='font-bold text-3xl text-center pt-10 sm:pt-0 text-white'>
        {playlistData?.name}
      </h2>
      <p className='text-xs text-gray-400'>
        By {playlistData?.owner.display_name}
      </p>
      <p className='text-xs text-gray-400 text-center'>
        {playlistData?.description}
      </p>
      <p className='text-xs text-white text-center'>
        {playlistData?.tracks.total} Tracks
      </p>
      <Link href={'/recommendations/' + playlistData?.id} className='pt-5'>
        <button className='button'>get recommendations</button>
      </Link>
    </div>
  );
}
