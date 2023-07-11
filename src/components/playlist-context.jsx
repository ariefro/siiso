import { errorState } from '@/atoms/error-atom';
import { playlistState } from '@/atoms/playlist-atom';
import useSpotify from '@/hook/useSpotify';
import { fetchPlaylistDetails } from '@/lib/spotify';
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const PlaylistContext = createContext();

export default function PlaylistProvider({ children }) {
  const router = useRouter();
  const { id } = router.query;
  const spotifyApi = useSpotify();
  const [playlistData, setPlaylistData] = useRecoilState(playlistState);
  const [error, setError] = useRecoilState(errorState);

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
    <PlaylistContext.Provider value={playlistData}>
      {children}
    </PlaylistContext.Provider>
  );
}
