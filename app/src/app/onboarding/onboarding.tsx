import { IconSvg, LineChartUp02Svg, Rocket02Svg, Users02Svg } from "~/icons";
import { Card } from "./card";

export function Onoboarding() {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-start gap-8 bg-background-light py-16">
      <div className="flex w-full flex-col items-center justify-start gap-5">
        <div className="relative w-full">
          <h1 className="flex flex-row items-center justify-center text-4xl font-bold text-text-black">
            <IconSvg className="w-11" /> Welcome to Horizon!
          </h1>
        </div>
        <h2 className="max-w-xl text-center text-sm font-normal text-text-gray">
          Take the next steps towards a successful launch with a vibrant
          community of contributors, backers, and founders just like you!
        </h2>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <h3 className="text-lg font-bold text-text-black">Choose your path:</h3>
        <div className="w-full max-w-6xl grid-cols-1 justify-center gap-7 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Rocket02Svg className="w-8" />,
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
              icon: <Users02Svg className="w-8" />,
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
              icon: <LineChartUp02Svg className="w-8" />,
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
    </div>
  );
}
