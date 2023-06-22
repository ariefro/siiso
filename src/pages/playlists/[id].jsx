import MainNavbar from '@/components/main-navbar';
import '../../styles/output.css';
import PlaylistDetail from '@/components/playlist-detail';
import { SessionProvider, getSession } from 'next-auth/react';

export default function PlaylistDetails({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex bg-zinc-900 '>
        <MainNavbar />
        <div className='h-screen w-full max-w-7xl mx-auto overflow-y-scroll no-scrollbar'>
          <PlaylistDetail />
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
