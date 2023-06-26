import '../../styles/output.css';
import { MainNavbar } from '@/components';
import DetailArtist from '@/components/detail-artist';
import { SessionProvider, getSession } from 'next-auth/react';

export default function DetailArtistPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className='bg-zinc-900 flex h-screen w-full'>
        <MainNavbar />
        <div className='w-full max-w-7xl 2xl:mx-auto'>
          <DetailArtist />
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
