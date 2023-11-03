import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";
import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";
import { Arrow } from "@components/svgs/Arrow";
import { SoonPill } from "@components/svgs/SoonPill";
import { cn, mapImage } from "@lib/utils";

enum ViewOptions {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
}

function generateVariant(view: ViewOptions) {
  switch (view) {
    case ViewOptions.FIRST:
      return {
        [ViewOptions.FIRST]: { opacity: 1 },
        [ViewOptions.SECOND]: { opacity: 0 },
        [ViewOptions.THIRD]: { opacity: 0 },
      };
    case ViewOptions.SECOND:
      return {
        [ViewOptions.SECOND]: { opacity: 1 },
        [ViewOptions.FIRST]: { opacity: 0 },
        [ViewOptions.THIRD]: { opacity: 0 },
      };
    case ViewOptions.THIRD:
      return {
        [ViewOptions.THIRD]: { opacity: 1 },
        [ViewOptions.FIRST]: { opacity: 0 },
        [ViewOptions.SECOND]: { opacity: 0 },
      };
  }
}

interface ViewProps {
  desktop: string;
  mobile: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  soon?: boolean;
}

interface Props {
  title: string;
  className?: string;
  direction: "left" | "right";
  [ViewOptions.FIRST]: ViewProps;
  [ViewOptions.SECOND]: ViewProps;
  [ViewOptions.THIRD]: ViewProps;
}

export function ImageSection({
  title,
  direction,
  first,
  second,
  third,
  className,
}: Props) {
  const [currentView, setCurrentView] = useState<ViewOptions>(
    ViewOptions.FIRST,
  );

  const onCurrentViewChange = (selectedView: ViewOptions) =>
    setCurrentView(selectedView);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:justify-between items-stretch gap-12 h-[30rem]",
        {
          "md:flex-row-reverse": direction === "right",
        },
      )}
    >
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="flex justify-center  items-center self-stretch md:justify-start gap-2">
          <span className="text-background-dark font-bold text-3xl hidden md:block">
            Join Horizon
          </span>
          <Arrow className={cn("w-9 h-3 hidden md:block", className)} />
          <span className={cn("text-[#ff7966] font-bold text-3xl", className)}>
            {title}
          </span>
        </h2>
        <Accordion
          type="single"
          onValueChange={onCurrentViewChange}
          defaultValue={ViewOptions.FIRST}
          value={currentView}
        >
          <AccordionItem
            value={ViewOptions.FIRST}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              "data-[state=open]:rounded-lg data-[state=open]:shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              {first.icon}
              <h3 className="text-lg font-bold">{first.title}</h3>
              {first.soon && <SoonPill className="w-11 h-4 !rotate-0" />}
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              {first.description}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.SECOND}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              "data-[state=open]:rounded-lg data-[state=open]:shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              {second.icon}
              <h3 className="text-lg font-bold">{second.title}</h3>
              {second.soon && <SoonPill className="w-11 h-4 !rotate-0" />}
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              {second.description}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={ViewOptions.THIRD}
            className={cn(
              "border-none px-6 pt-3 pb-4",
              "data-[state=open]:rounded-lg data-[state=open]:shadow-[-8px_40px_59px_-28px_rgba(16,24,40,0.14),-2px_2px_14px_-1px_rgba(0,0,0,0.13)]",
            )}
          >
            <CustomAccordionTrigger className="hover:no-underline hover:text-[#006adc] gap-2 justify-start transition-all ease-in-out delay-150">
              {third.icon}
              <h3 className="text-lg font-bold">{third.title}</h3>
              {third.soon && <SoonPill className="w-11 h-4 !rotate-0" />}
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              {third.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <motion.div
        className="flex-1 relative w-full h-full"
        initial={ViewOptions.FIRST}
        animate={currentView}
      >
        <motion.img
          variants={generateVariant(ViewOptions.FIRST)}
          src={mapImage(first.desktop)}
          transition={{ duration: 0.5 }}
          alt="hire view"
          className="hidden md:block absolute inset-0"
          loading="eager"
        />
        <motion.img
          variants={generateVariant(ViewOptions.FIRST)}
          src={mapImage(first.mobile)}
          transition={{ duration: 0.5 }}
          alt="hire view"
          className="md:hidden absolute inset-0"
          loading="eager"
        />
        <motion.img
          variants={generateVariant(ViewOptions.SECOND)}
          src={mapImage(second.desktop)}
          transition={{ duration: 0.5 }}
          alt="validate view"
          className="hidden md:block absolute inset-0"
          loading="eager"
        />
        <motion.img
          variants={generateVariant(ViewOptions.SECOND)}
          src={mapImage(second.mobile)}
          transition={{ duration: 0.5 }}
          alt="validate view"
          className="md:hidden absolute inset-0"
          loading="eager"
        />
        <motion.img
          variants={generateVariant(ViewOptions.THIRD)}
          src={mapImage(third.desktop)}
          transition={{ duration: 0.5 }}
          alt="mentor view"
          className="hidden md:block absolute inset-0"
          loading="eager"
        />
        <motion.img
          variants={generateVariant(ViewOptions.THIRD)}
          src={mapImage(third.mobile)}
          transition={{ duration: 0.5 }}
          alt="mentor view"
          className="md:hidden absolute inset-0"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
