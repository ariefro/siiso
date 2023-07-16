import { playlistState } from '@/atoms/playlist-atom';
import {
  addTracksToPlaylist,
  createPlaylist,
  getRecommendationsForTracks,
} from '@/lib/spotify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Error, Loading, Track } from '.';
import Link from 'next/link';
import useSpotify from '@/hook/useSpotify';

export default function Recommendations() {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState(null);
  const playlistData = useRecoilValue(playlistState);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSelectedTrack = (track) => {
    if (selectedTrack === track) {
      setSelectedTrack(!track);
    } else {
      setSelectedTrack(track);
    }
  };

  const getRecommendations = async (tracks) => {
    try {
      const res = await getRecommendationsForTracks(tracks);
      setRecommendations(res?.body?.tracks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const savePlaylist = async (name) => {
    try {
      const res = await createPlaylist(name);

      const uris = recommendations
        .map((item) => item.uri)
        .join(',')
        .split(',');
      await addTracksToPlaylist(res.body.id, uris);
      router.push('/playlists');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (playlistData?.tracks.items) {
      getRecommendations(playlistData?.tracks.items);
    }
  }, [playlistData, spotifyApi]);

  return (
    <div className='py-28 sm:pt-20 px-10 w-full max-w-7xl mx-auto overflow-y-scroll no-scrollbar'>
      {error && <Error />}
      {loading && <Loading />}
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center mb-11'>
        <h1 className='text-white capitalize text-xl font-bold text-center'>
          recommended tracks based on{' '}
          <span>
            <Link
              href={'/playlists/' + playlistData?.id}
              className='hover:text-green-400'
            >
              {playlistData?.name}
            </Link>
          </span>
        </h1>
        <button
          onClick={() =>
            savePlaylist(`Recommended Tracks Based On ${playlistData?.name}`)
          }
          className='button'
        >
          save playlist
        </button>
      </div>
      {recommendations?.map((track) => (
        <Track
          track={track}
          isSelected={selectedTrack === track}
          handleClick={handleSelectedTrack}
          key={track.id}
        />
      ))}
    </div>
  );
}
