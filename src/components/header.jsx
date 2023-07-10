import { signOut } from 'next-auth/react';
import Image from 'next/image';

function Header({ session, user, playlists }) {
  return (
    <header className='flex flex-col items-center justify-center h-[32rem] mb-6 space-y-7'>
      {session?.user.image && (
        <Image
          src={session?.user?.image}
          priority
          width={144}
          height={144}
          alt='avatar'
          className='rounded-full w-36 h-36 mt-16'
        ></Image>
      )}
      <h2 className='font-bold text-center break-all text-4xl text-white'>
        {session?.user.name}
      </h2>
      <div className='flex justify-evenly w-1/4 mb-10 space-x-16'>
        <div className='flex flex-col items-center space-y-1'>
          <p className='text-green-400 font-bold'>{user?.followers?.total}</p>
          <p className='text-gray-200 text-sm uppercase font-extralight'>
            followers
          </p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p className='text-green-400 font-bold'>{playlists?.total}</p>
          <p className='text-gray-200 text-sm uppercase font-extralight'>
            playlists
          </p>
        </div>
      </div>
      <button onClick={() => signOut()} className='button'>
        logout
      </button>
    </header>
  );
}

export default Header;
