import { useEffect, useState } from "react"
import Track from "./track"
import { fetchTopTracks } from "@/lib/spotify"
import Error from "./error"
import useSpotify from "@/hook/useSpotify"

function TopTracks({ className }) {
  const spotifyApi = useSpotify()
  const [topTracks, setTopTracks] = useState(null)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
      const topTracks = await fetchTopTracks(50, "long_term")
      setTopTracks(topTracks)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [spotifyApi])

  return (
    <div className={`${className} px-10 md:px-12 lg:px-14`}>
      {error && <Error />}
      {topTracks?.body?.items?.map((track) => (
        <Track track={track} key={track.id}/>
      ))}
    </div>
  )
}

export default TopTracks