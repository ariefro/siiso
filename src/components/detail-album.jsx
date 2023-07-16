import useSpotify from '@/hook/useSpotify';
import { fetchAlbumDetail } from '@/lib/spotify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Error, HeaderDetailAlbum, Loading, Track } from '.';

export default function DetailAlbum() {
  const router = useRouter();
  const { id } = router.query;
  const spotifyApi = useSpotify();
  const [dataAlbum, setDataAlbum] = useState(null);
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

  const fetchData = async (id) => {
    try {
      const res = await fetchAlbumDetail(id);
      setDataAlbum(res?.body);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [spotifyApi, id]);

  return (
    <div className='px-10 py-28 w-full flex flex-col space-y-10 overflow-y-scroll no-scrollbar'>
      {error && <Error />}
      {!error && loading && <Loading />}
      <HeaderDetailAlbum dataAlbum={dataAlbum} />
      <ul>
        {dataAlbum?.tracks.items.map((track) => (
          <Track
            track={track}
            handleClick={handleSelectedTrack}
            isSelected={selectedTrack}
            key={track.id}
          />
        ))}
      </ul>
    </div>
  );
}
