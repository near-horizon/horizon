import { DashboardCard } from "./card";
import CheckSquareIcon from "~/components/icons/check-square.svg";
import SquareOutlineIcon from "~/components/icons/square.svg";
import { Badge } from "~/components/ui/badge";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { cn } from "~/lib/utils";
import { type Incentives } from "~/lib/validation/incentives";
import { HorizonProject } from "~/lib/validation/projects";

export default async function Dashboard() {
  const incentives = await viewCall<Incentives>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_incentive_data",
    {}
  );
  const horizonProfile = await viewCall<HorizonProject>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project",
    { account_id: "nearhorizon.near" }
  );

  const dashboardCards = [
    {
      title: "Profile progress",
      help: "This is your profile progress and actions you can still perform",
      description:
        "A thoroughly filled-out profile is a great way to build transparency and credibility so you can make the best impression on potential backers!",
      children: (
        <ul>
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
        <>
          Credits balance <Badge>{1}</Badge>
        </>
      ),
    },
  ];

  return (
    <div>
      <div></div>
      <div className="flex flex-row flex-wrap items-stretch justify-start gap-6">
        {dashboardCards.map((card, index) => (
          <div className="w-full md:w-[calc((100%-1.5rem)/2)]" key={index}>
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
