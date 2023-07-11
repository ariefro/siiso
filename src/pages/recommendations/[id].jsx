import { SessionProvider, getSession } from 'next-auth/react';
import '../../styles/output.css';
import { MainNavbar, PlaylistProvider, Recommendations } from '@/components';
import { RecoilRoot } from 'recoil';

export default function RecommendationsPage({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <PlaylistProvider>
          <div className='flex bg-zinc-900 h-screen w-full'>
            <MainNavbar />
            <Recommendations />
          </div>
        </PlaylistProvider>
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
