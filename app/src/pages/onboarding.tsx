import { Button } from "~/components/ui/button";
import Icon from "../../public/icon.svg";
import Link from "next/link";
import ArrowRight from "../components/icons/arrow-right.svg";
import Rocket from "../components/icons/rocket-02.svg";
import Users from "../components/icons/users-02.svg";
import LineChart from "../components/icons/line-chart-up-02.svg";
import { cn } from "~/lib/utils";
import { useEffect, useRef } from "react";

export default function Onoboarding() {
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-start gap-8 bg-background-light py-16">
      <div className="flex w-full flex-col items-center justify-start gap-5">
        <div className="relative w-full">
          <h1 className="flex flex-row items-center justify-center text-4xl font-bold text-text-black">
            <Icon className="w-11" /> Welcome to Horizon!
          </h1>
          <Button variant="destructive" className="absolute right-0 top-0 mr-4">
            <Link
              href="/"
              className="flex flex-row items-center justify-between"
            >
              Skip
              <ArrowRight className="w-4" />
            </Link>
          </Button>
        </div>
        <h2 className="max-w-xl text-center text-sm font-normal text-text-gray">
          Take the next steps towards a successful launch with a vibrant
          community of contributors, backers, and founders just like you!
        </h2>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <h3 className="text-lg font-bold text-text-black">Choose your path:</h3>
        <div className="flex w-full max-w-6xl flex-row flex-wrap items-stretch justify-center gap-7">
          {[
            {
              icon: <Rocket className="w-8" />,
              title: "Web3 Founder",
              bullets: [
                "Hire ecosystem experts",
                "Meet with fellow founders",
                "Join accelerator",
                "Get financial support",
                "Get investments",
              ],
              link: "/projects/create",
              linkText: "Create project profile",
              focus: true,
            },
            {
              icon: <Users className="w-8" />,
              title: "Contributor",
              bullets: [
                "Offer your services to projects",
                "Build customer base and reputation",
                "Earn and grow your business",
              ],
              link: "/contributors/create",
              linkText: "Create contributor profile",
            },
            {
              icon: <LineChart className="w-8" />,
              title: "Backer",
              bullets: [
                "Find promising projects on early stages",
                "Grow your portfolio",
                "Reduce risks and costs",
              ],
              link: "/backers/create",
              linkText: "Create backer profile",
            },
          ].map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-4">
        <h4 className="font-semibold text-ui-elements-black">
          Become a partner
        </h4>
        <p className="max-w-xl text-center text-sm font-normal text-text-gray">
          Take the next steps towards a successful launch with a vibrant
          community of contributors, backers, and founders just like you!{" "}
          <Link
            href="#"
            className="inline-flex flex-row items-center justify-between text-text-link"
          >
            Learn more <ArrowRight className="w-4" />
          </Link>
        </p>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  bullets,
  link,
  linkText,
  focus = false,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  link: string;
  linkText: string;
  focus?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      ref.current?.focus();
    }
  }, [ref, focus]);

  return (
    <div
      className={cn(
        "group flex w-full flex-col items-center justify-between gap-8 px-8 py-6 md:w-[calc((100%-1.75rem)/2)] lg:w-[calc((100%-1.75rem*2)/3)]",
        "rounded-xl border-ui-elements-light bg-background-white shadow shadow-ui-elements-light transition-all duration-500 hover:shadow-ui-elements-gray"
      )}
    >
      <div className="flex w-full flex-col items-center justify-start gap-3">
        {icon}
        <h4 className="text-lg font-bold text-text-black">{title}</h4>
        <ul className="flex list-disc flex-col items-start justify-start gap-1 text-sm font-normal text-ui-elements-black">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <Button
        variant="default"
        className={cn(
          "border border-ui-elements-light bg-white transition-all duration-500 group-hover:border-primary group-hover:bg-primary"
        )}
      >
        <input type="hidden" ref={ref} autoFocus={focus} />
        <Link href={link}>{linkText}</Link>
      </Button>
    </div>
  );
}
