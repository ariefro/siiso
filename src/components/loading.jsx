function Loading() {
  return (
    <div className='h-screen w-full bg-zinc-900 flex items-center justify-center md:pl-28'>
      <div className='flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-green-400 to-zinc-800 animate-spin'>
        <div className='h-12 w-12 rounded-full bg-zinc-900'></div>
      </div>
    </div>
  );
}

export default Loading;
