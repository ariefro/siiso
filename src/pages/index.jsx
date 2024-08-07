import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import {
  User,
  MainNavbar,
  AudioPlayer,
  UserProvider,
  TrackProvider,
  HeadMeta,
} from '@/components';

export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <HeadMeta />
            <div className='h-screen flex bg-zinc-900'>
              <MainNavbar />
              <div className='max-w-7xl flex flex-col w-full mx-auto'>
                <User />
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
