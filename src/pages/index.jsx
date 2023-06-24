import { SessionProvider, getSession } from 'next-auth/react';
import '../styles/output.css';
import { User, MainNavbar, BottomNavbar } from '@/components';

export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='h-screen flex bg-zinc-900'>
        <MainNavbar />
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
