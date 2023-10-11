import { useProjectRequests } from "~/hooks/requests";
import { type AccountId } from "~/lib/validation/common";
import { Request } from "../request";

export function Requests({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProjectRequests(accountId);

  return (
    <div className="flex max-w-[100dvw] flex-col gap-4 overflow-hidden">
      <h4 className="text-xl font-bold">Requests</h4>
      <div className="flex w-full max-w-full flex-row items-center justify-start gap-8 overflow-x-scroll">
        {status === "loading" ? (
          <>
            <Request accountId={accountId} cid="" loading />
            <Request accountId={accountId} cid="" loading />
            <Request accountId={accountId} cid="" loading />
            <Request accountId={accountId} cid="" loading />
          </>
        ) : !!data?.length ? (
          data.map(([, cid]) => (
            <div
              key={cid}
              className="w-full md:w-[calc((100%-1rem)*.5)] xl:w-[calc((100%-2rem)*.33)] 2xl:w-[calc((100%-4rem)*.25)] md:[&:nth-child(n+7)]:hidden 2xl:[&:nth-child(n+7)]:block"
            >
              <Request accountId={accountId} cid={cid} />
            </div>
          ))
        ) : (
          <div className="flex h-52 w-full flex-col items-center justify-center rounded-xl border-2 border-gray-400 bg-gray-200 text-gray-500">
            <svg
              width="54"
              height="41"
              viewBox="0 0 54 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.7895 15.4143C52.4382 14.9241 51.9761 14.5251 51.4412 14.2503C50.9064 13.9754 50.3142 13.8324 49.7137 13.8333H45.928V10.0238C45.928 9.01346 45.5292 8.04449 44.8192 7.33007C44.1093 6.61565 43.1464 6.21429 42.1423 6.21429H25.7386L19.1775 1.2619C18.5211 0.769482 17.7249 0.502381 16.9061 0.5H4.28567C3.28165 0.5 2.31875 0.901359 1.6088 1.61578C0.898846 2.33021 0.5 3.29918 0.5 4.30952V38.5952C0.5 39.1004 0.699423 39.5849 1.0544 39.9421C1.40937 40.2993 1.89082 40.5 2.39283 40.5H44.7687C45.1659 40.5 45.5532 40.3743 45.8755 40.1405C46.1978 39.9068 46.4388 39.5769 46.5645 39.1976L53.3053 18.8476C53.4949 18.275 53.547 17.6654 53.4573 17.0686C53.3677 16.4718 53.1388 15.9049 52.7895 15.4143ZM16.9061 4.30952L23.4672 9.26191C24.1234 9.75463 24.9198 10.0218 25.7386 10.0238H42.1423V13.8333H11.3294C10.5348 13.8333 9.76034 14.0848 9.11573 14.5523C8.47111 15.0198 7.98901 15.6795 7.73772 16.4381L4.28567 26.8571V4.30952H16.9061Z"
                fill="currentColor"
              />
            </svg>
            <b>Oops, nothing here</b>
            <span>
              It looks like this project hasn&apos;t created any requests yet
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
