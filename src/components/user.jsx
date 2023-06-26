'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import useSpotify from '@/hook/useSpotify';
import { fetchUserData } from '@/lib/spotify';
import Image from 'next/image';
import { Error, Header, ListHeading, Loading, Track } from '@/components';

function User() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const { user, playlists, topArtists, topTracks } = await fetchUserData();
      setUser(user);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
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
    <div className='w-full overflow-y-scroll no-scrollbar px-10 pb-28 md:pb-8'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <Header session={session} user={user} playlists={playlists} />
      <div className='md:flex'>
        <div className='md:w-1/2 md:mr-16 mb-20'>
          <ListHeading title={'top artists'} href={'/artists'} />
          <ul>
            {topArtists?.body.items.map((artist) => (
              <li key={artist?.id} className='mb-6 flex items-center space-x-4'>
                {artist?.images?.[0].url && (
                  <Image
                    src={artist?.images?.[0].url}
                    width={50}
                    height={50}
                    alt='photo album'
                    className='rounded-full w-[50px] h-[50px]'
                  ></Image>
                )}
                <p className='text-sm md:text-base text-white'>
                  {artist?.name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:w-1/2'>
          <ListHeading title={'top tracks'} href={'/tracks'} />
          <ul>
            {topTracks?.body?.items?.map((track) => (
              <Track track={track} key={track.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
