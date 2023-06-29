import { RightIcon, LeftIcon } from './icons';

export default function Pagination({
  paginateFront,
  paginateBack,
  currentPage,
  currentItem,
  totalItem,
  limitItemPerPage,
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const next = async () => {
    await paginateFront();
    scrollToTop();
  };

  const back = async () => {
    await paginateBack();
    scrollToTop();
  };

  return (
    <div className='mt-10 flex justify-center'>
      <nav className='text-white text-sm space-x-16'>
        <button
          onClick={back}
          disabled={currentPage == 1}
          className='text-gray-400 hover:text-white disabled:text-gray-500'
        >
          <LeftIcon />
        </button>
        <button
          onClick={next}
          disabled={totalItem - currentItem <= limitItemPerPage}
          className='text-gray-400 hover:text-white disabled:text-gray-500'
        >
          <RightIcon />
        </button>
      </nav>
    </div>
  );
}
