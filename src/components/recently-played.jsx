import React, { useEffect, useState } from 'react';
import { fetchRecentlyPlayedTracks } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import { Loading, Track } from '@/components';

export default function RecentlyPlayed() {
  const spotifyApi = useSpotify();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const recentlyPlayedTracks = await fetchRecentlyPlayedTracks();
      setTracks(recentlyPlayedTracks);
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
    <div className='pt-16 pb-6 md:pb-28 px-10 overflow-y-scroll no-scrollbar'>
      {!error && loading && <Loading />}
      <h1 className='capitalize text-white text-xl font-bold pb-16'>
        recently played tracks
      </h1>
      <ul>
        {tracks?.body?.items?.map((item) => (
          <Track track={item.track} key={item.track.id} />
        ))}
      </ul>
    </div>
  );
}
