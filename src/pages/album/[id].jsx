import { SessionProvider, getSession } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../../styles/output.css';
import {
  DetailAlbum,
  MainNavbar,
  TrackProvider,
  UserProvider,
} from '@/components';

export default function DetailAlbumPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <TrackProvider>
            <div className='bg-zinc-900 w-full h-screen flex'>
              <MainNavbar />
              <DetailAlbum />
            </div>
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
