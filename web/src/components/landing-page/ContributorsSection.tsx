import { useState } from "react";
import { cn } from "@lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";
import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";

import { Target } from "@components/svgs/Target";
import { HorizonLogo } from "@components/svgs/HorizonLogo";
import { Expand } from "@components/svgs/Expand";

import { LinkButton } from "@components/LinkButton";

const responsiveImgs = {
  desktop: "bafkreigrs36in3bq4mf6mv2cezjqdq5nobevgqitsj3tsexnf22phv2tmu",
  mobile: "bafkreihdikmkpfklanm5yafjha4bhrxdi3b4is6hjnj7klxkpwifxix3ym",
};

enum AccordionValues {
  ACCESS = "access",
  SCALED = "scaled",
  ADVANTAGE = "advantage",
}

export default function ContributorsSection() {
  const [currentAccordionValue, setCurrentAccordionValue] =
    useState<AccordionValues>(AccordionValues.ACCESS);
  const mapImage = (src: string) => `https://ipfs.near.social/ipfs/${src}`;

  const onCurrentAccordionValueChange = (val: AccordionValues) =>
    setCurrentAccordionValue(val);
  return (
    <div className="flex flex-col items-center md:flex-row-reverse md:items-start gap-24">
      <div className=" flex flex-1 flex-col gap-9">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <div className="py-2 px-4 text-ui-elements-white bg-ui-elements-dark font-semibold text-[16px] rounded-md text-center w-fit">
            Horizon for Contributors
          </div>
          <h2 className="font-bold text-3xl text-black text-center md:text-left">
            Grow your reach and reputation with Horizon
          </h2>
        </div>
        <Accordion
          type="single"
          onValueChange={onCurrentAccordionValueChange}
          defaultValue={AccordionValues.ACCESS}
          value={currentAccordionValue}
        >
          <AccordionItem
            value={AccordionValues.ACCESS}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.ACCESS &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <HorizonLogo className="h-9 w-9 !rotate-0" />

              <h3 className="text-lg font-bold">
                Access to the Horizon ecosystem
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Discover and connect directly with 200+ promising startups and
              founders ranging from early-stage to growth-stage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={AccordionValues.SCALED}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.SCALED &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Expand className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">Validate your idea safely</h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Match with vetted and verified projects you want to support.
              Easily find white papers, team bios, stats, and more all on the
              project's profile page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={AccordionValues.ADVANTAGE}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.ADVANTAGE &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Target className="h-9 w-9 !rotate-0" />
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
            label="Create Profile"
            className="font-medium"
            href="https://app.hzn.xyz/onboarding"
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
