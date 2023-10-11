import { NextResponse } from "next/server";

import { GrowthProgram } from "~/lib/validation/growth-programs";

export const programItems = [
  {
    name: "Encode Club",
    imageSvg: true,
    imageSrc: "/encodeclub.svg",
    subHeader: "Hackathon, Accelerator",
    open: true,
    tagLine:
      "Encode Club is a web3 education community. We help ambitious, talented people achieve their personal and professional goals together in web3. We do this through organizing great programs like educational workshops, hackathons, coding bootcamps and accelerators in partnership with the leading blockchain protocols. With a track record of over 100 programmes and 10,000s developers trained, Encode helps developers learn, hack and build their own Web3 startups.",
    href: "https://www.encode.club/near2023",
    duration: "Rolling applications",
    chain: "Chain agnostic",
    location: "Global",
    tags: { Generalist: "" },
    // equity: "4%",
    linkTree: {
      twitter: "encodeclub",
      discord: "invite/encodeclub",
      website: "https://www.encode.club",
    },
  },
  {
    name: "Outlier Ventures",
    imageSvg: false,
    imageSrc:
      "https://outlierventures.io/wp-content/uploads/2019/11/Outlier_Ventures_Official_logo_Black-5-e1574692790237.png",

    subHeader: "Startup Accelerator",
    open: true,
    tagLine:
      "Outlier Ventures has been backing Web 3 founders since 2014 and is the world’s leading Open Metaverse accelerator program, and was one of the first VC firms dedicated to investing in the emerging crypto ecosystem. Their portfolio includes notable projects across DeFi, NFTs and blockchain infrastructure with a focus on emergent Open Metaverse use cases such as NFT-based play-to-earn games, augmented reality and more.\n The NEAR Base Camp is the NEAR Foundation & Outlier Ventures accelerator program, actively looking to support teams building real-world use cases, web2.5, AI and infrastructure for scalability. Outlier Ventures provides funding, mentorship, and strategic support to the selected projects.",
    href: "https://outlierventures.io/base-camp/near/",
    duration: "12 weeks",
    chain: "NEAR Native",
    location: "Global",

    tags: {
      AI: "",
      Gaming: "",
      "Web2.5": "",
      Infrastructure: "",
      "Real-world Use Cases": "",
    },
    // equity: "4%",
    linkTree: {
      website: "https://outlierventures.io",
      twitter: "OVioHQ",
    },
  },
  {
    name: "Major League Hacking",
    imageSvg: true,
    imageSrc: "/mlh.svg",
    subHeader: "Hackathon, Incubator",
    open: true,
    tagLine:
      "Major League Hacking (MLH) is a 500k+ global member community empowering the next generation of developers to learn through hackathons and the Open Source MLH Fellowship. MLH partners with software engineering, human capital management, Open Source, and DevRel leaders who wish to support the developers of tomorrow.",
    href: "https://organize.mlh.io/participants/events/9852-web3-build-hackathon-hosted-in-partnership-with-near-horizon",
    duration: "12 weeks",
    chain: "NEAR Native",
    location: "Global",
    tags: {
      AI: "",
      Gaming: "",
      "Web2.5": "",
      Infrastructure: "",
      "Real-world Use Cases": "",
    },
    // equity: "4%",
    linkTree: {
      twitter: "mlhacks",
      github: "mlh-fellowhip",
      website: "https://fellowship.mlh.io",
    },
  },
] satisfies GrowthProgram[];

export function GET() {
  return NextResponse.json(programItems);
}
