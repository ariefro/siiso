import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { BottomMenu, MainNavbar, RecentlyPlayed } from '@/components';
import { RecoilRoot } from 'recoil';
import UserProvider from '@/components/user-context';
import TrackProvider from '@/components/track-context';

export default function RecentPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='flex bg-zinc-900'>
              <MainNavbar />
              <div className='w-full flex flex-col max-w-7xl mx-auto h-screen'>
                <RecentlyPlayed />
              </div>
            </div>
            <BottomMenu />
          </TrackProvider>
        </UserProvider>
      </RecoilRoot>
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
