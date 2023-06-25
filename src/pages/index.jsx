import { SessionProvider, getSession } from 'next-auth/react';
import '../styles/output.css';
import { User, MainNavbar, BottomNavbar, Player } from '@/components';

export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='h-screen flex bg-zinc-900'>
        <MainNavbar />
        <Player className={'fixed bottom-0'} />
        <div className='max-w-7xl flex flex-col w-full mx-auto'>
          <User />
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
