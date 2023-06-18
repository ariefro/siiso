"use client";

import { useState } from "react";
import Link from "next/link";
import { MicrophoneIcon, PlaylistIcon, RecentIcon, TrackIcon, UserIcon } from "./icons";

function Sidebar() {
  const [isButtonFocused, setIsButtonFocused] = useState('profile');

  const handleButtonClick = (button) => {
    setIsButtonFocused(button)
  }

  return (
    <div className="text-gray-400 text-xs bg-black border-r border-gray-900 h-screen w-28 lg:max-w-md hidden md:inline-flex">
      <div className="m-auto w-full">
        <Link href="/" className={`nav ${isButtonFocused == 'profile' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'}`}>
          <button onClick={() => handleButtonClick('profile')} className={`button-nav ${isButtonFocused == 'profile' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <UserIcon />
            <p>Profile</p>
          </button>
          {isButtonFocused === 'profile' && <div className="green-line"></div>}
        </Link>
        <Link href="/" className={`nav ${isButtonFocused == 'top-artists' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'}`}>
          <button onClick={() => handleButtonClick('top-artists')} className={`button-nav ${isButtonFocused == 'top-artists' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <MicrophoneIcon />
            <p>Top Artists</p>
          </button>
          {isButtonFocused === 'top-artists' && <div className="green-line"></div>}
        </Link>
        <Link href="/" className={`nav ${isButtonFocused == 'top-tracks' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'}`}>
          <button onClick={() => handleButtonClick('top-tracks')} className={`button-nav ${isButtonFocused == 'top-tracks' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <TrackIcon />
            <p>Top Tracks</p>
          </button>
          {isButtonFocused === 'top-tracks' && <div className="green-line"></div>}
        </Link>
        <Link href="/" className={`nav ${isButtonFocused == 'recent' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'}`}>
          <button onClick={() => handleButtonClick('recent')} className={`button-nav ${isButtonFocused == 'recent' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <RecentIcon />
            <p>Recent</p>
          </button>
          {isButtonFocused === 'recent' && <div className="green-line"></div>}
        </Link>
        <Link href="/" className={`nav ${isButtonFocused == 'playlists' ? 'active-nav' : 'text-gray-400 hover:text-gray-200'}`}>
          <button onClick={() => handleButtonClick('playlists')} className={`button-nav ${isButtonFocused == 'playlists' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <PlaylistIcon />
            <p>Playlists</p>
          </button>
          {isButtonFocused === 'playlists' && <div className="green-line"></div>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;


