import { z } from "zod";
import { perkSchema } from "./validation/perks";
import {
  type UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type Progress } from "./mutating";
import { useState } from "react";

export async function getPerks() {
  const response = await fetch("/api/perks");
  const perks = z.array(perkSchema).parse(await response.json());
  return perks;
}

export function usePerks() {
  return useQuery({
    queryKey: ["perks"],
    queryFn: getPerks,
    initialData: [],
  });
}

export function usePerkCategories() {
  const { data: perks } = usePerks();
  return perks.reduce((categories, perk) => {
    const newCategories = perk.fields.category.filter((category) => {
      return !categories.includes(category);
    });
    categories.push(...newCategories);
    return categories;
  }, new Array<string>());
}

export function useUnlockPerk(): [
  progress: Progress,
  mutation: UseMutationResult<
    void,
    unknown,
    {
      id: string;
    },
    unknown
  >
] {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<Progress>({ value: 0, label: "" });

  return [
    progress,
    useMutation({
      mutationFn: async ({ id }: { id: string }) => {
        try {
          setProgress({ value: 50, label: "Unlocking perk..." });
          const result = await fetch(`/api/perks/${id}`, {
            method: "POST",
          });
          if (!result.ok) {
            setProgress({ value: 50, label: "Failed to unlock perk!" });
            throw new Error("Failed to unlock perk!");
          }
        } catch (e) {
          setProgress({ value: 50, label: "Failed to unlock perk!" });
          throw new Error("Failed to unlock perk!");
        }
        setProgress({ value: 100, label: "Unlocked perk!" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["perks"] });
        await queryClient.fetchQuery({
          queryKey: ["perks"],
          queryFn: getPerks,
        });
      },
    }),
  ];
}
