import { Hydrate, dehydrate } from "@tanstack/react-query";
import { Perks } from "./perks";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import getQueryClient from "../query-client";
import { getPerks } from "~/lib/server/perks";

export default async function PerksPage() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/");
  }

  const queryClient = getQueryClient();

  const perks = await getPerks(user.accountId);

  queryClient.setQueryData(["perks"], perks);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Perks />
    </Hydrate>
  );
}
