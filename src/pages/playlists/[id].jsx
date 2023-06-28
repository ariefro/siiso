import '../../styles/output.css';
import { SessionProvider, getSession } from 'next-auth/react';
import { MainNavbar, DetailPlaylist, BottomMenu } from '@/components';
import { RecoilRoot } from 'recoil';
import UserProvider from '@/components/user-context';

export default function PlaylistDetails({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <div className='flex min-h-screen bg-zinc-900'>
            <MainNavbar className={'fixed h-screen'} />
            <div className='max-w-7xl flex flex-col w-full md:ml-28 2xl:mx-auto pb-28 md:pb-32'>
              <DetailPlaylist />
            </div>
          </div>
          <BottomMenu />
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
