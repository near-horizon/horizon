import Link from "next/link";
import { DashboardCard } from "./card";
import CheckSquareIcon from "~/components/icons/check-square.svg";
import SquareOutlineIcon from "~/components/icons/square.svg";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { cn, formatDate } from "~/lib/utils";
import { type Incentives } from "~/lib/validation/incentives";
import { type HorizonProject } from "~/lib/validation/projects";
import CoinsIcon from "~/components/icons/coins-stacked-03.svg";
import {
  creditTxToAmount,
  creditTxToText,
  getCreditHistory,
} from "~/lib/credits";
import { ExternalLink } from "~/components/external-link";
import InboxIcon from "~/components/icons/inbox-01.svg";
import PlusIcon from "~/components/icons/plus.svg";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import {
  getProjectContracts,
  getRequestsForProject,
} from "~/lib/server/projects";

export default async function Dashboard() {
  const user = await getUserFromSession();
  console.log(user);

  if (!user) {
    return redirect("/login");
  }

  const incentives = await viewCall<Incentives>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_incentive_data",
    {}
  );
  const horizonProfile = await viewCall<HorizonProject>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project",
    { account_id: user.accountId }
  );
  const creditHistory = await getCreditHistory(user.accountId);
  const requests = await getRequestsForProject(user.accountId);
  const contracts = await getProjectContracts(user.accountId);

  const dashboardCards = [
    {
      title: "Profile progress",
      help: "This is your profile progress and actions you can still perform",
      description:
        "A thoroughly filled-out profile is a great way to build transparency and credibility so you can make the best impression on potential backers!",
      children: (
        <ul className="pt-2">
          {Object.entries(incentives).map(([key, [, value]], index) => (
            <CompletionItem
              key={key}
              text={key}
              completed={index < 2}
              reward={value}
            />
          ))}
        </ul>
      ),
    },
    {
      title: (
        <span className="flex flex-row items-center justify-start gap-3">
          Credits balance
          <Badge className="bg-secondary-pressed text-ui-elements-white">
            {horizonProfile.credit_balance} NHZN
          </Badge>
        </span>
      ),
      help: "This is your current balance of credits",
      children: (
        <div className="flex h-full flex-col items-center justify-between">
          <ul className="flex max-h-48 w-full flex-grow flex-col items-start justify-start gap-2 overflow-y-auto">
            {creditHistory.map((tx) => (
              <li className="flex w-full flex-col" key={tx.hash}>
                <ExternalLink
                  href={`https://nearblocks.io/txns/${tx.hash}`}
                  className="flex w-full flex-col text-text-dark"
                >
                  <small>
                    {formatDate(Number(String(tx.timestamp).substring(0, 13)))}
                  </small>
                  <div className="flex flex-row items-center justify-between">
                    <span>{creditTxToText(tx)}</span>
                    <span
                      className={cn(
                        (tx.args.amount as number) > 0
                          ? "text-primary"
                          : "text-destructive"
                      )}
                    >
                      {creditTxToAmount(tx)} NHZN
                    </span>
                  </div>
                </ExternalLink>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="flex items-center justify-center"
          >
            <Link
              href="/account/credits/how"
              className="flex h-full w-full flex-row items-center justify-between gap-2"
            >
              <CoinsIcon className="h-5 w-5" />
              How credits work?
            </Link>
          </Button>
        </div>
      ),
    },
    {
      title: "Inbox",
      help: "This is your inbox with messages from contributors",
      children: (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <InboxIcon className="h-6 w-6 text-ui-elements-gray" />
          <b>You don&apos;t have any updates yet</b>
          <p className="text-center">
            You will be notified about meaningful activities like new proposals
            or updates on your applications
          </p>
        </div>
      ),
    },
    {
      title: "Your requests",
      help: "This is your list of requests",
      children: requests.length ? (
        <></>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <b>You don&apos;t have any requests yet</b>
          <p className="text-center">
            Requests are a way to express your project&apos;s needs and find an
            expert to help you
          </p>
          <Button
            variant="default"
            className="flex items-center justify-center"
          >
            <Link
              href="/requests/create"
              className="flex h-full w-full flex-row items-center justify-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Create a request
            </Link>
          </Button>
        </div>
      ),
    },
    {
      title: "Your contracts",
      help: "This is your list of contracts",
      children: contracts.length ? (
        <></>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <b>You don&apos;t have any contracts yet</b>
          <p className="text-center">
            Contracts are the way to track ongoing work agreements with
            contractors that you hired
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div></div>
      <div className="flex flex-row flex-wrap items-stretch justify-start gap-6">
        {dashboardCards.map((card, index) => (
          <div className="w-full lg:w-[calc((100%-1.5rem)/2)]" key={index}>
            <DashboardCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CompletionItem({
  text,
  completed,
  reward,
}: {
  text: string;
  completed: boolean;
  reward: number;
}) {
  return (
    <li className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-start gap-2">
        {completed ? (
          <CheckSquareIcon className="h-5 w-5 text-primary" />
        ) : (
          <SquareOutlineIcon className="h-5 w-5 text-ui-elements-gray" />
        )}
        <span
          className={cn("text-text-link", {
            "text-ui-elements-gray line-through": completed,
          })}
        >
          {text}
        </span>
      </div>
      <span
        className={cn("text-primary", {
          "text-ui-elements-gray line-through": completed,
        })}
      >
        +{reward} NHZN
      </span>
    </li>
  );
}
