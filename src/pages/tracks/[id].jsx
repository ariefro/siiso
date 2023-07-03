import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { DetailTrack, MainNavbar, Player, UserProvider } from '@/components';
import { RecoilRoot } from 'recoil';

export default function DetailTrackPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <div className='h-screen bg-zinc-900 flex'>
            <MainNavbar />
            <div className='max-w-7xl w-full m-10 md:m-20'>
              <DetailTrack />
            </div>
            <Player />
          </div>
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
