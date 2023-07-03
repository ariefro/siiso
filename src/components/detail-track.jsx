import { fetchAudioFeaturesForTrack, fetchTrackDetail } from '@/lib/spotify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Error, Loading } from '.';
import useSpotify from '@/hook/useSpotify';
import Image from 'next/image';

export default function DetailTrack() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const [trackInfo, setTrackInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (id) => {
    try {
      const trackInfo = await fetchTrackDetail(id);
      setTrackInfo(trackInfo.body);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [spotifyApi, id]);

  return (
    <div>
      {error && <Error />}
      {!error && loading && <Loading />}
      <div className='flex space-x-10'>
        {trackInfo?.album.images?.[0].url && (
          <Image
            src={trackInfo?.album.images?.[0].url}
            alt='photo album'
            width={256}
            height={256}
            className='w-52 h-52 md:w-64 md:h-64'
          ></Image>
        )}
        <div className='space-y-2 md:space-y-3 mt-2'>
          <h3 className='text-white text-3xl md:text-4xl font-bold'>
            {trackInfo?.name}
          </h3>
          <p className='text-gray-400 text-xl md:text-2xl font-semibold'>
            {trackInfo?.artists?.[0].name}
          </p>
          <div className='flex text-gray-400 pb-5'>
            <p>
              {trackInfo?.album.name}
              <span>&nbsp;&#183;&nbsp;</span>
              {trackInfo?.album.release_date.split('-')[0]}
            </p>
          </div>

          <button className='button'>play</button>
        </div>
      </div>
    </div>
  );
}
