import Navbar from "@/components/navbar";
import "../../styles/output.css"
import MainNavbar from "@/components/main-navbar";
import TopTracks from "@/components/top-tracks";
import { SessionProvider } from "next-auth/react";

export default function TopTracksPage() {

    
  return (
    <SessionProvider>
        <div className="flex bg-zinc-800 min-h-screen">
            <MainNavbar />
            <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
                <Navbar title={"Top Tracks"}/>
                <TopTracks className="mt-12"/>
            </div>
        </div>
    </SessionProvider>
  )
}
