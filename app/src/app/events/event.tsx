import Image from "next/image";
import type { Event } from "~/lib/validation/events";

export default function Event({ event }: { event: Event }) {
  return (
    <div className="flex flex-col items-start gap-6 md:flex-row">
      <div className="relative max-h-36 min-h-[9rem] w-full min-w-[50%] flex-1 flex-grow-0 overflow-hidden rounded-md md:min-h-[12rem] md:max-w-[50%] lg:min-h-[16rem]">
        <Image
          src={event.icon}
          alt={event.title}
          objectFit="contain"
          fill
          loader={({ src }) => src}
        />
      </div>

      <div className="flex-grow text-center md:text-left">
        <h3 className="mb-2 text-lg font-bold text-ui-elements-dark">
          {event.title}
        </h3>
        <div className="text-base font-normal">{event.description}</div>
      </div>
    </div>
  );
}
