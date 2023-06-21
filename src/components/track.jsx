import { milisToMinutesAndSeconds } from "@/utils";
import Image from "next/image";

export default function Track({ track }) {
  return (
    <div className="mb-6 items-center space-x-5 flex">
      {track?.album?.images?.[0].url && (
        <Image
          src={track?.album?.images?.[0].url}
          width={50}
          height={50}
          alt="photo album"
        ></Image>
      )}
      <div className="grid grid-cols-12 w-full">
        <div className="space-y-1 col-span-11">
          <p className="text-sm md:text-base text-white truncate">
            {track?.name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {track?.artists?.[0].name} - {track?.album?.name}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 text-right">
            {milisToMinutesAndSeconds(track?.duration_ms)}
          </p>
        </div>
      </div>
    </div>
  );
}
