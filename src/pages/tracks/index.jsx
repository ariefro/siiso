import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import {
  MainNavbar,
  TopTracks,
  Navbar,
  BottomNavbar,
  Player,
} from '@/components';
import { RecoilRoot } from 'recoil';

export default function TopTracksPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <div className='flex bg-zinc-900 h-screen'>
          <MainNavbar />
          <div className='w-full flex flex-col max-w-7xl mx-auto'>
            <div className='overflow-y-scroll no-scrollbar space-y-10 pb-28 md:pb-8'>
              <Navbar title={'Top Tracks'} />
              <TopTracks />
            </div>
            <Player />
            <BottomNavbar />
          </div>
        </div>
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
