import { useState } from "react";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";

import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";

import { Arrow } from "@components/svgs/Arrow";
import { Users2 } from "@components/svgs/Users2";
import { ThumbsUp } from "@components/svgs/ThumbsUp";
import { FaceChat } from "@components/svgs/FaceChat";

import { cn } from "@lib/utils";

enum ViewOptions {
  CONNECT = "connect",
  SHARE = "share",
  TAP = "tap",
}

const connect = {
  [ViewOptions.CONNECT]: {
    desktop: "bafkreidfgplno2h7aczch6i4gqsx74krd4vgfjshuknkhnto2ez2zlsf2q",
    mobile: "bafkreiavbrd2rxzaxucfipc7uemiols4jhdgezshdgxanslssud3xe22jy",
  },
  [ViewOptions.SHARE]: {
    desktop: "bafkreierfioucir5qf43cw56iujghcdvzidezk7z5gny6sw33xhd5ekviy",
    mobile: "bafkreicgiwyplfjka7ldc2k6sg5it3qj75i4dd4xrdbwqlbhuq4eb3zx6i",
  },
  [ViewOptions.TAP]: {
    desktop: "bafkreibcp5xmlhlveqs3f4ecestwnsaxobd26adxc2jruvc5v4rah4znbu",
    mobile: "bafkreib2ovzs4vqn3oilpvdns36v4xhwvw4pgrerjc55xd42nvxaiinwqu",
  },
};

export default function ConnectSection() {
  const [currentView, setCurrentView] = useState<ViewOptions>(
    ViewOptions.CONNECT
  );

  const onCurrentViewChange = (selectedView: ViewOptions) =>
    setCurrentView(selectedView);

  const mapImage = (src: string) => `https://ipfs.near.social/ipfs/${src}`;

  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-between items-center gap-12">
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="flex justify-center  items-center self-stretch md:justify-start gap-2">
          <span className="text-background-dark font-bold text-3xl hidden md:block">
            Join Horizon
          </span>
          <Arrow fill="#9797ff" className="w-9 h-3 hidden md:block" />
          <span className="text-[#9797ff] font-bold text-3xl">Connect</span>
        </h2>
        <Accordion
          type="single"
          onValueChange={onCurrentViewChange}
          defaultValue={ViewOptions.CONNECT}
          value={currentView}
        >
          <AccordionItem
            value={ViewOptions.CONNECT}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.CONNECT &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]"
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <Users2 className="h-8 w-8 !rotate-0" />
              <h3 className="text-lg font-bold">
                Connect with fellow founders
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Build long-term relationships with other founders on the app, and
              grow your professional network through regular founder meet and
              greets, product demo nights, workshops, and pitch events
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.SHARE}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.SHARE &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]"
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <ThumbsUp className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">
                Share your idea and get feedback
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Enhance your community engagement through our perks, tools,
              resources and Horizon Credits available to founders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.TAP}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              currentView === ViewOptions.TAP &&
                "rounded-lg shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]"
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              <FaceChat className="h-9 w-9 !rotate-0" />
              <h3 className="text-lg font-bold">
                Tap into a supportive community
              </h3>
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              Get involved with our mentorship program, product demo nights,
              hackathons and community AMA’s.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <motion.div
        variants={{
          [ViewOptions.CONNECT]: { opacity: 1, scale: 1 },
          [ViewOptions.SHARE]: { opacity: 1, scale: 1 },
          [ViewOptions.TAP]: { opacity: 1, scale: 1 },
        }}
        className="flex-1"
        initial={ViewOptions.CONNECT}
        animate={currentView}
      >
        {currentView === ViewOptions.CONNECT && (
          <img
            src={mapImage(connect[ViewOptions.CONNECT].desktop)}
            alt="connect view"
            className="hidden md:block"
          />
        )}
        {currentView === ViewOptions.CONNECT && (
          <img
            src={mapImage(connect[ViewOptions.CONNECT].mobile)}
            alt="connect view"
            className="md:hidden"
          />
        )}
        {currentView === ViewOptions.SHARE && (
          <img
            src={mapImage(connect[ViewOptions.SHARE].desktop)}
            alt="share view"
            className="hidden md:block"
          />
        )}
        {currentView === ViewOptions.SHARE && (
          <img
            src={mapImage(connect[ViewOptions.SHARE].mobile)}
            alt="share view"
            className="md:hidden"
          />
        )}
        {currentView === ViewOptions.TAP && (
          <img
            src={mapImage(connect[ViewOptions.TAP].desktop)}
            alt="tap view"
            className="hidden md:block"
          />
        )}
        {currentView === ViewOptions.TAP && (
          <img
            src={mapImage(connect[ViewOptions.TAP].mobile)}
            alt="tap view"
            className="md:hidden"
          />
        )}
      </motion.div>
    </div>
  );
}
