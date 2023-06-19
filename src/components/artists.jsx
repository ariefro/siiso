import "../../styles/output.css"
import Navbar from "@/components/navbar";
import MainNavbar from "@/components/main-navbar";
import { useEffect, useState } from "react";
import { fetchTopArtists } from "@/lib/spotify";
import useSpotify from "@/hook/useSpotify";

export default function Artists() {
  const spotifyApi = useSpotify()
  const [topArtists, setTopArtists] = useState(null)
  const [error, setError] = useState(false)
  console.log("====>", topArtists)

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
    <div className="bg-amber-600">
        <h1>Hello</h1>
    </div>
  )
}
