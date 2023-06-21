import { SessionProvider, getSession } from 'next-auth/react'
import "../../styles/output.css"
import MainNavbar from '@/components/main-navbar'
import Navbar from '@/components/navbar'
import TopArtists from '@/components/top-artists'

export default function TopArtistsPage({ session }) {
  return (
    <SessionProvider session={ session }>
      <div className='bg-zinc-800 flex'>
        <MainNavbar />
        <div className='w-full space-y-14 h-screen overflow-y-scroll scrollbar-hide'>
          <Navbar title={"Top Artists"}/>
          <TopArtists />
        </div>
      </div>
    </SessionProvider>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}