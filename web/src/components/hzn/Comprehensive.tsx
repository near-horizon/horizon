import { Learning } from "./svgs/learning.js";
import { Expert } from "./svgs/expert.js";
import { Networking } from "./svgs/networking.js";
import { Access } from "./svgs/access.js";
import { Earn } from "./svgs/earn.js";
import { Product } from "./svgs/product.js";
import { Marketplace } from "./svgs/marketplace.js";
import { Curated } from "./svgs/curated.js";

const benefits = [
  {
    icon: <Learning className="w-8 h-8" />,
    heading: "Cohort-based Learning",
    text: "Benefit from peer-to-peer learning, collaboration, and support, all facilitated by NEAR's experienced community managers.",
  },
  {
    icon: <Expert className="w-8 h-8" />,
    heading: "Expert-led Sessions",
    text: "We offer exclusive masterclasses with industry leaders like Illia Polosukhin (NEAR), Paul Hsu (Decasonic), Richard Muirhead (Fabric Ventures), and Michael Kelly (Open Forest Protocol)",
  },
  {
    icon: <Networking className="w-8 h-8" />,
    heading: "Networking Opportunities",
    text: "Join exclusive in-person founder retreats, attend local meetups, and participate in virtual co-working days for a blend of online and IRL engagement.",
  },
  {
    icon: <Access className="w-8 h-8" />,
    heading: "Access Exclusive Perks",
    text: "Claim valuable offers from our 20+ vendor partners, including discounts, credits, and free trials tailored to Web3 startups.",
  },
  {
    icon: <Earn className="w-8 h-8" />,
    heading: "Earn Horizon Credits",
    text: "Earn Horizon Credits by contributing to the community and participating in events and exchange them for essential services, resources, and access to premier industry experts.",
  },
  {
    icon: <Product className="w-8 h-8" />,
    heading: "Product Audits from UX Experts",
    text: "These audits will assess the quality of your user research, product design, and provide valuable recommendations to enhance your user journey.",
  },
  {
    icon: <Marketplace className="w-8 h-8" />,
    heading: "Access to a Vetted Marketplace",
    text: "This marketplace facilitates reliable access to key services — from legal counsel and marketing specialists to UX and technology consultants",
  },
  {
    icon: <Curated className="w-8 h-8" />,
    heading: "Curated Learning Resources",
    text: "Quickly find the resources you and your team need to level up on areas critical to growth and success",
  },
];

export function Comprehensive() {
  return (
    <div className="flex flex-col items-center gap-7 w-full">
      <h2 className="text-ui-elements-dark text-center text-4xl font-bold">
        Program Benefits and Perks
      </h2>
      <p className="text-background-dark text-center text-xl">
        HZN is an exclusive learning community for founders that addresses the
        unique challenges and opportunities within the web3 space. What we're
        offering is more than just another program; it's a roadmap tailored for
        Web3 founders.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
        {benefits.map(({ icon, heading, text }) => (
          <div className="bg-ui-elements-white rounded-3xl p-6 flex flex-col gap-4 text-[#66a0ff] items-center">
            {icon}
            <div className="flex flex-col items-center gap-2 w-full text-ui-elements-dark">
              <h3 className="text-center text-xl font-bold">{heading}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
        <div className="flex py-5 px-6 flex-col items-center justify-center gap-3 self-stretch rounded-3xl border-dashed border-2 border-ui-elements-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M12 5.96777V19.9678M5 12.9678H19"
              stroke="#98A2B3"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span className="text-center font-medium text-lg">
            Even more benefits are coming
          </span>
        </div>
      </div>
    </div>
  );
}
