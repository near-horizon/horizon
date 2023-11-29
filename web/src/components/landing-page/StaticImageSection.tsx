import { cn, mapImage } from "@lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@components/ui/accordion";
import CustomAccordionTrigger from "@components/ui/custom/CustomAccordionTrigger";
import { LinkButton } from "@components/LinkButton";

enum ViewOptions {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
}

interface ViewProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  soon?: boolean;
}

interface Props {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  direction: "left" | "right";
  desktop: string;
  mobile: string;
  [ViewOptions.FIRST]: ViewProps;
  [ViewOptions.SECOND]: ViewProps;
  [ViewOptions.THIRD]: ViewProps;
  children?: React.ReactNode;
}

export function StaticImageSection({
  title,
  subtitle,
  cta,
  direction,
  desktop,
  mobile,
  first,
  second,
  third,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center md:flex-row md:items-stretch gap-8 md:h-[40rem]",
        {
          "md:flex-row-reverse": direction === "right",
        },
      )}
    >
      <div className="flex flex-1 flex-col gap-9 h-full">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <div className="py-2 px-4 text-ui-elements-white bg-ui-elements-dark font-semibold text-[16px] rounded-md text-center w-fit">
            {title}
          </div>
          <h2 className="font-bold text-3xl text-black text-center md:text-left">
            {subtitle}
          </h2>
        </div>
        <Accordion
          type="single"
          defaultValue={ViewOptions.FIRST}
          className="flex-grow"
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
            </CustomAccordionTrigger>
            <AccordionContent className="text-sm font-normal text-black pl-11">
              {third.description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-center md:justify-start">
          {cta ? (
            cta
          ) : (
            <LinkButton
              label="Create Profile"
              className="font-medium"
              href="https://app.hzn.xyz/onboarding"
            />
          )}
        </div>
      </div>

      <div className="md:flex-1 flex items-center justify-center md:h-full h-[455px] w-full">
        {children ? (
          children
        ) : (
          <>
            <img
              src={mapImage(desktop)}
              alt="contributors"
              className="hidden md:block"
            />
            <img
              src={mapImage(mobile)}
              alt="contributors"
              className="md:hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}
