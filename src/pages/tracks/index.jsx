import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../../styles/output.css';
import {
  MainNavbar,
  TopTracks,
  Navbar,
  AudioPlayer,
  UserProvider,
  TrackProvider,
  HeadMeta,
} from '@/components';
import Head from 'next/head';

export default function TopTracksPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <HeadMeta />
            <div className='flex bg-zinc-900 h-screen'>
              <MainNavbar />
              <div className='w-full flex flex-col max-w-7xl mx-auto'>
                <div className='overflow-y-scroll no-scrollbar space-y-10 pb-28 md:pb-36'>
                  <Navbar title={'Top Tracks'} />
                  <TopTracks />
                </div>
              </div>
              <AudioPlayer />
            </div>
          </TrackProvider>
        </UserProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
