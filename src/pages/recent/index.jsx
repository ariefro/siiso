import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../../styles/output.css';
import {
  MainNavbar,
  AudioPlayer,
  RecentlyPlayed,
  TrackProvider,
  UserProvider,
  HeadMeta,
} from '@/components';

export default function RecentPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <HeadMeta />
            <div className='flex bg-zinc-900'>
              <MainNavbar />
              <div className='w-full flex flex-col max-w-7xl mx-auto h-screen'>
                <RecentlyPlayed />
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
