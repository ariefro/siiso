import { useEffect, useState } from 'react';
import { fetchTopTracks } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import { EmptyData, Error, Loading, Track } from '@/components';
import { useRecoilValue } from 'recoil';
import { rangeTimeTrackState } from '@/atoms/track-atom';

function TopTracks() {
  const spotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const range = useRecoilValue(rangeTimeTrackState);
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

  const fetchData = async (range) => {
    try {
      const topTracks = await fetchTopTracks({ limit: 50, range });
      setTopTracks(topTracks?.body.items);
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
    <div className='px-10'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <ul>
        {topTracks.length !== 0 ? (
          topTracks.map((track) => (
            <Track
              track={track}
              isSelected={selectedTrack === track}
              handleClick={handleSelectedTrack}
              key={track.id}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </ul>
    </div>
  );
}

export default TopTracks;
