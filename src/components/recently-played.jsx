import { useEffect, useState } from 'react';
import { fetchRecentlyPlayedTracks } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import { EmptyData, Loading, Track } from '@/components';

export default function RecentlyPlayed() {
  const spotifyApi = useSpotify();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSelectedTrack = (track) => {
    if (selectedTrack === track) {
      setSelectedTrack(!track);
    } else {
      setSelectedTrack(track);
    }
  };

  const fetchData = async () => {
    try {
      const recentlyPlayedTracks = await fetchRecentlyPlayedTracks();
      setTracks(recentlyPlayedTracks?.body.items);
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
    <div className='pt-28 sm:pt-20 pb-28 px-10 overflow-y-scroll no-scrollbar'>
      {!error && loading && <Loading />}
      <h1 className='capitalize text-white text-xl font-bold pb-11'>
        recently played tracks
      </h1>
      <ul>
        {tracks.length !== 0 ? (
          tracks.map((item) => (
            <Track
              track={item.track}
              isSelected={selectedTrack === item.track}
              handleClick={handleSelectedTrack}
              key={item.track.id}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </ul>
    </div>
  );
}
