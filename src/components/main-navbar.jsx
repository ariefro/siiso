import { useState } from 'react';
import { NavLink } from '.';
import {
  MicrophoneIcon,
  PlaylistIcon,
  RecentIcon,
  TrackIcon,
  UserIcon,
} from './icons';

export default function MainNavbar({ className }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toogleNavItems = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <nav className={`${className}`}>
      <ul className='m-auto flex flex-col h-screen justify-center w-24 md:w-36 lg:max-w-md text-gray-400 bg-black border-r border-gray-900'>
        <NavLink href='/' title='Profile' Icon={UserIcon} />
        <NavLink href='/artists' title='Top Artists' Icon={MicrophoneIcon} />
        <NavLink href='/tracks' title='Top Tracks' Icon={TrackIcon} />
        <NavLink href='/recent' title='Recent' Icon={RecentIcon} />
        <NavLink href='/playlists' title='Playlists' Icon={PlaylistIcon} />
      </ul>
    </nav>
  );
}
