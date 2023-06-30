import '../../styles/output.css';
import { SessionProvider, getSession } from 'next-auth/react';
import { MainNavbar, DetailPlaylist, BottomMenu } from '@/components';
import { RecoilRoot } from 'recoil';
import UserProvider from '@/components/user-context';
import TrackProvider from '@/components/track-context';

export default function PlaylistDetails({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='flex min-h-screen bg-zinc-900'>
              <MainNavbar className={'fixed'} />
              <div className='max-w-7xl flex flex-col w-full ml-24 md:ml-40 2xl:mx-auto pb-28 md:pb-32'>
                <DetailPlaylist />
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
