import { dehydrate, Hydrate } from "@tanstack/react-query";
import { Perks } from "./perks";
import { getUserFromSession } from "~/lib/session";
import getQueryClient from "../query-client";
import { getPerks } from "~/lib/server/perks";

export default async function PerksPage() {
  const user = await getUserFromSession();
  let perks;

  if (!user) {
    perks = await getPerks("nearhorizon.near");
  } else {
    perks = await getPerks(user.accountId);
  }

  const queryClient = getQueryClient();

  queryClient.setQueryData(["perks"], perks);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Perks noButton={!user} />
    </Hydrate>
  );
}
