import { useEffect, useState } from "react"
import Track from "./track"
import { fetchTopTracks } from "@/lib/spotify"
import Error from "./error"
import useSpotify from "@/hook/useSpotify"
import Loading from "./loading"

function TopTracks({ className }) {
  const spotifyApi = useSpotify()
  const [topTracks, setTopTracks] = useState(null)
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
      const topTracks = await fetchTopTracks(50, "long_term")
      setTopTracks(topTracks)
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
    <div className={`${className} px-10 md:px-12 lg:px-14`}>
      {!error && loading && <Loading />}
      {error && <Error />}
      {topTracks?.body?.items?.map((track) => (
        <Track track={track} key={track.id}/>
      ))}
    </div>
  )
}

export default TopTracks