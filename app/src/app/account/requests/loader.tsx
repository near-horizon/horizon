import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getUserFromSession } from "~/lib/session";
import { removeEmpty } from "~/lib/utils";
import { List } from "./list";
import { getRequestsForProject } from "~/lib/server/projects";

export async function Loader() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["requests", user.accountId],
    queryFn: async () => {
      const r = await getRequestsForProject(user.accountId);
      return removeEmpty(r);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <List accountId={user.accountId} />
    </HydrationBoundary>
  );
}
