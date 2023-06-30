'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hook/useSpotify';
import { fetchUserData } from '@/lib/spotify';
import Image from 'next/image';
import { Error, Header, ListHeading, Loading, Track } from '@/components';
import Link from 'next/link';
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
    <div className='w-full overflow-y-scroll no-scrollbar px-10 pb-28 md:pb-14'>
      {!error && loading && <Loading />}
      {error && <Error />}
      <Header session={session} user={user} playlists={playlists} />
      <div className='lg:flex'>
        <div className='lg:w-1/2 lg:mr-16 mb-20'>
          <ListHeading title={'top artists'} href={'/artists'} />
          <ul>
            {topArtists?.map((artist) => (
              <li
                key={artist?.id}
                className='p-3 group hover:bg-zinc-800 hover:cursor-pointer hover:opacity-100 rounded-sm'
              >
                <Link
                  href={'/artists/' + artist.id}
                  className='flex items-center space-x-4'
                >
                  {artist?.images?.[0].url && (
                    <Image
                      src={artist?.images?.[0].url}
                      width={50}
                      height={50}
                      alt='photo album'
                      className='rounded-full w-[50px] h-[50px] group-hover:opacity-50 hover:ease-out duration-500'
                    ></Image>
                  )}
                  <p className='text-sm md:text-base text-white group-hover:underline underline-offset-4'>
                    {artist?.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='lg:w-1/2'>
          <ListHeading title={'top tracks'} href={'/tracks'} />
          <ul>
            {topTracks?.map((track) => (
              <Track track={track} key={track.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
