import {
  BackwardStepIcon,
  ForwardStepIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
} from './icons';

export default function Controls({
  handleShuffleMode,
  handleSkipToPrevious,
  handlePlayPause,
  handleSkipNext,
  handleRepeatMode,
  shufflePlayback,
  repeatMode,
  isPlaying,
}) {
  return (
    <div className='flex items-center grow justify-center text-zinc-300 '>
      <button
        onClick={handleShuffleMode}
        className={`hidden sm:inline ml-4 sm:ml-8 ${
          shufflePlayback ? 'text-green-400' : 'hover:text-white'
        }`}
      >
        <ShuffleIcon />
      </button>
      <button
        onClick={handleSkipToPrevious}
        className='hover:text-white ml-4 sm:ml-8'
      >
        <BackwardStepIcon />
      </button>
      {isPlaying ? (
        <button
          onClick={handlePlayPause}
          className='hover:text-white mr-4 ml-4 sm:mr-8 sm:ml-8'
        >
          <PauseIcon />
        </button>
      ) : (
        <button
          onClick={handlePlayPause}
          className='hover:text-white mr-4 ml-4 sm:mr-8 sm:ml-8'
        >
          <PlayIcon />
        </button>
      )}
      <button
        onClick={handleSkipNext}
        className='hover:text-white mr-4 sm:mr-8'
      >
        <ForwardStepIcon />
      </button>
      <button
        onClick={handleRepeatMode}
        className={`hidden sm:inline ${
          repeatMode === 'track' ? 'text-green-400' : 'hover:text-white'
        }`}
      >
        <RepeatIcon />
      </button>
    </div>
  );
}
