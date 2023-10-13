import { Hydrate, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import getQueryClient from "~/app/query-client";
import { getUserFromSession } from "~/lib/session";
import { removeEmpty } from "~/lib/utils";
import { List } from "./list";
import { getProjectContracts } from "~/lib/server/projects";

export async function Loader() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["contracts", user.accountId],
    queryFn: async () => {
      const r = await getProjectContracts(user.accountId);
      return removeEmpty(r);
    },
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <List accountId={user.accountId} />
    </Hydrate>
  );
}
