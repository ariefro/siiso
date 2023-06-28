import '../../styles/output.css';
import { BottomMenu, MainNavbar } from '@/components';
import DetailArtist from '@/components/detail-artist';
import UserProvider from '@/components/user-context';
import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export default function DetailArtistPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <div className='bg-zinc-900 flex h-screen w-full'>
            <MainNavbar />
            <div className='w-full max-w-7xl 2xl:mx-auto'>
              <DetailArtist />
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
