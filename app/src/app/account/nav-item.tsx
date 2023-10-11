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
import { useParams, usePathname } from "next/navigation";

export function NavItem({
  section,
  icon,
  label,
  subMenu,
  count,
}: {
  section: string;
  icon: React.ReactNode;
  label: string;
  subMenu?: { section: string; label: string; progress: number }[];
  count?: number;
}) {
  const completion = useProjectCompletion();
  const { section: activeSection, subSection: activeSubSection } = useParams()!;
  const pathname = usePathname();
  const [sectionPart, subSectionPart] = (pathname ?? "").split("/").slice(2);

  const isSectionActive = activeSection === section || sectionPart === section;

  if (subMenu && subMenu.length > 0) {
    return (
      <NavigationMenuItem className="w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value={section} className="m-0 border-none p-0">
            <AccordionTrigger
              className={cn(
                "m-0 w-full p-0 text-sm font-semibold text-ui-elements-dark hover:no-underline",
                {
                  "text-text-link": isSectionActive,
                }
              )}
            >
              <div
                className={cn(
                  "flex flex-row items-center justify-start gap-3",
                  isSectionActive
                    ? "[&>svg]:text-text-link"
                    : "[&>svg]:text-text-gray"
                )}
              >
                {icon}
                <span>{label}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex w-full flex-col items-start justify-start gap-3 pl-8 pt-2">
                {subMenu.map(({ section: subSection, label }) => (
                  <NavigationMenuLink
                    key={subSection}
                    href={`/account/${section}/${subSection}`}
                    className={cn(
                      "flex w-full flex-row items-center justify-between",
                      {
                        "text-text-link":
                          isSectionActive &&
                          (activeSubSection === subSection ||
                            subSectionPart === subSection),
                      }
                    )}
                  >
                    <span>{label}</span>
                    <small>
                      {completion[
                        subSection as keyof typeof completion
                      ].toLocaleString("en-US", { style: "percent" })}
                    </small>
                  </NavigationMenuLink>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </NavigationMenuItem>
    );
  }

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
        <div
          className={cn(
            "flex flex-row items-center justify-start gap-3",
            isSectionActive
              ? "[&>svg]:text-text-link"
              : "[&>svg]:text-text-gray"
          )}
        >
          {icon}
          <span>{label}</span>
        </div>
        {count}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
