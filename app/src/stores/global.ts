import {
  type Transaction,
  type WalletSelector,
} from "@near-wallet-selector/core";
import { type WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout } from "~/lib/client/auth";
import { DEFAULT_USER, type User } from "~/lib/validation/user";
import { useStore } from "~/hooks/store";
import { type imageSchema } from "~/lib/validation/common";
import { z } from "zod";
import { useCallback } from "react";

interface GlobalStore {
  selector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  user: User;
  onboarding: OnboardingState;
}

type BackerOnboarding = {
  type: "backer";
  step: number;
  logo?: z.infer<typeof imageSchema>;
  name?: string;
  email?: {
    address: string;
    verified: boolean;
  };
};

type ProjectOnboarding = {
  type: "project";
  step: number;
  vertical?: string;
  tagline?: string;
  description?: string;
  logo?: z.infer<typeof imageSchema>;
  name?: string;
  email?: {
    address: string;
    verified: boolean;
  };
};

type ContributorOnboarding = {
  type: "contributor";
  step: number;
  expertise?: string;
  individual?: boolean;
  tagline?: string;
  description?: string;
  logo?: z.infer<typeof imageSchema>;
  name?: string;
  email?: {
    address: string;
    verified: boolean;
  };
};

type EmptyOnboarding = {
  type: "none";
  step: 1;
};

type OnboardingState =
  | BackerOnboarding
  | ProjectOnboarding
  | ContributorOnboarding
  | EmptyOnboarding;

const onboardingType = z.enum(["project", "contributor", "backer", "none"]);

export type OnboardingType = z.infer<typeof onboardingType>;

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (_set, _get) => ({
      selector: null,
      modal: null,
      user: DEFAULT_USER,
      onboarding: {
        type: "none",
        step: 1,
      },
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({ onboarding: state.onboarding }),
    },
  ),
);

export function setBackerOnboarding(onboarding: Partial<BackerOnboarding>) {
  useGlobalStore.setState((state) => ({
    onboarding: {
      ...(state.onboarding as BackerOnboarding),
      ...onboarding,
    },
  }));
}

export function setProjectOnboarding(onboarding: Partial<ProjectOnboarding>) {
  useGlobalStore.setState((state) => ({
    onboarding: { ...(state.onboarding as ProjectOnboarding), ...onboarding },
  }));
}

export function setContributorOnboarding(
  onboarding: Partial<ContributorOnboarding>,
) {
  useGlobalStore.setState((state) => ({
    onboarding: {
      ...(state.onboarding as ContributorOnboarding),
      ...onboarding,
    },
  }));
}

export function completeOnboarding() {
  useGlobalStore.setState({ onboarding: { type: "none", step: 1 } });
}

export function startOnboarding(type: Exclude<OnboardingType, "none">) {
  useGlobalStore.setState({ onboarding: { type, step: 2 } });
}

export function useOnboarding<Type extends OnboardingType = "none">() {
  type Onboarding = Type extends "project"
    ? ProjectOnboarding
    : Type extends "contributor"
      ? ContributorOnboarding
      : Type extends "backer"
        ? BackerOnboarding
        : OnboardingState;

  return useStore<GlobalStore, Onboarding>(
    useGlobalStore,
    (state) => state.onboarding as Onboarding,
  );
}

export const setUser = (user: User) => useGlobalStore.setState({ user });

export const removeUser = () => useGlobalStore.setState({ user: DEFAULT_USER });

export const useUser = () => useGlobalStore((state) => state.user);

export const setWalletSelector = (selector: WalletSelector) =>
  useGlobalStore.setState({ selector });

export const useWalletSelector = () =>
  useGlobalStore((state) => state.selector);

export const setWalletSelectorModal = (modal: WalletSelectorModal) =>
  useGlobalStore.setState({ modal });

export const useWalletSelectorModal = () =>
  useGlobalStore((state) => state.modal);

export const useAccountId = () =>
  useGlobalStore(
    (state) => state.selector?.store.getState().accounts[0]?.accountId,
  );

export function useSignIn() {
  const modal = useWalletSelectorModal();

  return useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      modal?.show();
    },
    [modal],
  );
}

export function useSignOut() {
  const selector = useWalletSelector();
  const router = useRouter();

  return useCallback(
    async <T = Element>(event: React.MouseEvent<T, MouseEvent>) => {
      event.preventDefault();
      try {
        const wallet = await selector?.wallet();
        await wallet?.signOut();
        await logout();
        removeUser();
        router.refresh();
      } catch (err) {
        console.error("Could not sign out:", err);
      }
    },
    [selector, router],
  );
}

export const GAS = "300000000000000";

export function useSignTx() {
  const selector = useWalletSelector();

  return useCallback(
    async (methodName: string, args: object) => {
      try {
        const wallet = await selector?.wallet();
        await wallet?.signAndSendTransaction({
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName,
                args,
                gas: GAS,
                deposit: "0",
              },
            },
          ],
        });
      } catch (err) {
        console.error("Could not sign tx:", err);
      }
    },
    [selector],
  );
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function useSignTxs() {
  const selector = useWalletSelector();

  return useCallback(
    async (transactions: Optional<Transaction, "signerId">[]) => {
      try {
        const wallet = await selector?.wallet();
        await wallet?.signAndSendTransactions({ transactions });
      } catch (err) {
        console.error("Could not sign txs:", err);
      }
    },
    [selector],
  );
}
