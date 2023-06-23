import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { MainNavbar, RecentlyPlayed } from '@/components';

export default function RecentPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='flex bg-zinc-900'>
        <MainNavbar />
        <div className='w-full max-w-7xl mx-auto h-screen overflow-y-scroll no-scrollbar'>
          <RecentlyPlayed />
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
