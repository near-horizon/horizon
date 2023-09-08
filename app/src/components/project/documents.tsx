import { useProject } from "~/lib/projects";
import { type AccountId } from "~/lib/validation/common";

export function Documents({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  return (
    <div>
      <span>
        <b>Pitch deck:</b>
        {status === "loading" ? (
          <b className="block h-4 w-full animate-pulse bg-gray-200" />
        ) : (
          <a>{data?.deck}</a>
        )}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12.75L9 15.75M9 15.75L12 12.75M9 15.75V9M15 12.5571C15.9161 11.8005 16.5 10.656 16.5 9.375C16.5 7.09683 14.6532 5.25 12.375 5.25C12.2111 5.25 12.0578 5.1645 11.9746 5.0233C10.9965 3.36363 9.19082 2.25 7.125 2.25C4.0184 2.25 1.5 4.7684 1.5 7.875C1.5 9.42458 2.12659 10.8278 3.14021 11.8451"
            stroke="#7E868C"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        <b>Demo video:</b>
        {status === "loading" ? (
          <b className="block h-4 w-full animate-pulse bg-gray-200" />
        ) : (
          <a>{data?.demo}</a>
        )}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 6.75L15.75 2.25M15.75 2.25H11.25M15.75 2.25L9.75 8.25M7.5 3.75H5.85C4.58988 3.75 3.95982 3.75 3.47852 3.99524C3.05516 4.21095 2.71095 4.55516 2.49524 4.97852C2.25 5.45982 2.25 6.08988 2.25 7.35V12.15C2.25 13.4101 2.25 14.0402 2.49524 14.5215C2.71095 14.9448 3.05516 15.289 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75H10.65C11.9101 15.75 12.5402 15.75 13.0215 15.5048C13.4448 15.289 13.789 14.9448 14.0048 14.5215C14.25 14.0402 14.25 13.4101 14.25 12.15V10.5"
            stroke="#7E868C"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
