import { milisToMinutesAndSeconds } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { InfoIcon, PlayIcon } from './icons';
import { useRecoilValue } from 'recoil';
import { userState } from '@/atoms/user-atom';
import { deviceState } from '@/atoms/device-atom';
import { currentTrackState, isPlayingState } from '@/atoms/track-atom';
import { useRecoilState } from 'recoil';
import { play } from '@/lib/spotify';

export default function Track({ track, isSelected, handleClick }) {
  const user = useRecoilValue(userState);
  const device = useRecoilValue(deviceState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const isDeviceAvailable = device?.length !== 0 && device?.[0].is_active;

  const playTrack = async () => {
    await play([track.uri]);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <li className='list-none mb-1'>
      <div
        onClick={() => handleClick(track)}
        className={`${
          isSelected && 'bg-zinc-600 hover:bg-zinc-600'
        } flex group items-center space-x-5 p-3 rounded-sm hover:bg-zinc-800`}
      >
        <div className='relative'>
          {track?.album?.images?.[0].url && (
            <div className='flex justify-center items-center'>
              <Link href={'/album/' + track?.album.id}>
                <Image
                  src={track?.album?.images?.[0].url}
                  width={50}
                  height={50}
                  alt='photo album'
                  className='group-hover:opacity-40 hover:ease-out duration-500'
                ></Image>
              </Link>
              <span className='info-icon'>
                {user?.product === 'premium' && isDeviceAvailable ? (
                  <button onClick={() => playTrack()}>
                    <PlayIcon />
                  </button>
                ) : (
                  <Link href={'/album/' + track?.album.id}>
                    <InfoIcon />
                  </Link>
                )}
              </span>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 w-full'>
          <div className='space-y-1 col-span-11'>
            <p className='text-sm md:text-base text-white truncate'>
              <Link href={'/tracks/' + track.id}>{track?.name}</Link>
            </p>
            <p className='text-xs text-gray-400 truncate'>
              <Link
                href={'/artists/' + track?.artists?.[0].id}
                className='hover:text-white hover:underline underline-offset-2'
              >
                {track?.artists?.[0].name}
              </Link>
              <span>
                {track?.album?.name && (
                  <span>
                    {' '}
                    -{' '}
                    <Link
                      href={'/album/' + track?.album.id}
                      className='hover:text-white hover:underline underline-offset-2'
                    >
                      {track?.album?.name}
                    </Link>
                  </span>
                )}
              </span>
            </p>
          </div>
          <div>
            <p className='text-xs mt-1 text-gray-400 text-right'>
              {milisToMinutesAndSeconds(track?.duration_ms)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
