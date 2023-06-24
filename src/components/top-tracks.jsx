import { useEffect, useState } from 'react';
import { fetchTopTracks } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import { Error, Loading, Track } from '@/components';

function TopTracks() {
  const spotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const topTracks = await fetchTopTracks(50, 'long_term');
      setTopTracks(topTracks);
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
    <div className='px-10'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <ul>
        {topTracks?.body?.items?.map((track) => (
          <Track track={track} key={track.id} />
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;
