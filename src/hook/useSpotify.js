import { spotifyApi } from "@/lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      spotifyApi.setAccessToken(session?.user?.access_token);
    } else if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session, status]);

  return spotifyApi;
}

export default useSpotify;
