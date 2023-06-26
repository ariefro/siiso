import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import {
  BottomNavbar,
  MainNavbar,
  Navbar,
  Player,
  TopArtists,
} from '@/components';

export default function TopArtistsPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='bg-zinc-900 flex h-screen'>
        <MainNavbar />
        <Player className={'fixed bottom-0'} />
        <div className='w-full max-w-7xl mx-auto flex flex-col'>
          <div className='overflow-y-scroll no-scrollbar space-y-10'>
            <Navbar title={'Top Artists'} />
            <TopArtists />
          </div>
          <BottomNavbar />
        </div>
      </div>
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
