import {
  type AccountId,
  formatDate,
  formatBudget,
  type CID,
} from "~/lib/utils";
import { ProjectIcon } from "./project/icon";
import { Handle } from "./handle";
import Link from "next/link";
import { useRequest } from "~/lib/requests";
import { Title } from "./title";
import { Tags } from "./tags";
import { Availability } from "./availability";

export function Request({
  accountId,
  cid,
  loading = false,
}: {
  accountId: AccountId;
  cid: CID;
  loading?: boolean;
}) {
  const { data, status } = useRequest(
    accountId,
    cid,
    (!!accountId && !!cid) || !loading
  );

  return (
    <div className="relative flex h-[14.5rem] w-full flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow">
      <Link
        className="h-16"
        href={{
          pathname: "/projects/[accountId]",
          query: { accountId },
        }}
      >
        <h3 className="flex flex-row items-start justify-start gap-4">
          <ProjectIcon accountId={accountId} className="h-16 w-16" />
          <Handle accountId={accountId} />
        </h3>
      </Link>
      <Link
        className="h-6"
        href={{
          pathname: "/requests/[accountId]/[cid]",
          query: { accountId, cid },
        }}
      >
        <Title
          text={data?.title ?? ""}
          loading={loading || status === "loading"}
        />
      </Link>
      <div className="h-4">
        <Availability
          available={data?.open}
          availableText="Open to proposals"
          unavailableText="Closed"
        />
      </div>
      <div className="h-7">
        <Tags
          tags={data?.tags ?? {}}
          loading={loading || status === "loading"}
        />
      </div>
      <div className="flex h-5 flex-row items-center justify-start gap-4">
        <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 15.75L3 3M3 9.75H8.55C8.97004 9.75 9.18006 9.75 9.34049 9.66825C9.48161 9.59635 9.59635 9.48161 9.66825 9.34049C9.75 9.18006 9.75 8.97004 9.75 8.55V3.45C9.75 3.02996 9.75 2.81994 9.66825 2.65951C9.59635 2.51839 9.48161 2.40365 9.34049 2.33175C9.18006 2.25 8.97004 2.25 8.55 2.25H4.2C3.77996 2.25 3.56994 2.25 3.40951 2.33175C3.26839 2.40365 3.15365 2.51839 3.08175 2.65951C3 2.81994 3 3.02996 3 3.45V9.75ZM9.75 3.75H14.55C14.97 3.75 15.1801 3.75 15.3405 3.83175C15.4816 3.90365 15.5963 4.01839 15.6683 4.15951C15.75 4.31994 15.75 4.52996 15.75 4.95V10.05C15.75 10.47 15.75 10.6801 15.6683 10.8405C15.5963 10.9816 15.4816 11.0963 15.3405 11.1683C15.1801 11.25 14.97 11.25 14.55 11.25H10.95C10.53 11.25 10.3199 11.25 10.1595 11.1683C10.0184 11.0963 9.90365 10.9816 9.83175 10.8405C9.75 10.6801 9.75 10.47 9.75 10.05V3.75Z"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {data?.deadline ? formatDate(Number(data.deadline)) : ""}
        </div>
        <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 8.25V11.25M13.5 6.75V9.75M12.75 3C14.5865 3 15.5799 3.28107 16.0741 3.49908C16.1399 3.52812 16.1728 3.54263 16.2678 3.63328C16.3247 3.68761 16.4287 3.84705 16.4554 3.92107C16.5 4.04455 16.5 4.11205 16.5 4.24706V12.3084C16.5 12.9899 16.5 13.3307 16.3978 13.5059C16.2938 13.6841 16.1936 13.7669 15.999 13.8354C15.8076 13.9027 15.4215 13.8285 14.6491 13.6801C14.1085 13.5762 13.4674 13.5 12.75 13.5C10.5 13.5 8.25 15 5.25 15C3.41347 15 2.42015 14.7189 1.92591 14.5009C1.86009 14.4719 1.82718 14.4574 1.7322 14.3667C1.67526 14.3124 1.57134 14.153 1.5446 14.0789C1.5 13.9554 1.5 13.8879 1.5 13.7529L1.5 5.69164C1.5 5.01006 1.5 4.66928 1.60221 4.49411C1.70618 4.31592 1.80644 4.23309 2.00104 4.16461C2.19235 4.09729 2.57853 4.17149 3.35087 4.31989C3.89146 4.42376 4.53261 4.5 5.25 4.5C7.5 4.5 9.75 3 12.75 3ZM10.875 9C10.875 10.0355 10.0355 10.875 9 10.875C7.96447 10.875 7.125 10.0355 7.125 9C7.125 7.96447 7.96447 7.125 9 7.125C10.0355 7.125 10.875 7.96447 10.875 9Z"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {data?.budget ? formatBudget(data.budget) : ""}
        </div>
        <div className="flex flex-row items-center justify-start gap-2 text-sm text-gray-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 1.70215V4.80005C10.5 5.22009 10.5 5.43011 10.5817 5.59055C10.6537 5.73167 10.7684 5.8464 10.9095 5.91831C11.0699 6.00005 11.28 6.00005 11.7 6.00005H14.7979M12 9.75H6M12 12.75H6M7.5 6.75H6M10.5 1.5H6.6C5.33988 1.5 4.70982 1.5 4.22852 1.74524C3.80516 1.96095 3.46095 2.30516 3.24524 2.72852C3 3.20982 3 3.83988 3 5.1V12.9C3 14.1601 3 14.7902 3.24524 15.2715C3.46095 15.6948 3.80516 16.039 4.22852 16.2548C4.70982 16.5 5.33988 16.5 6.6 16.5H11.4C12.6601 16.5 13.2902 16.5 13.7715 16.2548C14.1948 16.039 14.539 15.6948 14.7548 15.2715C15 14.7902 15 14.1601 15 12.9V6L10.5 1.5Z"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {data?.request_type}
        </div>
      </div>
    </div>
  );
}
