import { useProject } from "~/lib/projects";
import { type AccountId } from "~/lib/utils";
import { ProjectIcon } from "./project/icon";
import { Handle } from "./handle";
import { Description } from "./description";
import Link from "next/link";
import { useProjectRequests } from "~/lib/requests";

export function Project({
  accountId,
  loading = false,
}: {
  accountId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useProject(accountId);
  const { data: requests } = useProjectRequests(accountId);

  return (
    <div className="flex h-64 w-full flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow">
      <Link
        className="h-20"
        href={{
          pathname: "/projects/[accountId]",
          query: { accountId },
        }}
      >
        <h3 className="flex flex-row items-start justify-start gap-4">
          <div className="flex-shrink-0">
            <ProjectIcon
              accountId={accountId}
              loading={loading}
              className="h-16 w-16"
            />
          </div>
          <div>
            <Handle accountId={accountId} loading={loading} />
          </div>
        </h3>
      </Link>
      <div className="truncate font-medium">{data?.tagline}</div>
      <div className="h-[4.5rem]">
        <Description
          text={data?.description ?? ""}
          loading={loading || status === "loading"}
        />
      </div>
      <Link
        className="flex h-5 flex-row items-center justify-start gap-3 text-gray-400"
        href={{
          pathname: "/projects/[accountId]",
          query: { accountId, tab: "requests" },
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.35189 2.32344C6.87836 2.32344 6.42422 2.52665 6.08939 2.88837C5.75455 3.25009 5.56644 3.74068 5.56644 4.25223V7.81306C5.56644 7.93111 5.52303 8.04432 5.44576 8.12779C5.36849 8.21127 5.26369 8.25816 5.15441 8.25816H1.85819C1.38466 8.25816 0.930524 8.46137 0.595687 8.82309C0.26085 9.1848 0.0727406 9.6754 0.0727406 10.1869V13.7478C0.0727406 14.0011 0.118923 14.2519 0.20865 14.4859C0.298377 14.7199 0.429893 14.9325 0.595687 15.1116C0.761482 15.2907 0.958309 15.4328 1.17493 15.5297C1.39155 15.6267 1.62372 15.6766 1.85819 15.6766H10.6481C10.8826 15.6766 11.1148 15.6267 11.3314 15.5297C11.548 15.4328 11.7448 15.2907 11.9106 15.1116C12.0764 14.9325 12.2079 14.7199 12.2977 14.4859C12.3874 14.2519 12.4336 14.0011 12.4336 13.7478V10.1869C12.4336 10.0689 12.477 9.95568 12.5542 9.87221C12.6315 9.78873 12.7363 9.74184 12.8456 9.74184H16.1418C16.6153 9.74184 17.0695 9.53863 17.4043 9.17691C17.7391 8.81519 17.9273 8.3246 17.9273 7.81306V4.25223C17.9273 3.74068 17.7391 3.25009 17.4043 2.88837C17.0695 2.52665 16.6153 2.32344 16.1418 2.32344H7.35189ZM16.1418 8.25816H12.4336V3.80712H16.1418C16.2511 3.80712 16.3559 3.85402 16.4332 3.93749C16.5104 4.02096 16.5538 4.13418 16.5538 4.25223V7.81306C16.5538 7.93111 16.5104 8.04432 16.4332 8.12779C16.3559 8.21127 16.2511 8.25816 16.1418 8.25816ZM11.0601 8.25816H6.93986V4.25223C6.93986 4.13418 6.98327 4.02096 7.06054 3.93749C7.13781 3.85402 7.24261 3.80712 7.35189 3.80712H11.0601V8.25816ZM5.56644 9.74184V14.1929H1.85819C1.74892 14.1929 1.64412 14.146 1.56684 14.0625C1.48957 13.979 1.44616 13.8658 1.44616 13.7478V10.1869C1.44616 10.0689 1.48957 9.95568 1.56684 9.87221C1.64412 9.78873 1.74892 9.74184 1.85819 9.74184H5.56644ZM6.93986 9.74184H11.0601V13.7478C11.0601 13.8658 11.0167 13.979 10.9395 14.0625C10.8622 14.146 10.7574 14.1929 10.6481 14.1929H6.93986V9.74184Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.03624 2.83822C6.38428 2.46224 6.85742 2.25 7.35189 2.25H16.1418C16.6363 2.25 17.1094 2.46224 17.4575 2.83822C17.8053 3.21403 18 3.72274 18 4.25223V7.81306C18 8.34254 17.8053 8.85125 17.4575 9.22706C17.1094 9.60304 16.6363 9.81528 16.1418 9.81528H12.8456C12.7573 9.81528 12.6715 9.85314 12.6074 9.92235C12.5432 9.99173 12.5063 10.0868 12.5063 10.1869V13.7478C12.5063 14.01 12.4585 14.2699 12.3655 14.5124C12.2725 14.755 12.1361 14.9757 11.9638 15.1618C11.7915 15.3479 11.5866 15.4958 11.3608 15.5969C11.135 15.6979 10.8928 15.75 10.6481 15.75H1.85819C1.61346 15.75 1.37126 15.6979 1.14546 15.5969C0.91967 15.4958 0.714847 15.3479 0.542544 15.1618C0.37025 14.9757 0.233818 14.755 0.140815 14.5124C0.0478145 14.2699 0 14.01 0 13.7478V10.1869C0 9.65746 0.194659 9.14875 0.542544 8.77294C0.890584 8.39696 1.36372 8.18472 1.85819 8.18472H5.15441C5.24275 8.18472 5.32855 8.14685 5.39261 8.07764C5.45684 8.00827 5.4937 7.91317 5.4937 7.81306V4.25223C5.4937 3.72274 5.68836 3.21403 6.03624 2.83822ZM7.35189 2.39688C6.8993 2.39688 6.46416 2.59106 6.14253 2.93852C5.82074 3.28614 5.63918 3.75862 5.63918 4.25223V7.81306C5.63918 7.94904 5.58922 8.08037 5.4989 8.17794C5.40843 8.27568 5.28463 8.3316 5.15441 8.3316H1.85819C1.4056 8.3316 0.970465 8.52578 0.648831 8.87324C0.327041 9.22086 0.145481 9.69333 0.145481 10.1869V13.7478C0.145481 13.9921 0.190031 14.2339 0.276485 14.4594C0.362937 14.6848 0.489535 14.8894 0.648831 15.0615C0.808117 15.2336 0.996948 15.3698 1.2044 15.4626C1.41184 15.5554 1.63399 15.6031 1.85819 15.6031H10.6481C10.8723 15.6031 11.0945 15.5554 11.3019 15.4626C11.5094 15.3698 11.6982 15.2336 11.8575 15.0615C12.0168 14.8894 12.1434 14.6848 12.2298 14.4594C12.3163 14.2339 12.3608 13.9921 12.3608 13.7478V10.1869C12.3608 10.051 12.4108 9.91963 12.5011 9.82206C12.5916 9.72432 12.7154 9.6684 12.8456 9.6684H16.1418C16.5944 9.6684 17.0295 9.47422 17.3512 9.12676C17.673 8.77914 17.8545 8.30667 17.8545 7.81306V4.25223C17.8545 3.75862 17.673 3.28614 17.3512 2.93852C17.0295 2.59106 16.5944 2.39688 16.1418 2.39688H7.35189ZM7.35189 3.88056C7.26355 3.88056 7.17775 3.91843 7.11369 3.98764C7.04946 4.05702 7.0126 4.15211 7.0126 4.25223V8.18472H10.9874V3.88056H7.35189ZM7.0074 3.88734C7.09787 3.78961 7.22167 3.73368 7.35189 3.73368H11.1329V8.3316H6.86712V4.25223C6.86712 4.11624 6.91708 3.98491 7.0074 3.88734ZM12.3608 3.73368H16.1418C16.272 3.73368 16.3958 3.78961 16.4863 3.88734C16.5766 3.98491 16.6266 4.11624 16.6266 4.25223V7.81306C16.6266 7.94904 16.5766 8.08037 16.4863 8.17794C16.3958 8.27568 16.272 8.3316 16.1418 8.3316H12.3608V3.73368ZM12.5063 3.88056V8.18472H16.1418C16.2301 8.18472 16.3159 8.14685 16.38 8.07764C16.4442 8.00827 16.4811 7.91317 16.4811 7.81306V4.25223C16.4811 4.15211 16.4442 4.05702 16.38 3.98764C16.3159 3.91843 16.2301 3.88056 16.1418 3.88056H12.5063ZM1.85819 9.81528C1.76986 9.81528 1.68406 9.85314 1.61999 9.92235C1.55577 9.99173 1.51891 10.0868 1.51891 10.1869V13.7478C1.51891 13.8479 1.55577 13.943 1.61999 14.0124C1.68406 14.0816 1.76986 14.1194 1.85819 14.1194H5.4937V9.81528H1.85819ZM1.5137 9.82206C1.60417 9.72432 1.72798 9.6684 1.85819 9.6684H5.63918V14.2663H1.85819C1.72798 14.2663 1.60417 14.2104 1.5137 14.1127C1.42338 14.0151 1.37342 13.8838 1.37342 13.7478V10.1869C1.37342 10.051 1.42338 9.91963 1.5137 9.82206ZM6.86712 9.6684H11.1329V13.7478C11.1329 13.8838 11.0829 14.0151 10.9926 14.1127C10.9021 14.2104 10.7783 14.2663 10.6481 14.2663H6.86712V9.6684ZM7.0126 9.81528V14.1194H10.6481C10.7364 14.1194 10.8222 14.0816 10.8863 14.0124C10.9505 13.943 10.9874 13.8479 10.9874 13.7478V9.81528H7.0126Z"
            fill="currentColor"
          />
        </svg>
        <span>
          {requests?.length ?? 0}{" "}
          {requests?.length === 1 ? "request" : "requests"}
        </span>
      </Link>
    </div>
  );
}
