import { redirect } from "next/navigation";
import { hasBacker } from "~/lib/client/backers";
import { getUserFromSession } from "~/lib/session";
import { BackersCreate } from "./create";

export default async function BackersCreatePage() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  if (await hasBacker(user.accountId)) {
    return redirect("/account");
  }

  return <BackersCreate accountId={user.accountId} />;
}
