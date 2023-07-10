import { useEffect, useState } from 'react';
import { fetchTopArtists } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import Image from 'next/image';
import Link from 'next/link';
import { EmptyData, Error, Loading } from '@/components';
import { useRecoilValue } from 'recoil';
import { rangeTimeTrackState } from '@/atoms/track-atom';
import { InfoIcon } from './icons';

export default function TopArtists() {
  const spotifyApi = useSpotify();
  const range = useRecoilValue(rangeTimeTrackState);
  const [topArtists, setTopArtists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async (range) => {
    try {
      const topArtists = await fetchTopArtists({
        limit: 50,
        range,
      });
      setTopArtists(topArtists?.body.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(range);
  }, [spotifyApi, range]);

  return (
    <div>
      {!error && loading && <Loading />}
      {error && <Error />}
      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-32 px-10'>
        {topArtists.length !== 0 ? (
          topArtists.map((artist) => (
            <li
              key={artist.id}
              className='group flex flex-col items-center space-y-4 pb-6'
            >
              <Link href={'/artists/' + artist.id}>
                <div className='relative'>
                  {artist?.images?.[0].url && (
                    <div className='flex items-center justify-center'>
                      <Image
                        src={artist?.images?.[0].url}
                        width={224}
                        height={224}
                        alt='photo album'
                        className='rounded-full w-32 h-32 md:w-48 md:h-48 hover:opacity-40 hover:ease-out duration-500'
                      ></Image>
                      <span className='info-icon'>
                        <InfoIcon />
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <Link href={'/artists/' + artist.id}>
                <span className='text-white text-sm hover:underline underline-offset-4 decoration-1'>
                  {artist?.name}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <EmptyData />
        )}
      </ul>
    </div>
  );
}
