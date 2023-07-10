import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hook/useSpotify';
import { fetchUserData } from '@/lib/spotify';
import {
  Artist,
  EmptyData,
  Error,
  Header,
  ListHeading,
  Loading,
  Track,
} from '@/components';
import { userState } from '@/atoms/user-atom';
import { useRecoilValue } from 'recoil';

function User() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const user = useRecoilValue(userState);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const { playlists, topArtists, topTracks } = await fetchUserData();
      setPlaylists(playlists?.body);
      setTopArtists(topArtists?.body?.items);
      setTopTracks(topTracks?.body?.items);
      setLoading(false);
    } catch (error) {
      console.log('Something went wrong: ', error);
      setError(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, [spotifyApi]);

  return (
    <div className='w-full overflow-y-scroll no-scrollbar px-10 pb-28'>
      {!error && loading && <Loading />}
      {error && <Error />}

      <Header session={session} user={user} playlists={playlists} />
      <div className='lg:flex'>
        <div className='lg:w-1/2 lg:mr-16 mb-20'>
          <ListHeading title={'top artists'} href={'/artists'} />
          <ul>
            {topArtists?.length !== 0 ? (
              topArtists?.map((artist) => (
                <Artist key={artist.id} artist={artist} />
              ))
            ) : (
              <EmptyData />
            )}
          </ul>
        </div>

        <div className='lg:w-1/2'>
          <ListHeading title={'top tracks'} href={'/tracks'} />
          <ul>
            {topTracks?.length !== 0 ? (
              topTracks?.map((track) => <Track track={track} key={track.id} />)
            ) : (
              <EmptyData />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
