import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { MainNavbar, TopTracks, Navbar } from '@/components';

export default function TopTracksPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex bg-zinc-900'>
        <MainNavbar />
        <div className='w-full h-screen max-w-7xl mx-auto overflow-y-scroll no-scrollbar'>
          <Navbar title={'Top Tracks'} />
          <TopTracks />
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
