import { useState } from "react";
import { cn } from "@lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";
import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";
import { LinkButton } from "@components/LinkButton";

import { Access } from "@components/svgs/Access";
import { Clock } from "@components/svgs/Clock";
import { Risk } from "@components/svgs/Risk";

const responsiveImgs = {
  desktop: "bafkreie2i3o373b6srfte3adfbgnjo7qbgi4dustpt5y7dr6irll7my4aa",
  mobile: "bafkreidp4dfhg2x74xuojei4qrxmfbtkrzkbdoqgsaljpc2qrn4vi7i65a",
};

enum AccordionValues {
  ACCESS = "access",
  RISK = "risk",
  TIME = "time",
}

export default function ContributorsSection() {
  const [currentAccordionValue, setCurrentAccordionValue] =
    useState<AccordionValues>(AccordionValues.ACCESS);
  const mapImage = (src: string) => `https://ipfs.near.social/ipfs/${src}`;

  const onCurrentAccordionValueChange = (val: AccordionValues) =>
    setCurrentAccordionValue(val);
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start gap-24">
      <div className=" flex flex-1 flex-col gap-9">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <div className="py-2 px-4 text-ui-elements-white bg-ui-elements-dark font-semibold text-[16px] rounded-md text-center w-fit">
            Horizon for Backers
          </div>
          <h2 className="font-bold text-3xl text-black text-center md:text-left">
            Discover the next Web3 success story with Horizon
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
              <Access className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">
                Access to the ecosystem projects
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Engage directly with 150+ startups at various stages, from
              early-stage to growth-stage businesses.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={AccordionValues.RISK}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.RISK &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Risk className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">Lower your risks</h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Enhance your community engagement through our perks, tools,
              resources and Horizon Credits available to founders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={AccordionValues.TIME}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentAccordionValue === AccordionValues.TIME &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Clock className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">Save your time</h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Activate learners through our next gen talent database, with a
              pipeline of internship and job opportunities.
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
          className=" md:hidden"
        />
      </div>
    </div>
  );
}
