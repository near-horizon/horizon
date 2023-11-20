import { PROGRAM_ITEMS } from "~/lib/constants/growth";
import GrowthProgramCard from "./card";

export default function GrowthPrograms() {
  return (
    <div>
      <div className="mb-4 text-3xl font-bold text-black">Growth Programs</div>
      <div className="text-sm font-normal text-gray-900">
        Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena
        polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin
        litecoin. Ethereum kadena polkadot ICON BitTorrent.
      </div>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {PROGRAM_ITEMS.map((growthProgram) => (
          <GrowthProgramCard program={growthProgram} key={growthProgram.name} />
        ))}
      </div>
    </div>
  );
}
