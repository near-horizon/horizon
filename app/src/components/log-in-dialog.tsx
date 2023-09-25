import { useRouter } from "next/router";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { useWalletSelectorModal } from "~/stores/global";

export function LogInDialog({
  open,
  title,
  description,
}: {
  open: boolean;
  title: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(open);
  const modal = useWalletSelectorModal();
  const router = useRouter();

  if (typeof document === "undefined" || typeof window === "undefined") {
    return <></>;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              router.push("/").catch((e) => console.log(e));
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setIsOpen(false);
              modal?.show();
            }}
          >
            Log in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
