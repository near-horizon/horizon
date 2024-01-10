import { env } from "~/env.mjs";
import { viewCall } from "../client/fetching";
import {
  type Contract,
  type ContractId,
  contractSchema,
} from "../validation/contracts";
import { getTransactions } from "./transactions";

export async function getContract([[project_id, cid], vendor_id]: ContractId) {
  const [contract, transactions] = await Promise.all([
    viewCall<Contract>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_contribution",
      { project_id, vendor_id, cid },
    ),
    getTransactions({ entity_type: "contributions" }),
  ]);

  const creationTx = transactions.findLast((tx) => {
    return (
      tx.method_name === "add_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const acceptanceTx = transactions.findLast((tx) => {
    return (
      tx.method_name === "accept_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const rejectionTx = transactions.findLast((tx) => {
    return (
      tx.method_name === "reject_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const actionTxs = transactions.filter((tx) => {
    return (
      tx.method_name === "add_contribution_action" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const completionTx = transactions.findLast((tx) => {
    return (
      tx.method_name === "complete_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const deliveryTx = transactions.findLast((tx) => {
    return (
      tx.method_name === "deliver_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });

  return contractSchema.parse({
    ...contract,
    creationTx,
    acceptanceTx,
    rejectionTx,
    actionTxs,
    completionTx,
    deliveryTx,
  });
}
