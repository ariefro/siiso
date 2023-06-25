import '../../styles/output.css';
import { SessionProvider, getSession } from 'next-auth/react';
import { BottomNavbar, MainNavbar, Player, PlaylistDetail } from '@/components';

export default function PlaylistDetails({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex min-h-screen bg-zinc-900'>
        <MainNavbar className={'fixed h-screen'} />
        <Player className={'fixed bottom-0'} />
        <div className='max-w-7xl flex flex-col w-full md:ml-28 2xl:mx-auto'>
          <PlaylistDetail />
          <BottomNavbar className={'fixed bottom-0'} />
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
