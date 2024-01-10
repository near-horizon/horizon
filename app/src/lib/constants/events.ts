import { type Event } from "~/lib/validation/events";

export const OFFICE_HOURS_TIME = new Date(
  "2023-07-28T13:30:00.000Z",
).toLocaleString(undefined, {
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "shortGeneric",
});

export const EVENTS = [
  {
    title: "Product Demo Day",
    description:
      "Join if you are an entrepreneur, designer, engineer, or hacker working on something cool that you'd like to share with fellow builders.",
    icon: "./horizon-event-demo.svg",
  },
  {
    title: "Office hours",
    description:
      "As an early user of NEAR Horizon, we are excited to invite you to join our weekly Office Hours sessions with the Horizon team.",
    icon: "./horizon-event-office-hrs.svg",
  },
  {
    title: "AMA sessions",
    description:
      "Join to know more about our Service Providers and Horizon Partner and the various types of services they offer.",
    icon: "./horizon-event-ama.svg",
  },
] satisfies Event[];

export const SCHEDULE_LINK = "https://lu.ma/u/usr-5oZHY9dEDbDcaHY";
