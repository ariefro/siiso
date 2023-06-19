import Image from "next/image"
import Link from "next/link"

function TopArtists({ data }) {
  return (
    <div className="md:w-1/2 md:mr-16 mb-20">
      <div className="flex items-center mb-10 justify-between">
        <h3 className="font-extrabold text-xl text-white md:mr-3">Top Artists</h3>
        <Link href="/artists">
          <button className="button">SEE MORE</button>
        </Link>
      </div>

      {data?.body?.items?.map((artist) => (
        <div key={artist?.id} className="mb-6 flex items-center space-x-5">
          {artist?.images?.[0].url && (<Image src={artist?.images?.[0].url} width={50} height={50} alt="photo album" className="rounded-full"></Image>)}
          <p className="text-sm md:text-base text-white">{artist?.name}</p>
        </div>
      ))}
    </div>
  )
}

export default TopArtists