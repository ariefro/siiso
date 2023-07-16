import { rangeTimeTrackState } from '@/atoms/track-atom';
import { useRecoilState } from 'recoil';

export default function Navbar({ title }) {
  const [range, setRange] = useRecoilState(rangeTimeTrackState);

  const handleButtonClick = (range) => {
    setRange(range);
  };

  return (
    <nav className='block md:justify-between pt-28 sm:pt-20 sm:px-10 md:flex w-full'>
      <div className='flex justify-center mb-4 md:mb-0'>
        <h2 className='text-xl font-bold text-white'>{title}</h2>
      </div>
      <ul className='flex justify-evenly md:space-x-7'>
        <li>
          <button
            onClick={() => handleButtonClick('long_term')}
            className={`nav ${range == 'long_term' ? 'active-button' : 'nav'}`}
          >
            All Time
          </button>
        </li>
        <li>
          <button
            onClick={() => handleButtonClick('medium_term')}
            className={`nav ${
              range == 'medium_term' ? 'active-button' : 'nav'
            }`}
          >
            Last 6 Months
          </button>
        </li>
        <li>
          <button
            onClick={() => handleButtonClick('short_term')}
            className={`nav ${range == 'short_term' ? 'active-button' : 'nav'}`}
          >
            Last 4 Weeks
          </button>
        </li>
      </ul>
    </nav>
  );
}
