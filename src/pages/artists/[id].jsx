import '../../styles/output.css';
import {
  AudioPlayer,
  DetailArtist,
  MainNavbar,
  TrackProvider,
  UserProvider,
} from '@/components';
import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export default function DetailArtistPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='bg-zinc-900 flex h-screen w-full'>
              <MainNavbar />
              <div className='w-full max-w-7xl 2xl:mx-auto'>
                <DetailArtist />
              </div>
            </div>
            <AudioPlayer />
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
