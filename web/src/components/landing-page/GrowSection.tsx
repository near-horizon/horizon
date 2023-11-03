import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";

import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";

import { Arrow } from "@components/svgs/Arrow";
import { Wallet } from "@components/svgs/Wallet";
import { RocketShip } from "@components/svgs/RocketShip";
import { Users2 } from "@components/svgs/Users2";

import { cn } from "@lib/utils";

enum ViewOptions {
  CREDITS = "credits",
  JOIN = "join",
  BACKERS = "backers",
}

const growth = {
  [ViewOptions.CREDITS]: {
    desktop: "bafkreicyboq5sakzmeineg4puphaqiinnxbdhajfmvenqoiwqheiqyupti",
    mobile: "bafkreiet6lvffvydiltk3zxez235fryrsk32yhrlpsf3rpai22dg57nieq",
  },
  [ViewOptions.JOIN]: {
    desktop: "bafkreiaocml2yjcidsewonrz5t7rwupkqdug74cztwegntixsmxhswplza",
    mobile: "bafkreib6xgneg5nrfha4ckem36ucrfaba7gmodpshv4kkj4whtjav26psi",
  },
  [ViewOptions.BACKERS]: {
    desktop: "bafkreiedojgoxqngscq2obtla3renqubsbx3k52cs4fb6ko5l2bvxrno4i",
    mobile: "bafkreidm6dzoiqiuju6hqtnzuxzh7xztpxjecyvzribbzxqhqacgfzxdnu",
  },
};

export default function GrowSection() {
  const [currentView, setCurrentView] = useState<ViewOptions>(
    ViewOptions.CREDITS,
  );
  const [isLoading, setIsLoading] = useState(false);

  const onCurrentViewChange = (selectedView: ViewOptions) =>
    setCurrentView(selectedView);

  const mapImage = (src: string) => `https://ipfs.near.social/ipfs/${src}`;

  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(true);
      const imageUrls = [
        growth[ViewOptions.BACKERS].desktop,
        growth[ViewOptions.BACKERS].mobile,
        growth[ViewOptions.CREDITS].desktop,
        growth[ViewOptions.CREDITS].mobile,
        growth[ViewOptions.JOIN].desktop,
        growth[ViewOptions.JOIN].mobile,
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

          <Arrow className="w-9 h-3 hidden md:block" fill="#32d583" />
          <span className="text-[#32d583] font-bold text-3xl">Grow</span>
        </h2>
        <Accordion
          type="single"
          onValueChange={onCurrentViewChange}
          defaultValue={ViewOptions.CREDITS}
          value={currentView}
        >
          <AccordionItem
            value={ViewOptions.CREDITS}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.CREDITS &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Wallet className="h-8 w-8 !rotate-0" />
              <h3 className="text-lg font-bold">
                Get financial support with Horizon Credits
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Leverage Horizon Credits to engage with our 20+ Service Providers
              and gain access to early beta testers
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.JOIN}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.JOIN &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <RocketShip className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">
                Join trusted partner accelerators
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Facilitate NEAR-specific acceleration programs and provide support
              to chain agnostic acceleration programs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.BACKERS}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.BACKERS &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Users2 className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">
                Access to private pool of backers
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Connect with funding teams from around the world through Horizon
              pitch events, product demo nights, one-on-ones with VCs, and more.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <motion.div
        variants={{
          [ViewOptions.CREDITS]: { opacity: 1, scale: 1 },
          [ViewOptions.JOIN]: { opacity: 1, scale: 1 },
          [ViewOptions.BACKERS]: { opacity: 1, scale: 1 },
        }}
        className="flex-1"
        initial={ViewOptions.CREDITS}
        animate={currentView}
      >
        {!isLoading && (
          <>
            {currentView === ViewOptions.CREDITS && (
              <img
                src={mapImage(growth[ViewOptions.CREDITS].desktop)}
                alt="credits view"
                className="hidden md:block"
              />
            )}
            {currentView === ViewOptions.CREDITS && (
              <img
                src={mapImage(growth[ViewOptions.CREDITS].mobile)}
                alt="credits view"
                className="md:hidden"
              />
            )}
            {currentView === ViewOptions.JOIN && (
              <img
                src={mapImage(growth[ViewOptions.JOIN].desktop)}
                alt="join view"
                className="hidden md:block"
              />
            )}
            {currentView === ViewOptions.JOIN && (
              <img
                src={mapImage(growth[ViewOptions.JOIN].mobile)}
                alt="join view"
                className="md:hidden"
              />
            )}
            {currentView === ViewOptions.BACKERS && (
              <img
                src={mapImage(growth[ViewOptions.BACKERS].desktop)}
                alt="backers view"
                className="hidden md:block"
              />
            )}
            {currentView === ViewOptions.BACKERS && (
              <img
                src={mapImage(growth[ViewOptions.BACKERS].mobile)}
                alt="backers view"
                className="md:hidden"
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
