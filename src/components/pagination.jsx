import Link from 'next/link';
import { RightIcon, LeftIcon } from './icons';

export default function Pagination({
  paginateFront,
  paginateBack,
  currentPage,
  currentItem,
  totalItem,
  limitItemPerPage,
}) {
  return (
    <div className='mt-12 mb-16 flex justify-center'>
      <nav className='text-white text-sm space-x-16'>
        <Link href='#'>
          <button
            onClick={() => paginateBack()}
            disabled={currentPage == 1}
            className='text-gray-400 hover:text-white disabled:text-gray-500'
          >
            <LeftIcon />
          </button>
        </Link>
        <Link href='#'>
          <button
            onClick={() => paginateFront()}
            disabled={totalItem - currentItem <= limitItemPerPage}
            className='text-gray-400 hover:text-white disabled:text-gray-500'
          >
            <RightIcon />
          </button>
        </Link>
      </nav>
    </div>
  );
}
