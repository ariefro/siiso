import Image from 'next/image';

export default function CurrentTrackInfo({ currentTrack }) {
  return (
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
  );
}
