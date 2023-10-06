import Image from "next/image";
import { cn, ipfsURL } from "~/lib/utils";

export function IPFSImage({
  cid,
  alt,
  className,
}: {
  cid: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={ipfsURL(cid)}
        alt={alt ?? "image"}
        className="h-full w-full rounded-full object-cover"
        loader={({ src }) => src}
        fill
      />
    </div>
  );
}
