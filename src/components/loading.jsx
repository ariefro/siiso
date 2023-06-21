function Loading() {
  return (
    <div className="h-screen absolute top-0 right-0 w-full bg-zinc-800 flex items-center justify-center pl-28">
      <div className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-green-500 to-zinc-800 animate-spin">
        <div className="h-12 w-12 rounded-full bg-zinc-800"></div>
      </div>
    </div>
  );
}

export default Loading;
