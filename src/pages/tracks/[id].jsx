import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import {
  DetailTrack,
  MainNavbar,
  AudioPlayer,
  UserProvider,
  HeadMeta,
} from '@/components';
import { RecoilRoot } from 'recoil';

export default function DetailTrackPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <HeadMeta />
          <div className='bg-zinc-900 min-h-screen flex'>
            <MainNavbar />
            <div className='max-w-7xl 2xl:mx-auto w-full mt-16 mb-32'>
              <DetailTrack />
            </div>
            <AudioPlayer />
          </div>
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
