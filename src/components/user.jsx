"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Header from "./header"
import Error from "./error"
import Loading from "./loading"
import useSpotify from "@/hook/useSpotify"
import { fetchUserData } from "@/lib/spotify"
import Link from "next/link"
import Image from "next/image"
import Track from "./track"

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

        <div className="md:w-1/2 md:mr-16 mb-20">
          <div className="flex items-center mb-10 justify-between">
            <h3 className="font-extrabold text-xl text-white md:mr-3">Top Artists</h3>
            <Link href="/artists">
              <button className="button">SEE MORE</button>
            </Link>
          </div>
          {topArtists?.body?.items?.map((artist) => (
            <div key={artist?.id} className="mb-6 flex items-center space-x-5">
              {artist?.images?.[0].url && (<Image src={artist?.images?.[0].url} width={50} height={50} alt="photo album" className="rounded-full"></Image>)}
              <p className="text-sm md:text-base text-white">{artist?.name}</p>
            </div>
          ))}
        </div>

        <div className="md:w-1/2">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-extrabold text-xl text-white md:mr-3">Top Tracks</h3>
            <button className="button">SEE MORE</button>
          </div>
          {topTracks?.body?.items?.map((track) => (
            <Track track={track} key={track.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default User