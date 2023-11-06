import { env } from "~/env.mjs";
import { viewCall } from "../fetching";
import { type Contract } from "../validation/contracts";
import {
  type Proposal,
  type ProposalId,
  proposalSchema,
} from "../validation/proposals";
import { getTransactions } from "./transactions";

export async function getProposal([[project_id, cid], vendor_id]: ProposalId) {
  const [contract, transactions] = await Promise.all([
    viewCall<Contract>(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "get_proposal", {
      project_id,
      vendor_id,
      cid,
    }),
    getTransactions({ entity_type: "proposals" }),
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
