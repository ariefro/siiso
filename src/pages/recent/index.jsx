import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { BottomNavbar, MainNavbar, Player, RecentlyPlayed } from '@/components';

export default function RecentPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex bg-zinc-900'>
        <MainNavbar />
        <Player className={'fixed bottom-0'} />
        <div className='w-full flex flex-col max-w-7xl mx-auto h-screen'>
          <RecentlyPlayed />
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
