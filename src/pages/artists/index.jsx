import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { MainNavbar, Navbar, TopArtists } from '@/components';

export default function TopArtistsPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='bg-zinc-900 flex'>
        <MainNavbar />
        <div className='w-full max-w-7xl mx-auto space-y-14 h-screen overflow-y-scroll no-scrollbar'>
          <Navbar title={'Top Artists'} />
          <TopArtists />
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
