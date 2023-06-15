"use client";

import { AiFillHome } from "react-icons/ai"
import { BiSearch, BiLibrary } from "react-icons/bi"
import { useState } from "react";

function Sidebar() {
  const [isButtonFocused, setIsButtonFocused] = useState('home');

  const handleButtonClick = (button) => {
    setIsButtonFocused(button)
  }

  return (
    <div className="text-gray-400 text-sm font-bold lg:text-base border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide w-1/3 lg:max-w-md hidden md:inline-flex">
      <div className="w-full">
        <div className="space-y-4 p-5 m-3 rounded-xl bg-gray-800 bg-opacity-70 flex flex-col h-28 justify-center">
          <button onClick={() => handleButtonClick('home')} className={`flex items-center space-x-2 outline-none ${isButtonFocused == 'home' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <AiFillHome className="h-7 w-7" />
            <p className="">Home</p>
          </button>
          <button onClick={() => handleButtonClick('search')} className={`flex items-center space-x-2 outline-none ${isButtonFocused == 'search' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <BiSearch className="h-7 w-7" />
            <p className="">Search</p>
          </button>
        </div>

        <div className="space-y-4 p-5 m-3 rounded-xl bg-gray-800 bg-opacity-70 flex flex-col h-screen">
          <button onClick={() => handleButtonClick('library')} className={`flex items-center space-x-2 outline-none ${isButtonFocused == 'library' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
            <BiLibrary className="h-7 w-7" />
            <p className="">Your Library</p>
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;


