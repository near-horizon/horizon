import { useState } from "react";
import { cn } from "@lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";
import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";
import { LinkButton } from "@components/LinkButton";

import { SpeedOMeter } from "@components/svgs/SpeedOMeter";
import { HorizonEcosystem } from "@components/svgs/HorizonEcosystem";
import { Education } from "@components/svgs/Education";

const responsiveImgs = {
  desktop: "bafkreibfgez7zpynpgo5fvjkxgstun6of5ob5noxxhugraxtda3kssosla",
  mobile: "bafkreiexkerx7t3k6oc5262yc64gd5qtatxhlmuakwt3unhfkpyyhe7k3i",
};

enum AccordionValues {
  ACCELARATION = "acceleration",
  ECOSYSTEM = "ecosystem",
  EDUCATION = "education",
}

export default function ContributorsSection() {
  const [currentAccordionValue, setCurrentAccordionValue] =
    useState<AccordionValues>(AccordionValues.ACCELARATION);
  const mapImage = (src: string) => `https://ipfs.near.social/ipfs/${src}`;

  const onCurrentAccordionValueChange = (val: AccordionValues) =>
    setCurrentAccordionValue(val);
  return (
    <div className="flex flex-col items-center md:flex-row-reverse md:items-start gap-24">
      <div className=" flex flex-1 flex-col gap-9">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <div className="py-2 px-4 text-ui-elements-white bg-ui-elements-dark font-semibold text-[16px] rounded-md text-center w-fit">
            Horizon for Partners
          </div>
          <h2 className="font-bold text-3xl text-black text-center md:text-left">
            Broaden your reach with Horizon
          </h2>
        </div>
        <Accordion
          type="single"
          onValueChange={onCurrentAccordionValueChange}
          defaultValue={AccordionValues.ACCELARATION}
          value={currentAccordionValue}
        >
          <AccordionItem
            value={AccordionValues.ACCELARATION}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.ACCELARATION &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <SpeedOMeter className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">Accelerator programs</h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Streamline sourcing potential investments through our database of
              diverse, pre-screened pool of innovative Web3 founders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={AccordionValues.ECOSYSTEM}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.ECOSYSTEM &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <HorizonEcosystem className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">Validate your idea safely</h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Match with vetted and verified projects you want to support.
              Easily find white papers, team bios, stats, and more all on the
              project's profile page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={AccordionValues.EDUCATION}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.EDUCATION &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Education className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">
                Strategic and long-term advantage
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Easily filter projects based on your specific criteria. Attend
              Horizon Networking and Pitch events to discover multiple,
              promising projects at the same time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-center md:justify-start">
          <LinkButton
            label="Join as a Partner"
            className="font-medium"
            variant="secondary"
          />
        </div>
      </div>
      <div className="md:w-1/2 lg:flex-1">
        <img
          src={mapImage(responsiveImgs.desktop)}
          alt="contributors"
          className="hidden md:block"
        />
        <img
          src={mapImage(responsiveImgs.mobile)}
          alt="contributors"
          className="md:hidden"
        />
      </div>
    </div>
  );
}
