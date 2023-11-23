import {
  type Transaction,
  type WalletSelector,
} from "@near-wallet-selector/core";
import { type WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { type IronSession } from "iron-session";
import { useRouter } from "next/navigation";
import React from "react";
import { create } from "zustand";
import { logout } from "~/lib/client/auth";

interface GlobalStore {
  selector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  user: IronSession["user"];
}

export const useGlobalStore = create<GlobalStore>()(() => ({
  selector: null,
  modal: null,
  user: undefined,
}));

export const setUser = (user: IronSession["user"]) =>
  useGlobalStore.setState({ user });

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
    (state) => state.selector?.store.getState().accounts[0]?.accountId
  );

export function useSignIn() {
  const modal = useWalletSelectorModal();

  return React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      modal?.show();
    },
    [modal]
  );
}

export function useSignOut() {
  const selector = useWalletSelector();
  const router = useRouter();

  return React.useCallback(
    async <T = Element>(event: React.MouseEvent<T, MouseEvent>) => {
      event.preventDefault();
      try {
        const wallet = await selector?.wallet();
        await wallet?.signOut();
        await logout();
        setUser(undefined);
        router.refresh();
      } catch (err) {
        console.error("Could not sign out:", err);
      }
    },
    [selector, router]
  );
}

export const GAS = "300000000000000";

export function useSignTx() {
  const selector = useWalletSelector();

  return React.useCallback(
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
    [selector]
  );
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function useSignTxs() {
  const selector = useWalletSelector();

  return React.useCallback(
    async (transactions: Optional<Transaction, "signerId">[]) => {
      try {
        const wallet = await selector?.wallet();
        await wallet?.signAndSendTransactions({ transactions });
      } catch (err) {
        console.error("Could not sign txs:", err);
      }
    },
    [selector]
  );
}
