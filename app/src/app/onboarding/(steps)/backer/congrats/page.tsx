"use client";

import { useOnboarding } from "~/stores/global";

export default function BackerCongrats() {
  const onboarding = useOnboarding<"backer">();

  return <code>{JSON.stringify(onboarding, null, 2)}</code>;
}
