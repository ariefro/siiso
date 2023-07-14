export default function VolumeBar({ currentTrack, volume, setVolume }) {
  return (
    <div
      className={`${
        currentTrack !== undefined
          ? 'text-white w-1/4 hidden sm:flex justify-end mr-8 md:mr-12'
          : 'hidden'
      }`}
    >
      <input
        type='range'
        value={volume}
        min={0}
        max={100}
        onChange={(e) => setVolume(Number(e.target.value))}
        className='w-20 md:w-32'
      />
    </div>
  );
}
