import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import { type AccountId } from "~/lib/validation/common";
import {
  getContract,
  getContributorCompletedContracts,
  getContributorContracts,
  getProjectCompletedContracts,
  getProjectContracts,
} from "~/lib/client/contracts";
import { type ContractId } from "~/lib/validation/contracts";
import { type Progress } from "~/lib/client/mutating";
import { type ProposalId } from "~/lib/validation/proposals";

export function useContributorContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "contributor", accountId],
    queryFn: ({ queryKey: [, , accountId] }) =>
      getContributorContracts(accountId!),
  });
}

export function useProjectContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "project", accountId],
    queryFn: ({ queryKey: [, , accountId] }) => getProjectContracts(accountId!),
  });
}

export function useContributorCompletedContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "contributor", accountId, "completed"],
    queryFn: ({ queryKey: [, , accountId] }) =>
      getContributorCompletedContracts(accountId!),
  });
}

export function useProjectCompletedContracts(accountId: AccountId) {
  return useQuery({
    queryKey: ["contracts", "project", accountId, "completed"],
    queryFn: ({ queryKey: [, , accountId] }) =>
      getProjectCompletedContracts(accountId!),
  });
}

export function useContract(id: ContractId) {
  return useQuery({
    queryKey: ["contract", id],
    queryFn: ({ queryKey: [, id] }) => getContract(id as ContractId),
  });
}

export function useCreateContract(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
      }: {
        proposal_id: ProposalId;
      }) => {
        try {
          setProgress({ value: 50, label: "Creating contract on-chian..." });
          await signTx("add_contribution", { project_id, vendor_id, cid });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to create contract!" });
          throw new Error("Failed to create contract!");
        }
        setProgress({ value: 100, label: "Contract created!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useDeclineProposal(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
      }: {
        proposal_id: ProposalId;
      }) => {
        try {
          setProgress({ value: 50, label: "Rejecting proposal on-chian..." });
          await signTx("reject_proposal", { project_id, vendor_id, cid });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to reject proposal!" });
          throw new Error("Failed to reject proposal!");
        }
        setProgress({ value: 100, label: "Proposal rejected!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["proposals"] });
      },
    }),
  ];
}

export function useAcceptContract(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
      }: {
        proposal_id: ProposalId;
      }) => {
        try {
          setProgress({ value: 50, label: "Accepting contract on-chian..." });
          await signTx("accept_contribution", { project_id, vendor_id, cid });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to accept contract!" });
          throw new Error("Failed to accept contract!");
        }
        setProgress({ value: 100, label: "Accept created!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useRejectContract(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
      }: {
        proposal_id: ProposalId;
      }) => {
        try {
          setProgress({ value: 50, label: "Rejecting contract on-chian..." });
          await signTx("reject_contribution", { project_id, vendor_id, cid });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to reject contract!" });
          throw new Error("Failed to reject contract!");
        }
        setProgress({ value: 100, label: "Contract rejected!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useAddContractEvent(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
      description: string;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
        description,
      }: {
        proposal_id: ProposalId;
        description: string;
      }) => {
        try {
          setProgress({
            value: 50,
            label: "Adding contract event on-chian...",
          });
          await signTx("add_contribution_action", {
            project_id,
            vendor_id,
            cid,
            description,
          });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to add contract event!" });
          throw new Error("Failed to add contract event!");
        }
        setProgress({ value: 100, label: "Contract event added!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useDeliverContract(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
      }: {
        proposal_id: ProposalId;
      }) => {
        try {
          setProgress({ value: 50, label: "Delivering contract on-chian..." });
          await signTx("deliver_contribution", { project_id, vendor_id, cid });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to deliver contract!" });
          throw new Error("Failed to deliver contract!");
        }
        setProgress({ value: 100, label: "Contract delivered!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useCompleteContract(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
      }: {
        proposal_id: ProposalId;
      }) => {
        try {
          setProgress({ value: 50, label: "Completing contract on-chian..." });
          await signTx("complete_contribution", { project_id, vendor_id, cid });
        } catch (e) {
          setProgress({ value: 50, label: "Failed to complete contract!" });
          throw new Error("Failed to complete contract!");
        }
        setProgress({ value: 100, label: "Contract completed!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useAddContractContributorFeedback(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
      feedback: string;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
        feedback,
      }: {
        proposal_id: ProposalId;
        feedback: string;
      }) => {
        try {
          setProgress({
            value: 50,
            label: "Adding contract contributor feedback on-chian...",
          });
          await signTx("give_vendor_feedback", {
            project_id,
            vendor_id,
            cid,
            feedback,
          });
        } catch (e) {
          setProgress({
            value: 50,
            label: "Failed to add contract contributor feedback!",
          });
          throw new Error("Failed to add contract contributor feedback!");
        }
        setProgress({
          value: 100,
          label: "Contract contributor feedback added!",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}

export function useAddContractProjectFeedback(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      proposal_id: ProposalId;
      feedback: string;
    },
    unknown
  >
] {
  const signTx = useSignTx();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        proposal_id: [[project_id, cid], vendor_id],
        feedback,
      }: {
        proposal_id: ProposalId;
        feedback: string;
      }) => {
        try {
          setProgress({
            value: 50,
            label: "Adding contract project feedback on-chian...",
          });
          await signTx("give_project_feedback", {
            project_id,
            vendor_id,
            cid,
            feedback,
          });
        } catch (e) {
          setProgress({
            value: 50,
            label: "Failed to add contract project feedback!",
          });
          throw new Error("Failed to add contract project feedback!");
        }
        setProgress({ value: 100, label: "Contract project feedback added!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      },
    }),
  ];
}
