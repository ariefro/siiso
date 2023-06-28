import { SessionProvider, getSession } from 'next-auth/react';
import '../styles/output.css';
import { User, MainNavbar, BottomMenu } from '@/components';
import { RecoilRoot } from 'recoil';
import UserProvider from '@/components/user-context';

export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <UserProvider>
          <div className='h-screen flex bg-zinc-900'>
            <MainNavbar />
            <div className='max-w-7xl flex flex-col w-full mx-auto'>
              <User />
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
