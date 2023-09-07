import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import {
  type ContractId,
  type Contract,
  contractSchema,
} from "~/lib/contracts";
import { getTransactions } from "~/pages/api/transactions/all";
import { proposalIdSchema } from "~/lib/proposal";

export async function getContract([[project_id, cid], vendor_id]: ContractId) {
  const [contract, transactions] = await Promise.all([
    viewCall<Contract>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_contribution",
      { project_id, vendor_id, cid }
    ),
    getTransactions(),
  ]);

  const creationTx = transactions.find((tx) => {
    return (
      tx.method_name === "add_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const acceptanceTx = transactions.find((tx) => {
    return (
      tx.method_name === "accept_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const rejectionTx = transactions.find((tx) => {
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
  const completionTx = transactions.find((tx) => {
    return (
      tx.method_name === "complete_contribution" &&
      tx.args.project_id === project_id &&
      tx.args.cid === cid &&
      tx.args.vendor_id === vendor_id
    );
  });
  const deliveryTx = transactions.find((tx) => {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    default: {
      const id = proposalIdSchema.parse([
        [req.query.projectId, req.query.cid],
        req.query.contributorId,
      ]);
      const contract = await getContract(id);
      res.status(200).json(contract);
    }
  }
}
