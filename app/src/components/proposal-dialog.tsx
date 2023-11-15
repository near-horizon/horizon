import { Button } from "./ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { type ReactNode } from "react";
import { UserUp02Svg } from "~/icons";
import { ProposalForm } from "./proposal/form";
import { type AccountId, type CID } from "~/lib/validation/common";

export function ProposalDialog({
  accountId,
  cid,
  triggerText = (
    <span className="inline-flex flex-row items-center justify-between gap-2">
      <UserUp02Svg className="w-5" />
      Propose contribution
    </span>
  ),
  disabled = false,
}: {
  accountId: AccountId;
  cid: CID;
  triggerText?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <>
      <DialogTrigger asChild>
        <Button variant="default" disabled={disabled}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Propose contribution</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ProposalForm accountId={accountId} cid={cid} />
        </div>
      </DialogContent>
    </>
  );
}
