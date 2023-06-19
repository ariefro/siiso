import { milisToMinutesAndSeconds } from "@/utils";
import Image from "next/image";

export default function Track({ track }) {
  console.log("====", track)
  return (
    <div className="mb-6 flex items-center space-x-5">
        {track?.album?.images?.[0].url && (<Image src={track?.album?.images?.[0].url} width={50} height={50} alt="photo album" className=""></Image>)}
        <div className="w-full">
          <div className="flex items-end justify-between">
            <p className="text-sm md:text-base md:w-24 lg:w-full text-white truncate">{track?.name}</p>
            <p className="text-xs md:text-sm text-gray-400">{milisToMinutesAndSeconds(track?.duration_ms)}</p>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-xs w-11/12 md:text-sm text-gray-400 truncate md:w-36">{track?.artists?.[0].name} - {track?.album?.name}</p>
          </div>
        </div>
    </div>
  )
}
