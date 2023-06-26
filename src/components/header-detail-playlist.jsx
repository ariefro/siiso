import useSpotify from '@/hook/useSpotify';
import { fetchPlaylistDetails } from '@/lib/spotify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function HeaderDetailPlaylist() {
  const router = useRouter();
  const { id } = router.query;
  const spotifyApi = useSpotify();
  const [playlistData, setPlaylistData] = useState(null);

  const getPlaytlistData = async (id) => {
    try {
      const res = await fetchPlaylistDetails(id);
      setPlaylistData(res.body);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getPlaytlistData(id);
  }, [spotifyApi, id]);

  return (
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
      <h2 className='font-bold text-3xl text-center px-1 text-white'>
        {playlistData?.name}
      </h2>
      <p className='text-xs text-gray-400'>
        By {playlistData?.owner.display_name}
      </p>
      <p className='text-xs text-gray-400 text-center'>
        {playlistData?.description}
      </p>
      <p className='text-xs pt-2 text-white text-center'>
        {playlistData?.tracks.total} Tracks
      </p>
    </div>
  );
}
