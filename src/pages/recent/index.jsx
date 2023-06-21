import RecentlyPlayed from "@/components/recently-played";
import "../../styles/output.css";
import MainNavbar from "@/components/main-navbar";
import { SessionProvider, getSession } from "next-auth/react";

export default function RecentPage({ session }) {
  return (
    <SessionProvider session={session}>
      <div className="flex">
        <MainNavbar />
        <div className="bg-zinc-800 w-full h-screen overflow-y-scroll scrollbar-hide">
          <RecentlyPlayed />
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
