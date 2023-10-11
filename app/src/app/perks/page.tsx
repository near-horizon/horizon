import { Hydrate, dehydrate } from "@tanstack/react-query";
import { getPerks } from "~/pages/api/perks";
import { Perks } from "./perks";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import { getQueryClient } from "../query-client";

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
