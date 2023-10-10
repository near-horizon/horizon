import { z } from "zod";

export const incentiveTypeSchema = z.enum([
  "AdditionOfTeamMember",
  "ProposalSubmission",
  "QuestionAnswer",
  "ReferalToPlatform",
  "FirstProposalAcceptance",
  "ContractCompletion",
  "ProfileCompletionHalf",
  "ProfileCompletion",
]);

export type IncentiveType = z.infer<typeof incentiveTypeSchema>;

export const incentiveRepeatSchema = z.enum(["Once", "Infinite"]);

export type IncentiveRepeat = z.infer<typeof incentiveRepeatSchema>;

export const incentiveSchema = z.record(
  incentiveTypeSchema,
  z.tuple([incentiveRepeatSchema, z.number()])
);

export type Incentives = z.infer<typeof incentiveSchema>;
