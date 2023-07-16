import { playlistState } from '@/atoms/playlist-atom';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { FeatureChart } from '.';
import { useEffect, useState } from 'react';
import { fetchTracksAudioFeatures } from '@/lib/spotify';
import useSpotify from '@/hook/useSpotify';

export default function HeaderDetailPlaylist() {
  const spotifyApi = useSpotify();
  const playlistData = useRecoilValue(playlistState);
  const [audioFeatures, setAudioFeatures] = useState(null);

  const getTracksAudioFeatures = async (tracks) => {
    const res = await fetchTracksAudioFeatures(tracks);
    setAudioFeatures(res?.body.audio_features);
  };

  useEffect(() => {
    if (playlistData?.tracks.items) {
      getTracksAudioFeatures(playlistData?.tracks.items);
    }
  }, [spotifyApi, playlistData]);

  return (
    <div className='my-16 space-y-2 flex flex-col items-center md:w-60 lg:w-64 grow md:mr-12'>
      {playlistData?.images?.[0].url && (
        <Image
          src={playlistData?.images?.[0].url}
          alt='photo album'
          height={360}
          width={360}
          className='hidden md:inline-block'
        ></Image>
      )}
      <h2 className='font-bold text-3xl text-center pt-10 sm:pt-4 text-white'>
        {playlistData?.name}
      </h2>
      <p className='text-xs text-gray-400'>
        By {playlistData?.owner.display_name}
      </p>
      <p className='text-xs text-gray-400 text-center'>
        {playlistData?.description}
      </p>
      <p className='text-xs text-white text-center'>
        {playlistData?.tracks.total} Tracks
      </p>
      <Link href={'/recommendations/' + playlistData?.id} className='pt-5 pb-4'>
        <button className='button'>get recommendations</button>
      </Link>
      <FeatureChart features={audioFeatures} axis={'y'} />
      <Link
        href={'https://open.spotify.com/playlist/' + playlistData?.id}
        target='_blank'
        className='pt-10 pb-4'
      >
        <button className='button'>open on spotify</button>
      </Link>
    </div>
  );
}
