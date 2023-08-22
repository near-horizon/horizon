import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { viewCall } from "~/lib/fetching";
import { type Contract } from "~/lib/contracts";
import { getTransactions } from "~/pages/api/transactions/all";
import {
  type ProposalId,
  proposalIdSchema,
  type Proposal,
  proposalSchema,
} from "~/lib/proposal";

export async function getProposal([[project_id, cid], vendor_id]: ProposalId) {
  const [contract, transactions] = await Promise.all([
    viewCall<Contract>(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "get_proposal", {
      project_id,
      vendor_id,
      cid,
    }),
    getTransactions(),
  ]);

  const creationTx = transactions.find((tx) => {
    return (
      tx.method_name === "add_proposal" &&
      (tx.args.proposal as Proposal).request_id[0] === project_id &&
      (tx.args.proposal as Proposal).request_id[1] === cid &&
      (tx.args.proposal as Proposal).vendor_id === vendor_id
    );
  });

  return proposalSchema.parse({ ...contract, creationTx });
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
      const proposal = await getProposal(id);
      res.status(200).json(proposal);
    }
  }
}
