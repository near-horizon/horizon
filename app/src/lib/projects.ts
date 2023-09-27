import {
  type UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { intoURLSearchParams } from "~/lib/utils";
import { pageSize } from "~/lib/constants/pagination";
import {
  privateProjectSchema,
  type Project,
  projectSchema,
  type ProjectsQuery,
  type HorizonProject,
} from "./validation/projects";
import { useSignTx } from "~/stores/global";
import { type Profile, profileSchema } from "./validation/fetching";
import { useState } from "react";
import { type Progress } from "./mutating";
import { viewCall } from "./fetching";
import { env } from "~/env.mjs";

export async function getProjects(query: ProjectsQuery) {
  const result = await fetch("/api/projects?" + intoURLSearchParams(query));
  const projects = (await result.json()) as string[];
  return projects;
}

export async function getPaginatedProjects(pageParam = 0) {
  const result = await fetch(
    `/api/projects?limit=${pageSize}&from=` + pageParam * pageSize
  );
  const projects = (await result.json()) as string[];

  return {
    items: projects,
    next: pageParam + 1,
  };
}

export function useProjects(query: ProjectsQuery) {
  return useQuery({
    queryKey: ["projects", query],
    queryFn: () => getProjects(query),
    initialData: ["", "", ""],
  });
}

export function usePaginatedProjects() {
  return useInfiniteQuery({
    queryKey: ["projects-paginated"],
    queryFn: ({ pageParam }) => getPaginatedProjects(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export async function getSimilarProjects(accountId: AccountId) {
  const result = await fetch(`/api/projects/${accountId}/similar`);
  const projects = (await result.json()) as string[];
  return projects;
}

export function useSimilarProjects(accountId: AccountId) {
  return useQuery({
    queryKey: ["similar-projects", accountId],
    queryFn: () => getSimilarProjects(accountId),
    enabled: !!accountId,
  });
}

export async function getProject(accountId: AccountId) {
  const response = await fetch("/api/projects/" + accountId);

  return projectSchema.parse(await response.json());
}

export function useProject(accountId: AccountId) {
  return useQuery({
    queryKey: ["project", accountId],
    queryFn: () => getProject(accountId),
    enabled: !!accountId,
  });
}

export async function hasProject(accountId: AccountId) {
  try {
    await viewCall<HorizonProject>(
      env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
      "get_project",
      { account_id: accountId }
    );
    return true;
  } catch (e) {
    return false;
  }
}

export function useHasProject(accountId: AccountId) {
  return useQuery({
    queryKey: ["has-project", accountId],
    queryFn: () => hasProject(accountId),
    enabled: !!accountId,
  });
}

export function useCreateProject(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      profile: Profile;
      email: string;
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
        accountId,
        profile,
        email,
      }: {
        accountId: AccountId;
        profile: Profile;
        email: string;
      }) => {
        try {
          setProgress({ value: 25, label: "Registering project on-chain..." });
          await signTx("add_project", {
            account_id: accountId,
          });
        } catch (e) {
          setProgress({
            value: 25,
            label: "Failed to register project!",
          });
          throw new Error("Failed to create project");
        }
        setProgress({ value: 50, label: "Project registered!" });

        setProgress({ value: 75, label: "Saving off-chain details..." });
        const response = await fetch("/api/profile", {
          method: "POST",
          body: JSON.stringify({
            ...profile,
            email,
          }),
        });

        if (!response.ok) {
          setProgress({ value: 75, label: "Failed to save project data!" });
          throw new Error("Failed to edit project");
        }
        setProgress({ value: 100, label: "Off-chain details saved!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["project"] });
      },
    }),
  ];
}

export function useUpdateProject(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      project: Project;
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
        accountId,
        project,
      }: {
        accountId: AccountId;
        project: Project;
      }) => {
        const privateData = privateProjectSchema.parse(project);
        const projectData = projectSchema.parse(project);
        const profileData = profileSchema.strip().parse(project);

        if (Object.keys(projectData).length === 0) {
          setProgress({ value: 0, label: "Editing on-chain details..." });
          try {
            await signTx("edit_project", {
              account_id: accountId,
              project: projectData,
            });
          } catch (e) {
            setProgress({
              value: 0,
              label: "Failed to update on-chain project data!",
            });
            throw new Error("Failed to update project");
          }
          setProgress({ value: 33, label: "On-chain data saved!" });
        }

        if (Object.keys(privateData).length === 0) {
          setProgress({ value: 33, label: "Editing off-chain details..." });
          const response = await fetch("/api/projects/" + accountId, {
            method: "PUT",
            body: JSON.stringify(privateData),
          });

          if (!response.ok) {
            setProgress({ value: 33, label: "Failed to update project data!" });
            throw new Error("Failed to update project");
          }
          setProgress({ value: 66, label: "Off-chain data saved!" });
        }

        if (Object.keys(profileData).length === 0) {
          setProgress({ value: 66, label: "Editing profile..." });
          const response = await fetch("/api/profile", {
            method: "PUT",
            body: JSON.stringify(profileData),
          });

          if (!response.ok) {
            setProgress({ value: 66, label: "Failed to update profile data!" });
            throw new Error("Failed to update profile");
          }
          setProgress({ value: 100, label: "Profile saved!" });
        }
      },
      onSuccess: async (_, { accountId }) => {
        await queryClient.invalidateQueries(["project", accountId]);
      },
    }),
  ];
}
