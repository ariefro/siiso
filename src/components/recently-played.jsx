import React, { useEffect, useState } from 'react'
import Track from './track'
import { fetchRecentlyPlayedTracks } from '@/lib/spotify'
import Loading from './loading'
import useSpotify from '@/hook/useSpotify'

export default function RecentlyPlayed() {
  const spotifyApi = useSpotify()
  const [tracks, setTracks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  const fetchData = async () => {
    try {
      const recentlyPlayedTracks = await fetchRecentlyPlayedTracks()
      setTracks(recentlyPlayedTracks)
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
    <div className='pt-16 px-10'>
      {!error && loading && <Loading />}
        <h1 className="capitalize text-white text-xl font-bold pb-16">recently played tracks</h1>
        {tracks?.body?.items?.map((item) => (
          <Track track={item.track} key={item.track.id} />
        ))}
    </div>
  )
}
