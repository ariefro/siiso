import Image from 'next/image';
import Link from 'next/link';

export default function HeaderDetailAlbum({ dataAlbum }) {
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center w-full'>
      {dataAlbum?.images?.[0].url && (
        <Image
          alt='album image'
          src={dataAlbum?.images?.[0].url}
          width={360}
          height={360}
          className='w-52 h-52 md:w-64 md:h-64 sm:inline-block'
          priority
        ></Image>
      )}
      <div className='text-center space-y-2 mt-6 md:text-start md:mt-24 md:ml-5'>
        <h2 className='font-bold text-3xl text-center md:text-start sm:pt-4 text-white'>
          {dataAlbum?.name}
        </h2>
        <p className='text-gray-400 text-sm'>
          <span>
            <Link
              href={'/artists/' + dataAlbum?.artists?.[0].id}
              className='hover:text-white'
            >
              {dataAlbum?.artists?.[0].name}
            </Link>
          </span>
          <span>&nbsp;&#183;&nbsp;</span>
          {dataAlbum?.release_date.split('-')[0]}
          <span>&nbsp;&#183;&nbsp;</span>
          {dataAlbum?.total_tracks} songs
        </p>
      </div>
    </div>
  );
}
