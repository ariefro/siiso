import useSpotify from '@/hook/useSpotify';
import { fetchArtistTopTracks, fetchDataArtist } from '@/lib/spotify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EmptyData, Track } from '.';

export default function DetailArtist() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSelectedTrack = (track) => {
    if (selectedTrack === track) {
      setSelectedTrack(!track);
    } else {
      setSelectedTrack(track);
    }
  };

  const numberFormatter = Intl.NumberFormat('en-US');
  const formattedNumber = numberFormatter.format(artist?.followers.total);

  useEffect(() => {
    const fetchData = async () => {
      const artist = await fetchDataArtist(id);
      const topTracks = await fetchArtistTopTracks(id);
      setTopTracks(topTracks?.body.tracks);
      setArtist(artist?.body);
    };

    fetchData();
  }, [spotifyApi, id]);

  return (
    <div className='overflow-y-scroll no-scrollbar h-screen pt-28 sm:pt-20 pb-32'>
      <div className='space-y-9 text-white flex flex-col justify-center items-center'>
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
      <div className='mt-20 px-10'>
        <h2 className='text-white text-xl font-bold mb-6'>Popular</h2>
        {topTracks.length !== 0 ? (
          topTracks.map((item) => (
            <Track
              track={item}
              key={item.id}
              isSelected={selectedTrack === item}
              handleClick={handleSelectedTrack}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </div>
    </div>
  );
}
