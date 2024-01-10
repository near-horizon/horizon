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
import { usePathname } from "next/navigation";
import { type NavItemProps } from "~/lib/constants/navigation/user";

export function NavItem({
  section,
  icon,
  label,
  subMenu,
  badge,
}: NavItemProps) {
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
          {badge}
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
              { "text-text-link": isSectionActive },
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
              {subMenu.map(({ section: subSection, label, badge }) => (
                <SubMenuItem
                  key={subSection}
                  section={section}
                  subSection={subSection}
                  badge={badge}
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
        isSectionActive ? "[&>svg]:text-text-link" : "[&>svg]:text-text-gray",
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
  badge,
  subSectionPart,
}: {
  subSection: string;
  label: string;
  section: string;
  active: boolean;
  badge?: React.ReactNode;
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
      <small>{badge}</small>
    </NavigationMenuLink>
  );
}
