import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { BottomMenu, MainNavbar, Playlists } from '@/components';
import { RecoilRoot } from 'recoil';
import UserProvider from '@/components/user-context';
import TrackProvider from '@/components/track-context';

export default function PlaylistsPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='flex bg-zinc-900 h-screen overflow-hidden'>
              <MainNavbar />
              <div className='w-full flex flex-col max-w-7xl mx-auto'>
                <Playlists />
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
