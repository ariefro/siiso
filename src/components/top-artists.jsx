import "../styles/output.css"
import { useEffect, useState } from "react";
import { fetchTopArtists } from "@/lib/spotify";
import useSpotify from "@/hook/useSpotify";
import Image from "next/image";
import Error from "./error";

export default function TopArtists() {
  const spotifyApi = useSpotify()
  const [topArtists, setTopArtists] = useState(null)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
      const topArtists = await fetchTopArtists(10, "long_term")
      setTopArtists(topArtists)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
   fetchData() 
  }, [spotifyApi])

  return (
    <div className="w-10/12 md:w-11/12 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {error && <Error />}
      {topArtists?.body?.items?.map((artist) => (
        <button key={artist.id} className="text-sm text-white flex flex-col items-center text-center space-y-3">
          {artist?.images?.[0].url && (<Image src={artist?.images?.[0].url} width={256} height={256} alt="photo album" className="rounded-full w-32 h-32 md:w-52 md:h-52 2xl:w-64 2xl:h-64"></Image>)}
          <p>{artist?.name}</p>
        </button>
      ))}
    </div>
  )
}
