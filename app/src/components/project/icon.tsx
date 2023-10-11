"use client";

import clsx from "clsx";
import { useProfile } from "~/hooks/fetching";
import { getImageURL } from "~/lib/fetching";
import { cn } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";

export function ProjectIcon({
  accountId,
  className = "",
  loading = false,
}: {
  accountId: AccountId;
  className?: string;
  loading?: boolean;
}) {
  const { data, status } = useProfile(accountId);

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
      className={cn(
        "h-24 w-24 overflow-hidden rounded-xl border border-gray-300",
        className
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
