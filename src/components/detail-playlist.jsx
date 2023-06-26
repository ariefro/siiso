import { useEffect, useState } from 'react';
import { fetchPlaylistTracks } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';
import { useRouter } from 'next/router';
import {
  Error,
  HeaderDetailPlaylist,
  Loading,
  Pagination,
  Track,
} from '@/components';

export default function DetailPlaylist() {
  const router = useRouter();
  const { id } = router.query;
  const spotifyApi = useSpotify();
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 50;
  const offset = (currentPage - 1) * limit;

  const getPlaytlistData = async (id, limit, offset) => {
    try {
      setLoading(true);
      const tracks = await fetchPlaylistTracks(id, limit, offset);
      setTracks(tracks.body);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getPlaytlistData(id, limit, offset);
  }, [spotifyApi, id, offset]);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className='h-full overflow-y-scroll no-scrollbar'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <div className='md:flex px-10'>
        <HeaderDetailPlaylist />
        <ul className='md:mt-16 grow'>
          {tracks?.items?.map((item) => (
            <Track track={item.track} key={item.track.id} />
          ))}
          <Pagination
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
            currentItem={offset}
            totalItem={tracks.total}
            limitItemPerPage={limit}
          />
        </ul>
      </div>
    </div>
  );
}
