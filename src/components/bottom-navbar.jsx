import Link from 'next/link';
import {
  MicrophoneIcon,
  PlaylistIcon,
  RecentIcon,
  TrackIcon,
  UserIcon,
} from './icons';
import { usePathname } from 'next/navigation';

export default function BottomNavbar({ className }) {
  const pathname = usePathname();

  return (
    <nav className={`${className} bg-black w-full h-20 text-xs md:hidden`}>
      <div className='mx-auto flex'>
        <Link
          href='/'
          className={`mx-auto w-full ${
            pathname == '/' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className='relative'>
            {pathname == '/' && (
              <div className='bg-green-400 w-full h-1 absolute'></div>
            )}
          </div>
          <button
            className={`button-bottom-nav ${
              pathname == '/'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <UserIcon />
            <p>Profile</p>
          </button>
        </Link>
        <Link
          href='/artists'
          className={`mx-auto w-full ${
            pathname == '/artists'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className='relative'>
            {pathname == '/artists' && (
              <div className='bg-green-400 w-full h-1 absolute'></div>
            )}
          </div>
          <button
            className={`button-bottom-nav ${
              pathname == '/artists'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <MicrophoneIcon />
            <p>Artists</p>
          </button>
        </Link>
        <Link
          href='/tracks'
          className={`mx-auto w-full ${
            pathname == '/tracks'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className='relative'>
            {pathname == '/tracks' && (
              <div className='bg-green-400 w-full h-1 absolute'></div>
            )}
          </div>
          <button
            className={`button-bottom-nav ${
              pathname == '/tracks'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrackIcon />
            <p>Tracks</p>
          </button>
        </Link>
        <Link
          href='/recent'
          className={`mx-auto w-full ${
            pathname == '/recent'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className='relative'>
            {pathname == '/recent' && (
              <div className='bg-green-400 w-full h-1 absolute'></div>
            )}
          </div>
          <button
            className={`button-bottom-nav ${
              pathname == '/recent'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <RecentIcon />
            <p>Recent</p>
          </button>
        </Link>
        <Link
          href='/playlists'
          className={`mx-auto w-full ${
            pathname == '/playlists'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className='relative'>
            {pathname == '/playlists' && (
              <div className='bg-green-400 w-full h-1 absolute'></div>
            )}
          </div>
          <button
            className={`button-bottom-nav ${
              pathname == '/playlists'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <PlaylistIcon />
            <p>Playlists</p>
          </button>
        </Link>
      </div>
    </nav>
  );
}
