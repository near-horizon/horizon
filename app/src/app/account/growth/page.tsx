"use client";

import GrowthProgramCard from "./card";
import { useGrowthPrograms } from "~/hooks/growth-programs";

export default function GrowthPrograms() {
  const { data: growthPrograms } = useGrowthPrograms();

  return (
    <div>
      <div className="mb-4 text-3xl font-bold text-black">Growth Programs</div>
      <div className="text-sm font-normal text-gray-900">
        Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena
        polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin
        litecoin. Ethereum kadena polkadot ICON BitTorrent.
      </div>
      <div className="mt-6 flex flex-row flex-wrap items-stretch justify-start gap-8">
        {growthPrograms.map((growthProgram) => (
          <GrowthProgramCard program={growthProgram} key={growthProgram.name} />
        ))}
      </div>
    </div>
  );
}
