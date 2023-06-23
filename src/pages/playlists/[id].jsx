import '../../styles/output.css';
import { SessionProvider, getSession } from 'next-auth/react';
import { MainNavbar, PlaylistDetail } from '@/components';

export default function PlaylistDetails({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex min-h-screen bg-zinc-900'>
        <MainNavbar />
        <div className='max-w-7xl w-full mx-auto overflow-y-scroll no-scrollbar'>
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
