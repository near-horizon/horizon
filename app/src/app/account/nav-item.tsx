"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useProjectCompletion } from "~/hooks/projects";
import { usePathname } from "next/navigation";
import { useUser } from "~/stores/global";
import { type NavItemProps } from "~/lib/constants/navigation/user";
import { NUMBER } from "~/lib/format";

export function NavItem({
  section,
  icon,
  label,
  subMenu,
  count,
}: NavItemProps) {
  const user = useUser();
  const { data: completion } = useProjectCompletion(user?.accountId ?? "");
  const [sectionPart, subSectionPart] = usePathname().split("/").slice(2);
  const isSectionActive = sectionPart === section;

  if (!subMenu || subMenu.length === 0) {
    return (
      <NavigationMenuItem
        className={cn("w-full text-sm font-semibold text-ui-elements-dark", {
          "text-text-link": isSectionActive,
        })}
      >
        <NavigationMenuLink
          href={`/account/${section}`}
          className="flex flex-row items-center justify-between"
        >
          <MenuItem
            icon={icon}
            label={label}
            isSectionActive={isSectionActive}
          />
          {count}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value={section} className="m-0 border-none p-0">
          <AccordionTrigger
            className={cn(
              "m-0 w-full p-0 text-sm font-semibold text-ui-elements-dark hover:no-underline",
              { "text-text-link": isSectionActive }
            )}
          >
            <MenuItem
              icon={icon}
              label={label}
              isSectionActive={isSectionActive}
              noGrow
            />
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex w-full flex-col items-start justify-start gap-3 pl-8 pt-2">
              {completion &&
                subMenu.map(({ section: subSection, label }) => (
                  <SubMenuItem
                    key={subSection}
                    section={section}
                    subSection={subSection}
                    completion={
                      completion[subSection as keyof typeof completion]
                    }
                    active={isSectionActive}
                    label={label}
                    subSectionPart={subSectionPart}
                  />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </NavigationMenuItem>
  );
}

function MenuItem({
  icon,
  label,
  isSectionActive,
  noGrow,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  isSectionActive: boolean;
  noGrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-start gap-3",
        isSectionActive ? "[&>svg]:text-text-link" : "[&>svg]:text-text-gray"
      )}
    >
      {icon}
      <span className={cn({ "flex-grow": !noGrow })}>{label}</span>
    </div>
  );
}

function SubMenuItem({
  subSection,
  label,
  section,
  active,
  completion,
  subSectionPart,
}: {
  subSection: string;
  label: string;
  section: string;
  active: boolean;
  completion: number;
  subSectionPart?: string;
}) {
  return (
    <NavigationMenuLink
      key={subSection}
      href={`/account/${section}/${subSection}`}
      className={cn("flex w-full flex-row items-center justify-between", {
        "text-text-link": active && subSectionPart === subSection,
      })}
    >
      <span>{label}</span>
      <small>{NUMBER.percentage(completion)}</small>
    </NavigationMenuLink>
  );
}
