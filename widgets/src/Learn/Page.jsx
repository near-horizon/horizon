const ownerId = "nearhorizon.near";

const props = {
  bdBasics: [
    {
      height: "425px",
      title: "Product Market Fit Survey",
      link: "https://pmfsurvey.com/",
      description:
        "Free tool that helps you run the Sean Ellis test and measure your company’s product/market fit.",
      img: "https://nearhorizonassets.s3.amazonaws.com/pmf-survey.gif",
      video: "https://youtu.be/A94qh0SAsGQ",
      tags: ["business fundamentals", "essentials"],
      height: "425px",
    },
    {
      height: "425px",
      title: "Essential Startup Advice",
      link: "https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice",
      description:
        "Y Combinator's collection of tips they consider the most important, transformative advice for startups",
      img: "https://nearhorizonassets.s3.amazonaws.com/essential-startup-advice.gif",
      video: "https://youtu.be/u2kzYj9ck_A",
      tags: ["business fundamentals", "essentials"],
    },
    {
      height: "425px",
      title: "How to Plan an MVP",
      link: "https://www.ycombinator.com/library/6f-how-to-plan-an-mvp",
      description:
        "Y Combinator Managing Director Michael Seibel shares his approach to building an MVP and getting your first users",
      img: "https://nearhorizonassets.s3.amazonaws.com/how-to-plan-an-mvp.gif",
      video: "https://youtu.be/ZRJknwo23lE",
      tags: ["business fundamentals", "mvp"],
    },
    {
      height: "425px",
      title: "Startup Ecosystem Canvas",
      link: "https://fi.co/canvas_template",
      description:
        "Template for plotting out your local ecosystem to help newcomers",
      img: "https://nearhorizonassets.s3.amazonaws.com/startup-ecosystem-canvas.gif",
      video: "https://youtu.be/x0lkHst8bM4",
      tags: ["business fundamentals", "mvp"],
    },
    {
      height: "425px",
      title: "Designing a Better Pitch Deck",
      link: "https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck",
      description: "Here’s how to make a solid Demo Day slide deck.",
      img: "https://nearhorizonassets.s3.amazonaws.com/designing-a-better-pitch-deck.gif",
      video: "https://youtu.be/sT-tA9m7-J8",
      tags: ["business fundamentals", "pitching"],
    },
  ],
  legalHR: [
    {
      height: "325px",
      title: "Legal Checklist",
      link: "https://wiki.near.org/governance/legal-checklist",
      description: "Overview of the regulatory best practices",
      img: "",
      video: "",
      tags: ["legal", "wiki"],
    },
    {
      height: "325px",
      title: "Dapp Legal Structure",
      link: "https://legalnodes.com/article/legal-structure-decentralized-apps",
      description: "Article about the legal structure of decentralized apps",
      img: "",
      video: "",
      tags: ["legal"],
    },
    {
      height: "325px",
      title: "NEAR Careers Portal",
      link: "https://careers.near.org/jobs",
      description:
        "Discover open roles available within the NEAR Ecosystem, and you can also post open roles within your team as well",
      img: "",
      video: "",
      tags: ["hr", "recruitment"],
    },
    {
      height: "325px",
      title: "SAFE Template",
      link: "https://www.ycombinator.com/library/6z-fundraising-templates-safe-financing-documents",
      description:
        "SAFE (simple agreement for future equity) for early-stage fundraising",
      img: "",
      video: "",
      tags: ["business fundamentals", "fundraising"],
    },
    {
      height: "425px",
      title: "Launching A Token",
      link: "https://legalnodes.com/article/legal-structure-decentralized-apps",
      description: "Key considerations before launching and promoting a token",
      img: "https://nearhorizonassets.s3.amazonaws.com/launching-a-token-key-considerations.gif",
      video: "https://youtu.be/wZCsoyLClaI",
      tags: ["legal", "crypt-economics"],
    },
  ],
  growth: [
    {
      height: "325px",
      title: "Growth & Marketing Toolkit",
      link: "https://docs.google.com/presentation/d/1Abjnbw6qNSC7hu3vAqWqo9hn5pOArakIfU9ZRR0SQTI/edit?usp=sharing",
      description:
        "In-depth overview of best practices and proven strategies for growth & marketing your project in the Web3/crypto space",
      img: "",
      video: "",
      tags: ["growth&marketing", "ecosystem"],
    },
    {
      height: "325px",
      title: "NEAR Builders",
      link: "https://docs.nearbuilders.com/community-groups/",
      description:
        "Community groups focused on building and growing the NEAR ecosystem",
      img: "",
      video: "",
      tags: ["growth&marketing", "community"],
    },
    {
      height: "325px",
      title: "NEAR Workshops",
      link: "https://nearworkshops.com/watch",
      description:
        "Free live educational content series tailored to teaching developers the latest tooling, SDKs, and APIs across NEAR",
      img: "",
      video: "",
      tags: ["growth&marketing", "community"],
    },
    {
      height: "325px",
      title: "Ecosystem Calendar",
      link: "https://nearweek.com/calendar",
      description:
        "Wider visibility into upcoming events, launches, Twitter Spaces, campaigns, etc... Make sure to submit yours!",
      img: "",
      video: "",
      tags: ["growth&marketing", "events"],
    },
    {
      height: "325px",
      title: "MarketingDAO",
      link: "https://docs.google.com/document/d/1i1PbFQKlwyWzjGZMoeUIM3gy3ghWKH3Yo4iOi-D8N_U/view",
      description:
        "Facilitates the allocation of Community funds for marketing activities under $10,000",
      img: "",
      video: "",
      tags: ["growth&marketing", "DAO", "fundraising"],
    },
  ],
  technical: [
    {
      height: "325px",
      title: "Blockchain Operating System (BOS)",
      link: "https://alpha.near.org",
      description:
        "The gateway to Web3. Build and use Web3 components for any chain or protocol",
      img: "",
      video: "",
      tags: ["technical", "dev-tools", "bos"],
    },
    {
      height: "325px",
      title: "NEAR Docs",
      link: "https://docs.near.org",
      description: "Your entry point to using NEAR's tech stack",
      img: "",
      video: "",
      tags: ["technical", "dev-tools"],
    },
    {
      height: "325px",
      title: "NEAR GPT-3 Docs Chat",
      link: "https://neardocs.online/",
      description:
        "Leverage the power of GPT-3 to get answers to your technical questions about NEAR",
      img: "",
      video: "",
      tags: ["technical", "dev-tools", "chat-gpt"],
    },
    {
      height: "325px",
      title: "Pagoda",
      link: "https://www.pagoda.co/",
      description:
        "The first-ever Web3 startup platform, and main core protocol contributor of NEAR Protocol",
      img: "",
      video: "",
      tags: ["technical", "dev-tools"],
    },
    {
      height: "325px",
      title: "Croncat",
      link: "https://cron.cat/",
      description: "Decentralized Scheduling for Blockchain Transactions",
      img: "",
      video: "",
      tags: ["technical", "dev-tools"],
    },
    {
      height: "325px",
      title: "Kurtosis",
      link: "https://www.kurtosistech.com/",
      description:
        "Local development and testing environments for developers in the NEAR ecosystem",
      img: "",
      video: "",
      tags: ["technical", "dev-tools"],
    },
    {
      height: "325px",
      title: "Calimero",
      link: "https://www.calimero.network/",
      description:
        "Allowing deployment of a customisable, easy to use private shard with built-in privacy features",
      img: "",
      video: "",
      tags: ["technical", "dev-tools"],
    },
    {
      height: "325px",
      title: "IPFS",
      link: "https://ipfs.tech/",
      description:
        "A peer-to-peer hypermedia protocol to make the web faster, safer, and more open",
      img: "",
      video: "",
      tags: ["technical", "storage"],
    },
    {
      height: "325px",
      title: "The Graph",
      link: "https://thegraph.com/",
      description:
        "Developer tools to process blockchain events and make the resulting data easily available",
      img: "",
      video: "",
      tags: ["technical", "explorers&indexers"],
    },
    {
      height: "325px",
      title: "NEAR Wallet Selector",
      link: "https://github.com/near/wallet-selector",
      description:
        "Provides an abstraction over various wallets within the NEAR ecosystem",
      img: "",
      video: "",
      tags: ["technical", "wallets"],
    },
    {
      height: "325px",
      title: "Seda (formerly Flux)",
      link: "https://www.seda.xyz/",
      description: "Serving as the trust-less data layer for Web3",
      img: "",
      video: "",
      tags: ["technical", "oracles"],
    },
    {
      height: "325px",
      title: "MetaBUILD",
      link: "https://near.org/metabuild/",
      description:
        "The NEAR MetaBUILD hackathons will feature exciting themes focused on solving real-world problems.",
      img: "",
      video: "",
      tags: ["technical", "hackathons"],
    },
    {
      height: "325px",
      title: "Aurora EVM",
      link: "https://aurora.dev/",
      description: "Aurora is an EVM solution built on the NEAR Protocol",
      img: "",
      video: "",
      tags: ["technical", "interoperability"],
    },
    {
      height: "325px",
      title: "Octopus Network",
      link: "https://oct.network/",
      description:
        "Multichain interoperable crypto-network for launching and running Web3 substrate-based, EVM compatible Appchains",
      img: "",
      video: "",
      tags: ["technical", "interoperability"],
    },
    {
      height: "325px",
      title: "Keypom",
      link: "hhttps://keypom.xyz/",
      description: "Onboarding toolkit for builders and dApp creators",
      img: "",
      video: "",
      tags: ["technical", "onboarding"],
    },
  ],
};

// TODO: Add sorting functionality

return (
  <div>
    <div style={{ textAlign: "center", marginBottom: "50px" }}>
      <h1>Resources for Founders</h1>
      <h4>
        Welcome! Below you will find a curated list of resources to best help
        you where you need it most
      </h4>
    </div>
    <br />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Business Fundamentals</h2>
    <Widget
      src={`${ownerId}/widget/CardGallery`}
      props={{ cardData: props.bdBasics }}
    />
    <hr />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Growth & Marketing</h2>
    <Widget
      src={`${ownerId}/widget/CardGallery`}
      props={{ cardData: props.growth }}
    />
    <hr />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Recruiting & Legal</h2>
    <Widget
      src={`${ownerId}/widget/CardGallery`}
      props={{ cardData: props.legalHR }}
    />
    <hr />
    <br />
    <h2 style={{ marginBottom: "20px" }}>Technical</h2>
    <Widget
      src={`${ownerId}/widget/CardGallery`}
      props={{ cardData: props.technical }}
    />
    <hr />
    <br />
  </div>
);
