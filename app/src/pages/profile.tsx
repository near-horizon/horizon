import { Button } from "~/components/ui/button";
import { withSSRSession } from "~/lib/auth";
import { useChanges, useHasChanges } from "~/lib/profile";
import { useSocialSet } from "~/lib/social";
import { useUser } from "~/stores/global";

export default function Profile() {
  const user = useUser();
  const { data: changes } = useChanges();
  const hasChanges = useHasChanges(user!.accountId);
  const [, socialSet] = useSocialSet();

  return (
    <div>
      <div>Profile</div>
      {hasChanges && changes && (
        <Button
          variant="default"
          onClick={() => {
            socialSet.mutate({ accountId: user!.accountId, profile: changes });
          }}
        >
          Save changes
        </Button>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withSSRSession(async function() {
  return { props: {} };
});
