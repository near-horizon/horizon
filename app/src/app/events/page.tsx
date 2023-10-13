"use client";

import Event from "./event";
import { ExternalLink } from "~/components/external-link";

import { useHorizonEvents } from "~/hooks/event";

const SCHEDULE_LINK = "https://lu.ma/u/usr-5oZHY9dEDbDcaHY";

export default function Events() {
  const { data: eventItems } = useHorizonEvents();

  const time = new Date("2023-07-28T13:00:00.000Z").toLocaleString(undefined, {
    weekday: "long",
    hour: "numeric",
    timeZoneName: "shortGeneric",
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">
          Horizon Events
        </h1>

        <ExternalLink
          href={SCHEDULE_LINK}
          className="text-md hover:bg-primary/90 rounded-full bg-primary px-6 py-2 font-semibold text-text-dark"
        >
          View schedule
        </ExternalLink>
      </div>
      <h2 className="text-center text-lg font-bold text-ui-elements-dark md:text-left">
        Join one of our sessions every {time}
      </h2>
      {eventItems.map((event) => (
        <Event event={event} key={event.title} />
      ))}
      <ExternalLink
        href={SCHEDULE_LINK}
        className="text-md hover:bg-primary/90 mx-auto rounded-full bg-primary px-6 py-2 font-semibold text-text-dark"
      >
        View schedule
      </ExternalLink>
    </div>
  );
}
