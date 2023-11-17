import {
  useInfiniteQuery,
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type AccountId } from "~/lib/validation/common";
import { pageSize } from "~/lib/constants/pagination";
import { useSignTx } from "~/stores/global";
import { useState } from "react";
import {
  type BackersDigest,
  privateProjectSchema,
  type Project,
  projectSchema,
  type ProjectsQuery,
} from "~/lib/validation/projects";
import {
  getBackerPaginatedProjects,
  getPaginatedProjects,
  getProject,
  getProjectBackersDigest,
  getProjectCompletion,
  getProjects,
  getProjectsCount,
  hasProject,
  updateProjectBackersDigest,
} from "~/lib/client/projects";
import { type Progress } from "~/lib/client/mutating";
import { type Profile, profileSchema } from "~/lib/validation/fetching";

export function useProjects(query: ProjectsQuery) {
  return useQuery({
    queryKey: ["projects", query],
    queryFn: ({ queryKey: [, query] }) => getProjects(query as ProjectsQuery),
  });
}

export function useProjectsCount(query: ProjectsQuery) {
  return useQuery({
    queryKey: ["projects-count", query],
    queryFn: ({ queryKey: [, query] }) =>
      getProjectsCount(query as ProjectsQuery),
  });
}

export function usePaginatedProjects(query?: ProjectsQuery) {
  return useInfiniteQuery({
    queryKey: ["projects-paginated", query],
    queryFn: ({ pageParam, queryKey: [, query] }) =>
      getPaginatedProjects(pageParam as number, query as ProjectsQuery),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export function useBackerPaginatedProjects() {
  return useInfiniteQuery({
    queryKey: ["backer-projects-paginated"],
    queryFn: ({ pageParam }) => getBackerPaginatedProjects(pageParam as number),
    getNextPageParam: (lastPage, _pageParam) =>
      lastPage.items.length < pageSize ? undefined : lastPage.next,
  });
}

export function useProject(accountId: AccountId) {
  return useQuery({
    queryKey: ["project", accountId],
    queryFn: ({ queryKey: [, accountId] }) => getProject(accountId!),
    enabled: !!accountId,
  });
}

export function useProjectCompletion(accountId: AccountId) {
  return useQuery({
    queryKey: ["project-completion", accountId],
    queryFn: ({ queryKey: [, accountId] }) => getProjectCompletion(accountId!),
    enabled: !!accountId,
  });
}

export function useHasProject(accountId: AccountId) {
  return useQuery({
    queryKey: ["has-project", accountId],
    queryFn: ({ queryKey: [, accountId] }) => hasProject(accountId!),
    enabled: !!accountId,
  });
}

export function useBackersDigest(accountId: AccountId) {
  return useQuery({
    queryKey: ["backers-digest", accountId],
    queryFn: ({ queryKey: [, accountId] }) =>
      getProjectBackersDigest(accountId!),
  });
}

export function useUpdateBackersDigest(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
      digest: BackersDigest;
    },
    unknown
  >
] {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({
        accountId,
        digest,
      }: {
        accountId: AccountId;
        digest: BackersDigest;
      }) => {
        try {
          setProgress({ value: 50, label: "Updating digest..." });
          await updateProjectBackersDigest(accountId, digest);
        } catch (e) {
          setProgress({
            value: 50,
            label: "Failed to update digest!",
          });
          throw new Error("Failed to update digest!");
        }
        setProgress({
          value: 100,
          label: "Succesfully updated backers digest!",
        });
      },
      onSuccess: async (_, { accountId }) => {
        await queryClient.invalidateQueries({
          queryKey: ["backers-digest", accountId],
        });
      },
    }),
  ];
}

export function usePublishBackersDigest(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      accountId: AccountId;
    },
    unknown
  >
] {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({ accountId }: { accountId: AccountId }) => {
        try {
          setProgress({ value: 50, label: "Publishing digest..." });
          const digest = await getProjectBackersDigest(accountId);
          digest.published = true;
          await updateProjectBackersDigest(accountId, digest);
        } catch (e) {
          setProgress({
            value: 50,
            label: "Failed to publish digest!",
          });
          throw new Error("Failed to publish digest!");
        }
        setProgress({
          value: 100,
          label: "Succesfully published backers digest!",
        });
      },
      onSuccess: async (_, { accountId }) => {
        await queryClient.invalidateQueries({
          queryKey: ["backers-digest", accountId],
        });
      },
    }),
  ];
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
      project: Partial<Project>;
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
        project: Partial<Project>;
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
