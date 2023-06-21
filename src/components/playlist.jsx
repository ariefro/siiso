import Image from "next/image";

export default function Playlist({ playlist }) {
  return (
    <div className="space-y-5">
        {playlist?.images?.[0].url && (<Image src={playlist?.images?.[0].url} width={320} height={320} className="mx-auto" alt="photo album"></Image>)}
        <div className="space-y-1">
            <p className="text-center text-white text-xs sm:text-sm">{playlist.name}</p>
            <p className="text-center text-gray-400 text-[0.6rem] sm:text-xs font-light">{playlist.tracks.total} TRACK</p>
        </div>
    </div>
  )
}
