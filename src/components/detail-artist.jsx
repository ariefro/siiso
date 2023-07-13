import useSpotify from '@/hook/useSpotify';
import { fetchDataArtist } from '@/lib/spotify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailArtist() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const [artist, setArtist] = useState(null);

  const numberFormatter = Intl.NumberFormat('en-US');
  const formattedNumber = numberFormatter.format(artist?.followers.total);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDataArtist(id);
      setArtist(res?.body);
    };

    fetchData();
  }, [spotifyApi, id]);

  return (
    <div className='space-y-9 text-white flex flex-col h-screen justify-center items-center'>
      {artist?.images?.[0].url && (
        <Image
          src={artist?.images?.[0].url}
          priority
          width={288}
          height={288}
          alt='photo artist'
          className='rounded-full w-52 h-52 md:w-72 md:h-72'
        ></Image>
      )}

      <h1 className='text-4xl md:text-6xl font-bold'>{artist?.name}</h1>
      <div className='flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-12 px-10'>
        <div className='text-center space-y-1'>
          <p className='font-bold text-lg md:text-xl text-green-400'>
            {formattedNumber}
          </p>
          <p className='uppercase font-light text-[0.72rem] md:text-xs'>
            followers
          </p>
        </div>
        <div className='text-center space-y-1'>
          <div className='capitalize font-bold text-lg md:text-xl text-green-400'>
            {artist?.genres.length !== 0 ? (
              artist?.genres.map((genre) => <p key={genre}>{genre}</p>)
            ) : (
              <p>-</p>
            )}
          </div>
          <p className='uppercase font-light text-[0.72rem] md:text-xs'>
            genres
          </p>
        </div>
        <div className='text-center space-y-1'>
          <p className='font-bold text-lg md:text-xl text-green-400'>
            {artist?.popularity}%
          </p>
          <p className='uppercase font-light text-[0.72rem] md:text-xs'>
            popularity
          </p>
        </div>
      </div>
    </div>
  );
}
