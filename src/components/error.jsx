import { useRouter } from 'next/router';

function Error() {
  const router = useRouter();

  return (
    <div className='text-white px-10 text-center absolute flex flex-col space-y-5 items-center justify-center top-0 left-0 z-50 bg-zinc-900 w-full h-screen'>
      <h3 className='text-lg'>There was an error.</h3>
      <button
        onClick={() => router.reload()}
        className='border-spacing-2 border-white px-4 py-1 hover:bg-white text-sm hover:text-black border-2'
      >
        Reset
      </button>
    </div>
  );
}

export default Error;
