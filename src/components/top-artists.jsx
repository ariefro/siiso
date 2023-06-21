import { useEffect, useState } from "react";
import { fetchTopArtists } from "@/lib/spotify";
import useSpotify from "@/hook/useSpotify";
import Image from "next/image";
import Error from "./error";
import Loading from "./loading";
import Link from "next/link";

export default function TopArtists() {
  const spotifyApi = useSpotify()
  const [topArtists, setTopArtists] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const topArtists = await fetchTopArtists(30, "long_term")
      setTopArtists(topArtists)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
   fetchData() 
  }, [spotifyApi])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-6 px-10">
      {!error && loading && <Loading />}
      {error && <Error />}
      {topArtists?.body?.items?.map((artist) => (
        <div key={artist.id} className="flex flex-col items-center space-y-4">
          <Link href="/">
            {artist?.images?.[0].url && (<Image src={artist?.images?.[0].url} width={224} height={224} alt="photo album" className="rounded-full w-32 h-32 md:w-48 md:h-48 2xl:w-56 2xl:h-56"></Image>)}
          </Link>
          <Link href="/">
            <span className="text-white text-sm hover:underline underline-offset-4 decoration-1">{artist?.name}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
