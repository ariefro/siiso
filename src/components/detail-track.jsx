import { fetchTrackData, play } from '@/lib/spotify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Error, Loading } from '.';
import useSpotify from '@/hook/useSpotify';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { deviceState } from '@/atoms/device-atom';
import Link from 'next/link';
import { milisToMinutesAndSeconds } from '@/utils';
import TrackFeature from './track-feature';

export default function DetailTrack() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { id } = router.query;
  const device = useRecoilValue(deviceState);
  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (id) => {
    try {
      const { track, audioAnalysis, audioFeatures } = await fetchTrackData(id);
      setTrack(track.body);
      setAudioAnalysis(audioAnalysis.body);
      setAudioFeatures(audioFeatures.body);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [spotifyApi, id]);

  const playTrack = async () => {
    try {
      await play([track.uri]);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const isDeviceAvailable = device?.length != 0 && device?.[0].is_active;

  return (
    <div className='overflow-y-scroll no-scrollbar'>
      {error && <Error />}
      {!error && loading && <Loading />}
      <div className='flex sm:space-x-10 mt-24 flex-col items-center sm:flex-row '>
        {track?.album.images?.[0].url && (
          <Image
            src={track?.album.images?.[0].url}
            alt='photo album'
            width={256}
            height={256}
            className='w-52 h-52 md:w-64 md:h-64'
          ></Image>
        )}
        <div className='space-y-2 md:space-y-3 mt-6 sm:mt-2 flex flex-col items-center sm:items-start'>
          <h3 className='text-white text-3xl md:text-4xl text-center font-bold'>
            {track?.name}
          </h3>
          <p className='text-gray-400 text-xl md:text-2xl font-semibold'>
            {track?.artists?.[0].name}
          </p>
          <div className='flex text-sm text-center text-gray-400 pb-5'>
            <p>
              {track?.album.name}
              <span>&nbsp;&#183;&nbsp;</span>
              {track?.album.release_date.split('-')[0]}
            </p>
          </div>

          {isDeviceAvailable ? (
            <button onClick={() => playTrack()} className='button'>
              play
            </button>
          ) : (
            track && (
              <Link href={track?.external_urls.spotify} target='_blank'>
                <button className='button'>play on spotify</button>
              </Link>
            )
          )}
        </div>
      </div>

      <div className='text-gray-400 flex justify-center mt-20'>
        <div className='w-full grid grid-cols-2 md:grid-cols-4'>
          <TrackFeature
            data={milisToMinutesAndSeconds(audioFeatures?.duration_ms)}
            label='duration'
          />
          <TrackFeature
            data={audioFeatures?.time_signature}
            label='time signature'
          />
          <TrackFeature
            data={Math.round(audioFeatures?.tempo)}
            label='tempo (BPM)'
          />
          <TrackFeature
            data={Math.round(track?.popularity) + '%'}
            label='popularity'
          />
          <TrackFeature data={audioAnalysis?.bars.length} label='bars' />
          <TrackFeature data={audioAnalysis?.beats.length} label='beats' />
          <TrackFeature
            data={audioAnalysis?.sections.length}
            label='sections'
          />
          <TrackFeature
            data={audioAnalysis?.segments.length}
            label='segments'
          />
        </div>
      </div>
    </div>
  );
}
