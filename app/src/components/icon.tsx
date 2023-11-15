import NextImage from "next/image";
import { User02Svg } from "~/icons";
import { cn, ipfsURL } from "~/lib/utils";
import { type Image } from "~/lib/validation/common";

export function Icon({
  name,
  className = "",
  image,
}: {
  name: string;
  image?: Image;
  className?: string;
  loading?: boolean;
}) {
  let url = "";

  if (image) {
    if ("ipfs_cid" in image) {
      url = ipfsURL(image.ipfs_cid ?? "");
    } else if ("img" in image) {
      url = image.img ?? "";
    }
  }

  return (
    <div
      className={cn(
        "relative h-24 w-24 overflow-hidden rounded-xl border border-gray-300",
        className
      )}
    >
      {url ? (
        <NextImage
          alt={name}
          src={url}
          className="h-full w-full object-contain"
          fill
          unoptimized
        />
      ) : (
        <User02Svg className="h-16 w-16 flex-shrink-0 rounded-lg" />
      )}
    </div>
  );
}
