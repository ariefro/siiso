import { fetchPlaylists } from "@/lib/spotify"
import { useEffect, useState } from "react"
import Error from "./error"
import useSpotify from "@/hook/useSpotify"
import Loading from "./loading"
import Playlist from "./playlist"

export default function Playlists() {
    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const playlists = await fetchPlaylists()
            setPlaylists(playlists)
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
    <div className="">
        {!error && loading && <Loading />}
        {error && <Error />}
        <h1 className="text-xl font-bold text-white pt-20 mb-10 pl-9">Your Playlists</h1>
        <div className="flex justify-center">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:w-9/12 px-10 gap-10">
                {playlists?.body?.items.map((playlist) => (
                <Playlist playlist={playlist} key={playlist.id}/>
                ))}
            </div>
        </div>
    </div>
  )
}
