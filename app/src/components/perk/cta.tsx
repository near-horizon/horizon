import { type Perk } from "~/lib/validation/perks";
import { Button } from "../ui/button";
import LockIcon from "../icons/lock-01.svg";
import { ProgressDialog } from "../progress-dialog";
import { useUnlockPerk } from "~/hooks/perks";

export function CTA({
  id,
  url,
  claimed,
  requirements,
  fields: { price },
}: Perk) {
  const [progress, unlockPerk] = useUnlockPerk();

  if (claimed) {
    return (
      <Button
        variant="default"
        className="flex w-full items-stretch justify-stretch"
      >
        <a href={url} className="flex w-full items-center justify-center">
          Claim perk
        </a>
      </Button>
    );
  }

  const requirementsMet = requirements?.every(({ completed }) => completed);

  if (requirementsMet) {
    return (
      <ProgressDialog
        className="w-full border-background-black-2 bg-background-black-2 text-text-white"
        progress={progress.value}
        title="Unlocking perk"
        description={progress.label}
        onClick={() => unlockPerk.mutate({ id })}
        ctaText="Close dialog"
        ctaLink="#"
        triggerText={
          <>
            <LockIcon className="mr-2 h-4 w-4" />
            Unock perk
            {price > 0 && (
              <>
                {" "}
                for <b className="ml-1">{price} NHZN</b>
              </>
            )}
          </>
        }
      />
    );
  }

  return (
    <Button variant="ghost" disabled className="w-full">
      Eligibility criteria not met
    </Button>
  );
}
