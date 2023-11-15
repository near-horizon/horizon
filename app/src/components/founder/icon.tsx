import clsx from "clsx";
import { type z } from "zod";
import { useProfile } from "~/hooks/fetching";
import { getImageURL } from "~/lib/client/fetching";
import { type accountIdSchema } from "~/lib/validation/common";

export function FounderIcon({
  accountId,
  size = "small",
  loading = false,
}: {
  accountId: z.infer<typeof accountIdSchema>;
  size?: "small" | "large";
  loading?: boolean;
}) {
  const { data, status } = useProfile(accountId, !loading);

  let image = "";

  if (data?.image) {
    if ("ipfs_cid" in data?.image) {
      image = getImageURL(data?.image?.ipfs_cid ?? "");
    } else if ("img" in data?.image) {
      image = data?.image?.img ?? "";
    }
  }

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-full",
        size === "small" ? "h-16 w-16" : "h-24 w-24"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={data?.name}
        src={
          loading || status === "loading"
            ? "https://img.icons8.com/?size=512&id=Dajn8muCcSHe&format=png"
            : image ||
              "https://img.icons8.com/?size=512&id=Dajn8muCcSHe&format=png"
        }
        className={clsx("h-full w-full object-contain", {
          "animate-pulse": status === "loading",
        })}
      />
    </div>
  );
}
