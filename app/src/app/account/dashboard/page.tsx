import Link from "next/link";
import { DashboardCard } from "./card";
import {
  CheckSquareSvg,
  CoinsStacked03Svg,
  Inbox01Svg,
  PlusSvg,
  SquareSvg,
} from "~/icons";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  creditTxToAmount,
  creditTxToText,
  getCreditHistory,
} from "~/lib/client/credits";
import { ExternalLink } from "~/components/external-link";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import {
  getProject,
  getProjectContracts,
  getRequestsForProject,
} from "~/lib/server/projects";
import { getIncentives } from "~/lib/client/incentives";
import { DATE } from "~/lib/format";
import { Header } from "./header";
import { WelcomeBanner } from "../welcome-banner";

export default async function Dashboard() {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return redirect("/login");
  }

  if (!user.hasProfile) {
    return redirect("/onboarding");
  }

  const [incentives, profile, creditHistory, requests, contracts] =
    await Promise.all([
      getIncentives(),
      getProject(user.accountId),
      getCreditHistory(user.accountId),
      getRequestsForProject(user.accountId),
      getProjectContracts(user.accountId),
    ]);

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
            {profile.credit_balance} NHZN
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
                  <small>{DATE.date(tx.timestamp)}</small>
                  <div className="flex flex-row items-center justify-between">
                    <span>{creditTxToText(tx)}</span>
                    <span
                      className={cn(
                        (tx.args.amount as number) > 0
                          ? "text-primary"
                          : "text-destructive",
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
              <CoinsStacked03Svg className="h-5 w-5" />
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
          <Inbox01Svg className="h-6 w-6 text-ui-elements-gray" />
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
              <PlusSvg className="h-5 w-5" />
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
    <div className="flex flex-col items-start justify-start gap-6">
      <WelcomeBanner />

      <Header accountId={user.accountId} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {dashboardCards.map((card, index) => (
          <div key={index}>
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
          <CheckSquareSvg className="h-5 w-5 text-primary" />
        ) : (
          <SquareSvg className="h-5 w-5 text-ui-elements-gray" />
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
