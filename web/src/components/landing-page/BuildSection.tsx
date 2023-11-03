import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";

import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";

import { Arrow } from "@components/svgs/Arrow";
import { BoxCheck } from "@components/svgs/BoxCheck";
import { SoonPill } from "@components/svgs/SoonPill";
import { Lightbulb } from "@components/svgs/Lightbulb";
import { Compass } from "@components/svgs/Compass";

import { cn } from "@lib/utils";

enum ViewOptions {
  HIRE = "hire",
  VALIDATE = "validate",
  MENTOR = "mentor",
}

const build = {
  [ViewOptions.HIRE]: {
    desktop: "bafkreia4if3v5pidg5wn3ajuox7novoqzabtgqjcxtutxscip5dmrhrcni",
    mobile: "bafkreid3i5zlxu2eiqca7qghpgpoj2zbmp2kwv7qtkzdj2utyqhunk56y4",
  },
  [ViewOptions.VALIDATE]: {
    desktop: "bafkreiaj66jfkq67dtohhhyugu6fzvwes5iojhnn6552qtsyiyg33lv35e",
    mobile: "bafkreigc2hjgoma3gewa55buw4t3ueoshwap25iu2t6hcyapjwvpqo2qfi",
  },
  [ViewOptions.MENTOR]: {
    desktop: "bafkreicichhd7bqfhvwphgb3oeo6rv2eritrqhdinaabam2c6xo7epju5e",
    mobile: "bafkreigs2ktn7dokv4l6nug733ovyzqco7lw5hvqluhwzst2sgce3ty4dy",
  },
};

export default function BuildSection() {
  const [currentView, setCurrentView] = useState<ViewOptions>(ViewOptions.HIRE);
  const [isLoading, setIsLoading] = useState(false);

  const onCurrentViewChange = (selectedView: ViewOptions) =>
    setCurrentView(selectedView);

  const mapImage = (src: string) => `https://ipfs.near.social/ipfs/${src}`;

  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(true);
      const imageUrls = [
        build[ViewOptions.HIRE].desktop,
        build[ViewOptions.HIRE].mobile,
        build[ViewOptions.VALIDATE].desktop,
        build[ViewOptions.VALIDATE].mobile,
        build[ViewOptions.MENTOR].desktop,
        build[ViewOptions.MENTOR].mobile,
      ];

      const promises = imageUrls.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = mapImage(imageUrl);
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(promises);
      setIsLoading(false);
    };
    preloadImages();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-12">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="flex justify-center  items-center self-stretch md:justify-start gap-2">
          <span className="text-background-dark font-bold text-3xl hidden md:block">
            Join Horizon
          </span>
          <Arrow className="w-9 h-3 hidden md:block" />
          <span className="text-[#ff7966] font-bold text-3xl">Build</span>
        </h2>
        <Accordion
          type="single"
          onValueChange={onCurrentViewChange}
          defaultValue={ViewOptions.HIRE}
          value={currentView}
        >
          <AccordionItem
            value={ViewOptions.HIRE}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.HIRE &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <BoxCheck className="h-8 w-8 !rotate-0" />
              <h3 className="text-lg font-bold">
                Hire ecosystem experts for your needs
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Easily source reputable contributors for any and every business
              need you have, including back office finance management,
              recruitment, development, legal, and marketing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.VALIDATE}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.VALIDATE &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Lightbulb className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">Validate your idea safely</h3>
              <SoonPill className="w-11 h-4 !rotate-0" />
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Users are standing by to test your application and provide
              valuable feedback before your launch.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.MENTOR}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.MENTOR &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Compass className="h-9 w-9" />
              <h3 className="text-lg font-bold">Find a mentor or become one</h3>
              <SoonPill className="w-11 h-4 !rotate-0" />
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Connect with industry veterans for advice on your GTM plan,
              leadership skills, pitch deck, and more. Or apply to become a
              mentor, and help Web3 founders put their best foot forward as they
              prepare for launch.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <motion.div
        variants={{
          [ViewOptions.HIRE]: { opacity: 1, scale: 1 },
          [ViewOptions.VALIDATE]: { opacity: 1, scale: 1 },
          [ViewOptions.MENTOR]: { opacity: 1, scale: 1 },
        }}
        className="flex-1"
        initial={ViewOptions.HIRE}
        animate={currentView}
      >
        {!isLoading && (
          <>
            {currentView === ViewOptions.HIRE && (
              <img
                src={mapImage(build[ViewOptions.HIRE].desktop)}
                alt="hire view"
                className="hidden md:block"
              />
            )}
            {currentView === ViewOptions.HIRE && (
              <img
                src={mapImage(build[ViewOptions.HIRE].mobile)}
                alt="hire view"
                className="md:hidden"
              />
            )}
            {currentView === ViewOptions.VALIDATE && (
              <img
                src={mapImage(build[ViewOptions.VALIDATE].desktop)}
                alt="validate view"
                className="hidden md:block"
              />
            )}
            {currentView === ViewOptions.VALIDATE && (
              <img
                src={mapImage(build[ViewOptions.VALIDATE].mobile)}
                alt="validate view"
                className="md:hidden"
              />
            )}
            {currentView === ViewOptions.MENTOR && (
              <img
                src={mapImage(build[ViewOptions.MENTOR].desktop)}
                alt="mentor view"
                className="hidden md:block"
              />
            )}
            {currentView === ViewOptions.MENTOR && (
              <img
                src={mapImage(build[ViewOptions.MENTOR].mobile)}
                alt="mentor view"
                className="md:hidden"
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
