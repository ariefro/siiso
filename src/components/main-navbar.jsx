import { useState } from 'react';
import { NavLink } from '.';
import {
  HamburgerIcon,
  MicrophoneIcon,
  PlaylistIcon,
  RecentIcon,
  TrackIcon,
  UserIcon,
  XmarkIcon,
} from './icons';
import { signOut } from 'next-auth/react';

export default function MainNavbar({ className }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toogleNavItems = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <nav className={`${className}`}>
      <ul className='m-auto hidden sticky top-0 sm:flex flex-col h-screen justify-center w-24 md:w-36 lg:max-w-md text-gray-400 bg-black border-r border-gray-900'>
        <NavLink href='/' title='Profile' Icon={UserIcon} />
        <NavLink href='/artists' title='Top Artists' Icon={MicrophoneIcon} />
        <NavLink href='/tracks' title='Top Tracks' Icon={TrackIcon} />
        <NavLink href='/recent' title='Recent' Icon={RecentIcon} />
        <NavLink href='/playlists' title='Playlists' Icon={PlaylistIcon} />
      </ul>
      {isNavExpanded ? (
        <div>
          <ul className='fixed sm:hidden w-full h-screen text-gray-400 pt-20 bg-black border-r border-gray-900'>
            <NavLink href='/' title='Profile' Icon={UserIcon} />
            <NavLink
              href='/artists'
              title='Top Artists'
              Icon={MicrophoneIcon}
            />
            <NavLink href='/tracks' title='Top Tracks' Icon={TrackIcon} />
            <NavLink href='/recent' title='Recent' Icon={RecentIcon} />
            <NavLink href='/playlists' title='Playlists' Icon={PlaylistIcon} />
          </ul>
          <button
            onClick={() => signOut()}
            className='button fixed bottom-44 left-[calc(50%-48px)]'
          >
            logout
          </button>
          <button
            onClick={() => toogleNavItems()}
            className='text-gray-400 fixed top-5 right-5 sm:hidden hover:cursor-pointer hover:text-white'
          >
            <XmarkIcon />
          </button>
        </div>
      ) : (
        <div>
          <div className='bg-black fixed w-full h-16 shadow-xl shadow-zinc-800'></div>
          <button
            onClick={() => toogleNavItems()}
            className='text-gray-400 fixed top-5 right-5 sm:hidden hover:cursor-pointer hover:text-white'
          >
            <HamburgerIcon />
          </button>
        </div>
      )}
    </nav>
  );
}
