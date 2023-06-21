import { useState } from 'react';

export default function Navbar({ title }) {
  const [active, setActive] = useState('all-time');

  const handleButtonClick = (button) => {
    setActive(button);
  };

  return (
    <nav className='block md:justify-between pt-16 px-10 md:flex w-full'>
      <div className='flex justify-center mb-4 md:mb-0'>
        <h2 className='text-xl font-bold text-white'>{title}</h2>
      </div>
      <ul className='flex justify-evenly md:space-x-7'>
        <li>
          <button
            onClick={() => handleButtonClick('all-time')}
            className={`nav ${active == 'all-time' ? 'active-button' : 'nav'}`}
          >
            All Time
          </button>
        </li>
        <li>
          <button
            onClick={() => handleButtonClick('last-6-months')}
            className={`nav ${
              active == 'last-6-months' ? 'active-button' : 'nav'
            }`}
          >
            Last 6 Months
          </button>
        </li>
        <li>
          <button
            onClick={() => handleButtonClick('last-4-weeks')}
            className={`nav ${
              active == 'last-4-weeks' ? 'active-button' : 'nav'
            }`}
          >
            Last 4 Weeks
          </button>
        </li>
      </ul>
    </nav>
  );
}
