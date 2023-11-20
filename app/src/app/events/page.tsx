import Event from "./event";
import { ExternalLink } from "~/components/external-link";

import {
  EVENTS,
  OFFICE_HOURS_TIME,
  SCHEDULE_LINK,
} from "~/lib/constants/events";

export default function Events() {
  const timeSplit = OFFICE_HOURS_TIME.split(" ");
  const dateTime = timeSplit.slice(0, 3).join(" ");
  const timeZone = timeSplit[3];

  return (
    <div className="flex flex-col gap-8 rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
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
        Join one of our sessions every {dateTime} ({timeZone})
      </h2>
      {EVENTS.map((event) => (
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
