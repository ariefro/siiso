import { fetchUserPlaylists } from '@/lib/spotify';
import { useEffect, useState } from 'react';
import useSpotify from '@/hook/useSpotify';
import { Error, Loading, Playlist } from '@/components';

export default function Playlists() {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const playlists = await fetchUserPlaylists();
      setPlaylists(playlists);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [spotifyApi]);

  return (
    <div className='pt-16 px-10 pb-12 md:pb-32 overflow-y-scroll no-scrollbar'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <h1 className='text-xl font-bold text-white mb-16'>Your Playlists</h1>
      <div className='flex justify-center'>
        <ul className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10'>
          {playlists?.body?.items.map((playlist) => (
            <Playlist playlist={playlist} key={playlist.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
