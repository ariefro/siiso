import { signOut } from 'next-auth/react';
import Image from 'next/image';

function Header({ session, user, playlists }) {
  return (
    <header className='flex flex-col items-center justify-center h-[32rem] mb-6 space-y-7'>
      {session?.user.image && (
        <Image
          src={session?.user?.image}
          priority
          width={140}
          height={140}
          alt='avatar'
          className='rounded-full'
        ></Image>
      )}
      <h2 className='font-bold text-4xl text-white'>{session?.user.name}</h2>
      <div className='flex justify-evenly w-1/2 mb-10'>
        <div className='flex flex-col items-center space-y-1'>
          <p className='text-green-500 font-bold'>
            {user?.body.followers.total}
          </p>
          <p className='text-gray-200 text-sm tracking-widest font-extralight'>
            FOLLOWERS
          </p>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <p className='text-green-500 font-bold'>{playlists?.body.total}</p>
          <p className='text-gray-200 text-sm tracking-widest font-extralight'>
            PLAYLISTS
          </p>
        </div>
      </div>
      <button onClick={() => signOut()} className='button'>
        LOGOUT
      </button>
    </header>
  );
}

export default Header;
