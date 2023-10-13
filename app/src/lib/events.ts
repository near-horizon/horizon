import { z } from "zod";

import { type Event, eventSchema } from "./validation/events";

export async function getHorizonEvents(): Promise<Event[]> {
  const response = await fetch(`/api/events`);

  const horizonEvents = z.array(eventSchema).parseAsync(await response.json());

  return horizonEvents;
}
