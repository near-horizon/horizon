import { env } from "~/env.mjs";
import {
  type AccountId,
  transactionsSchema,
  type Transaction,
} from "./validation/common";
import { type IncentiveType } from "./validation/incentives";

const CREDIT_METHODS = [
  "add_credits",
  "remove_credits",
  "spend_credits",
  "add_incentive",
];

export async function getCreditHistory(accountId: AccountId) {
  const response = await fetch(`${env.API_URL}/transactions/all`);
  const data = transactionsSchema.parse(await response.json());
  return data.filter(({ args, method_name }) => {
    if (args.amount) console.log(args.amount);
    return (
      CREDIT_METHODS.includes(method_name) &&
      args.account_id === accountId &&
      args.amount !== 0
    );
  });
}

export function creditTxToText({
  method_name,
  args,
  signer_id,
}: Transaction): string {
  const { note, incentive } = args as {
    note: string;
    incentive: IncentiveType;
  };
  switch (method_name) {
    case "add_credits":
      return `Recieved credits from ${signer_id}${note ? ` (${note})` : ""}`;
    case "remove_credits":
      return `Removed credits by ${signer_id}${note ? ` (${note})` : ""}`;
    case "spend_credits":
      return `Spent credits by ${signer_id}${note ? ` (${note})` : ""}`;
    case "add_incentive":
      return `Rewarded credits for ${incentive}${note ? ` (${note})` : ""}}`;
    default:
      return "";
  }
}

export function creditTxToAmount({ method_name, args }: Transaction): string {
  const { amount } = args as { amount: number };
  switch (method_name) {
    case "add_credits":
      return `+${amount}`;
    case "remove_credits":
      return `-${amount}`;
    case "spend_credits":
      return `-${amount}`;
    case "add_incentive":
      return `+${amount}`;
    default:
      return "";
  }
}
