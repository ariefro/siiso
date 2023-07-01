import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../../styles/output.css';
import {
  MainNavbar,
  Navbar,
  Player,
  TopArtists,
  TrackProvider,
  UserProvider,
} from '@/components';

export default function TopArtistsPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='bg-zinc-900 flex h-screen'>
              <MainNavbar />
              <div className='w-full max-w-7xl mx-auto flex flex-col'>
                <div className='overflow-y-scroll no-scrollbar space-y-10'>
                  <Navbar title={'Top Artists'} />
                  <TopArtists />
                </div>
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
