import Link from "next/link";
import { useStats } from "~/lib/fetching";

export function MainStats() {
  const { data } = useStats();

  return (
    <div className="flex flex-row items-center justify-end gap-3">
      <Stat count={data?.projects ?? 0} label="Projects" href="/projects" />
      <Stat count={data?.requests ?? 0} label="Requests" href="/requests" />
      <Stat
        count={data?.contributors ?? 0}
        label="Contributors"
        href="/contributors"
      />
      <Stat count={data?.backers ?? 0} label="Backers" href="/backers" />
    </div>
  );
}

function Stat({
  count,
  label,
  href,
}: {
  count: number;
  label: string;
  href: string;
}) {
  return (
    <div className="flex w-[6.5rem] flex-col gap-2">
      <div className="text-xl font-bold">{count}</div>
      <Link className="text-blue-300" href={href}>
        {label}
      </Link>
    </div>
  );
}
