import {
  type WalletSelector,
  setupWalletSelector,
} from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import {
  type WalletSelectorModal,
  setupModal,
} from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { type IronSession } from "iron-session";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { create } from "zustand";
import { env } from "~/env.mjs";

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

export const setupSelector = () => {
  // const domain = window.location.origin;
  // const path = encodeURIComponent(window.location.pathname);
  // const successUrl = `${domain}/api/auth/login?redirect=${path}`;
  // console.log("successUrl", successUrl);

  return setupWalletSelector({
    network: "mainnet",
    modules: [
      setupNearWallet(/* { successUrl } */),
      setupMyNearWallet(/* { successUrl } */),
      setupSender(),
      setupHereWallet(),
      setupMeteorWallet(),
      setupNeth({
        gas: "300000000000000",
        bundle: false,
      }),
      setupNightly(),
      setupWelldoneWallet(),
      // setupFastAuth({
      //   networkId:"mainnet",
      //   signInContractId,
      //   relayerUrl:
      //     networkId === 'testnet'
      //       ? 'http://34.70.226.83:3030/relay'
      //       : 'https://near-relayer-mainnet.api.pagoda.co/relay',
      // }) as any, // TODO: Refactor setupFastAuth() to TS
      // setupKeypom({
      //   trialBaseUrl:
      //      'https://near.org/#trial-url/',
      //   networkId: "mainnet",
      //   trialSplitDelim: '/',
      //   signInContractId,
      //   modalOptions: KEYPOM_OPTIONS(networkId),
      // }) as any, // TODO: Refactor setupKeypom() to TS
    ],
  });
};

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
  const router = useRouter();
  const selector = useWalletSelector();

  return React.useCallback(
    async <T = Element>(event: React.MouseEvent<T, MouseEvent>) => {
      event.preventDefault();
      try {
        const wallet = await selector?.wallet();
        await wallet?.signOut();
        router.reload();
      } catch (err) {
        console.error("Could not sign out:", err);
      }
    },
    [selector, router]
  );
}

export const setupModalSelector = (selector: WalletSelector) => {
  return setupModal(selector, {
    contractId: env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
  });
};

export const useWalletSelectorEffect = () => {
  useEffect(() => {
    setupSelector()
      .then((selector) => {
        setWalletSelector(selector);
        setWalletSelectorModal(setupModalSelector(selector));
        selector.store.observable.subscribe((state) => {
          const account = state.accounts.at(0);
          if (!account) {
            return;
          }

          fetch("/api/auth/user")
            .then(async (res) => {
              const user = (await res.json()) as unknown as IronSession["user"];

              if (user && user.accountId === account.accountId) {
                setUser(user);
              } else {
                await fetch("/api/auth/login", {
                  method: "POST",
                  body: JSON.stringify({
                    accountId: account.accountId,
                    publicKey: account.publicKey,
                  }),
                });
              }
            })
            .catch(console.error);
        });
        selector.on("signedIn", ({ accounts: [account] }) => {
          if (account) {
            fetch("/api/auth/login", {
              method: "POST",
              body: JSON.stringify({
                accountId: account.accountId,
                publicKey: account.publicKey,
              }),
            })
              .then(() => {
                console.log("logged in");
              })
              .catch(console.error);
          }
        });
        selector.on("signedOut", () => {
          fetch("/api/auth/logout", {
            method: "POST",
          })
            .then(() => {
              console.log("logged out");
            })
            .catch(console.error);
        });
      })
      .catch((err) => {
        console.error(`Could not setup wallet selector ${err}`);
      });

    return () => {
      useGlobalStore.getState().selector?.off("signedIn", console.log);
    };
  }, []);
};
