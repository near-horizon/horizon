import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Perks } from "./perks";
import { getUserFromSession } from "~/lib/session";
import { getPerks } from "~/lib/server/perks";

export default async function PerksPage() {
  const user = await getUserFromSession();
  let perks;

  if (!user) {
    perks = await getPerks("nearhorizon.near");
  } else {
    perks = await getPerks(user.accountId);
  }

  const queryClient = new QueryClient();

  queryClient.setQueryData(["perks"], perks);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Perks noButton={!user} />
    </HydrationBoundary>
  );
}
