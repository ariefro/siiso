import '../../styles/output.css';
import MainNavbar from '@/components/main-navbar';
import Playlists from '@/components/playlists';
import { SessionProvider, getSession } from 'next-auth/react';

export default function PlaylistsPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex bg-zinc-900'>
        <MainNavbar />
        <div className='w-full max-w-7xl mx-auto h-screen overflow-y-scroll no-scrollbar'>
          <Playlists />
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
