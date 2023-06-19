import Image from "next/image"
import Track from "./track"

function TopTracks({ data }) {
  return (
    <div className="md:w-1/2">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-extrabold text-xl text-white md:mr-3">Top Tracks</h3>
        <button className="button">SEE MORE</button>
      </div>
      {data?.body?.items?.map((track) => (
        <Track track={track} key={track.id}/>
      ))}
    </div>
  )
}

export default TopTracks