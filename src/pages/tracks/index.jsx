import Navbar from "@/components/navbar";
import "../../styles/output.css"
import MainNavbar from "@/components/main-navbar";
import TopTracks from "@/components/top-tracks";
import { SessionProvider, getSession } from "next-auth/react";

export default function TopTracksPage({ session }) {
  return (
    <SessionProvider session={session}>
        <div className="flex bg-zinc-800">
            <MainNavbar />
            <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
                <Navbar title={"Top Tracks"}/>
                <TopTracks/>
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