import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../styles/output.css';
import {
  User,
  MainNavbar,
  Player,
  UserProvider,
  TrackProvider,
} from '@/components';

export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='h-screen flex bg-zinc-900'>
              <MainNavbar />
              <div className='max-w-7xl flex flex-col w-full mx-auto'>
                <User />
              </div>
              <Player />
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
