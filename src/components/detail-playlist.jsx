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
import { useRecoilState } from 'recoil';
import { errorState } from '@/atoms/error-atom';

export default function DetailPlaylist() {
  const router = useRouter();
  const { id } = router.query;
  const spotifyApi = useSpotify();
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useRecoilState(errorState);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 50;
  const offset = (currentPage - 1) * limit;

  const getPlaytlistTracks = async (id, limit, offset) => {
    try {
      setLoading(true);
      const tracks = await fetchPlaylistTracks(id, limit, offset);
      setTracks(tracks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getPlaytlistTracks(id, limit, offset);
  }, [spotifyApi, id, offset]);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className='h-full mb-6'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <div className='md:flex md:pl-10 px-10'>
        <HeaderDetailPlaylist />
        <ul className='md:mt-16 grow'>
          {tracks?.body?.items.map((item) => (
            <Track track={item.track} key={item.track.id} />
          ))}
          <Pagination
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
            currentItem={offset}
            totalItem={tracks?.body?.total}
            limitItemPerPage={limit}
          />
        </ul>
      </div>
    </div>
  );
}
