import { SessionProvider, getSession } from 'next-auth/react';
import '../styles/output.css';
import User from '@/components/user';
import MainNavbar from '@/components/main-navbar';

export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='h-screen flex overflow-hidden bg-zinc-900'>
        <MainNavbar />
        <div className='max-w-7xl w-full mx-auto'>
          <User />
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
