"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import TopArtists from "./top-artists"
import TopTracks from "./top-tracks"
import Header from "./header"
import Error from "./error"
import Loading from "./loading"
import useSpotify from "@/hook/useSpotify"
import { fetchUserData } from "@/lib/spotify"

function User() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [user, setUser] = useState(null)
  const [playlists, setPlaylists] = useState(null)
  const [topArtists, setTopArtists] = useState(null)
  const [topTracks, setTopTracks] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    try {
      const { user, playlists, topArtists, topTracks } = await fetchUserData()
      setUser(user)
      setPlaylists(playlists)
      setTopArtists(topArtists)
      setTopTracks(topTracks)
      setLoading(false)
    } catch (error) {
      console.log("Something went wrong: ", error)
      setError(true)
    }
  }

  useEffect(() => {
    getUserData()
  }, [spotifyApi])

  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hide px-10">
      {!error && loading && 
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      }
      {error && <Error />}
      <Header session={session} user={user} playlists={playlists}/>
      <div className="md:flex">
        <TopArtists data={topArtists} />
        <TopTracks data={topTracks} />
      </div>
    </div>
  )
}

export default User