import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../../styles/output.css';
import {
  MainNavbar,
  DetailPlaylist,
  UserProvider,
  TrackProvider,
  AudioPlayer,
  PlaylistProvider,
  HeadMeta,
} from '@/components';

export default function PlaylistDetails({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <PlaylistProvider>
              <HeadMeta />
              <div className='flex min-h-screen bg-zinc-900'>
                <MainNavbar />
                <div className='max-w-7xl flex flex-col w-full 2xl:mx-auto pb-28'>
                  <DetailPlaylist />
                </div>
                <AudioPlayer />
              </div>
            </PlaylistProvider>
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
