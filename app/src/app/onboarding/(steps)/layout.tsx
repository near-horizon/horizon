"use client";

import Link from "next/link";
import { Icon } from "~/components/icon";
import { Badge } from "~/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";
import { ChevronDownDoubleSvg, ChevronUpDoubleSvg, Edit02Svg } from "~/icons";
import { STRING } from "~/lib/format";
import { cn } from "~/lib/utils";
import { useOnboarding } from "~/stores/global";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative hidden h-full grid-cols-12 md:grid">
        <div className="col-span-3">
          <DesktopSidebar />
        </div>

        <div className="col-span-9">{children}</div>
      </div>

      <div className="relative flex h-full flex-col items-center justify-between md:hidden">
        <div className="w-full">{children}</div>

        <MobileDrawer />
      </div>
    </>
  );
}

function DesktopSidebar() {
  const onboarding = useOnboarding();

  if (!onboarding || onboarding.type === "none") {
    return (
      <aside className="flex h-full w-full flex-col items-start justify-start gap-6 border-r border-accent-disabled p-12 pb-8 pr-6">
        <h2 className="text-xl font-bold text-ui-elements-black">
          Profile summary:
        </h2>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-full flex-col items-start justify-start gap-5 border-r border-accent-disabled p-12 pb-8 pr-6">
      <h2 className="text-xl font-bold text-ui-elements-black">
        Profile summary:
      </h2>

      <ProfileItem label="Profile" href="/onboarding">
        <p className="text-sm">{STRING.capitalize(onboarding.type)}</p>
      </ProfileItem>

      <ProfileItem
        label="Public name"
        href={`/onboarding/${onboarding.type}`}
        show={onboarding.step > 2 && !!onboarding.name}
      >
        <p className="text-sm">{STRING.capitalize(onboarding.name!)}</p>
      </ProfileItem>

      <ProfileItem
        label="Logo"
        href={`/onboarding/${onboarding.type}/logo`}
        show={onboarding.step > 3 && !!onboarding.name}
      >
        <Icon
          className="h-12 w-12"
          image={onboarding.logo}
          name={onboarding.name!}
        />
      </ProfileItem>

      <ProfileItem
        label="Email"
        href={`/onboarding/${onboarding.type}/email`}
        show={
          onboarding.step > 4 &&
          !!onboarding.email &&
          !!onboarding.email.address
        }
      >
        <p className="text-sm">
          {onboarding.email?.address}{" "}
          {!onboarding.email?.verified && (
            <Badge variant="destructive">Unverified</Badge>
          )}
        </p>
      </ProfileItem>
    </aside>
  );
}

function ProfileItem({
  label,
  href,
  children,
  show = true,
}: {
  label: string;
  href: string;
  show?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "hidden w-full flex-col items-start justify-start gap-2",
        show && "flex",
      )}
    >
      <span className="flex flex-row items-center justify-start gap-3">
        <Label className="text-sm font-bold text-ui-elements-dark">
          {label}
        </Label>
        <Link href={href}>
          <Edit02Svg className="h-4 w-4 text-ui-elements-gray" />
        </Link>
      </span>

      {children}
    </div>
  );
}

function MobileDrawer() {
  const onboarding = useOnboarding();

  if (!onboarding || onboarding.type === "none") {
    return (
      <Drawer>
        <DrawerTrigger className="flex w-full flex-row items-center justify-between gap-2">
          Profile summary: <ChevronUpDoubleSvg className="h-5 w-5" />
        </DrawerTrigger>

        <DrawerContent className="h-full">
          <DrawerHeader>
            <DrawerClose>
              <DrawerTitle className="flex flex-row items-center justify-between">
                Profile summary: <ChevronDownDoubleSvg className="h-5 w-5" />
              </DrawerTitle>
            </DrawerClose>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className="flex w-full flex-row items-center justify-between gap-2">
        Profile summary: <ChevronUpDoubleSvg className="h-5 w-5" />
      </DrawerTrigger>

      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerClose>
            <DrawerTitle className="flex flex-row items-center justify-between">
              Profile summary: <ChevronDownDoubleSvg className="h-5 w-5" />
            </DrawerTitle>
          </DrawerClose>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
