import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MicrophoneIcon,
  PlaylistIcon,
  RecentIcon,
  TrackIcon,
  UserIcon,
} from './icons';

export default function MainNavbar() {
  const pathname = usePathname();

  return (
    <nav className='text-gray-400 text-xs sticky top-0 z-50 bg-black border-r border-gray-900 h-screen w-28 lg:max-w-md hidden md:inline-flex'>
      <div className='m-auto w-full'>
        <Link
          href='/'
          className={`main-nav ${
            pathname == '/' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <button
            className={`button-nav ${
              pathname == '/'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <UserIcon />
            <p>Profile</p>
          </button>
          {pathname == '/' && <div className='green-line'></div>}
        </Link>
        <Link
          href='/artists'
          className={`main-nav ${
            pathname == '/artists'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <button
            className={`button-nav ${
              pathname == '/artists'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <MicrophoneIcon />
            <p>Top Artists</p>
          </button>
          {pathname == '/artists' && <div className='green-line'></div>}
        </Link>
        <Link
          href='/tracks'
          className={`main-nav ${
            pathname == '/tracks'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <button
            className={`button-nav ${
              pathname == '/tracks'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrackIcon />
            <p>Top Tracks</p>
          </button>
          {pathname == '/tracks' && <div className='green-line'></div>}
        </Link>
        <Link
          href='/recent'
          className={`main-nav ${
            pathname == '/recent'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <button
            className={`button-nav ${
              pathname == '/recent'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <RecentIcon />
            <p>Recent</p>
          </button>
          {pathname == '/recent' && <div className='green-line'></div>}
        </Link>
        <Link
          href='/playlists'
          className={`main-nav ${
            pathname == '/playlists'
              ? 'active-nav'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <button
            className={`button-nav ${
              pathname == '/playlists'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <PlaylistIcon />
            <p>Playlists</p>
          </button>
          {pathname == '/playlists' && <div className='green-line'></div>}
        </Link>
      </div>
    </nav>
  );
}
