import React, { useEffect, useState } from 'react';
import Loading from './loading';
import Error from './error';
import { fetchPlaylistDetail } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import { useRouter } from 'next/router';
import Track from './track';
import Image from 'next/image';

export default function PlaylistDetail(props) {
  const router = useRouter();
  const id = router.query.id;
  const spotifyApi = useSpotify();
  const [playlistData, setPlaylistData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log('=====', playlistData);

  const getPlaytlistData = async (id) => {
    try {
      const data = await fetchPlaylistDetail(id);
      setPlaylistData(data.body);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getPlaytlistData(id);
  }, [spotifyApi, id]);

  return (
    <div className='w-full px-10 md:flex'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <div className='my-16 space-y-3 flex flex-col items-center md:w-72 md:mr-12'>
        {playlistData?.images?.[0].url && (
          <Image
            src={playlistData?.images?.[0].url}
            alt='photo album'
            height={360}
            width={360}
            className='hidden md:inline-block bg-red-700'
          ></Image>
        )}
        <h2 className='font-bold text-3xl text-white'>{playlistData?.name}</h2>
        <p className='text-xs text-gray-400'>
          By {playlistData?.owner.display_name}
        </p>
        <p className='text-xs text-gray-400 text-center'>
          {playlistData?.description}
        </p>
      </div>
      <div className='md:mt-16 grow'>
        {playlistData?.tracks.items.map((item) => (
          <Track track={item.track} key={item.track.id} />
        ))}
      </div>
    </div>
  );
}
