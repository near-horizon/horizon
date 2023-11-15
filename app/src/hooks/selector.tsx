import { type IronSession } from "iron-session";
import { useEffect } from "react";
import {
  setupModalSelector,
  setUser,
  setWalletSelector,
  setWalletSelectorModal,
  useGlobalStore,
} from "~/stores/global";
import { redirectOnboarding } from "~/lib/auth";

export function useWalletSelectorEffect() {
  useEffect(() => {
    import("../stores/global")
      .then(async ({ setupSelector }) => {
        const selector = await setupSelector();
        setWalletSelector(selector);
        setWalletSelectorModal(setupModalSelector(selector));

        // Subscribe to the store changes
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.store.observable.subscribe(async (state) => {
          const account = state.accounts.at(0);
          // If no account is selected, clear the user
          if (!account) {
            setUser(undefined);
            return;
          }

          // Check the current session
          const response = await fetch("/api/auth/user");
          const { user } = (await response.json()) as unknown as {
            user: IronSession["user"];
          };

          // If the user is already logged in, check if the account is the same
          if (user && user.accountId === account.accountId) {
            // If the account is the same, update the user
            setUser(user);
          } else {
            // If the account is different, log in with the new account
            await fetch("/api/auth/login", {
              method: "POST",
              body: JSON.stringify({
                accountId: account.accountId,
                publicKey: account.publicKey,
              }),
            });
            // Update the user from the new session
            const res = await fetch("/api/auth/user");
            const { user: newUser } = (await res.json()) as unknown as {
              user: IronSession["user"];
            };
            setUser(newUser);
            if (!newUser?.hasProfile) {
              redirectOnboarding();
            }
          }
        });

        // Listen to the signedIn event
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.on("signedIn", async ({ accounts: [account] }) => {
          // If there is an account, log in
          if (account) {
            try {
              await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({
                  accountId: account.accountId,
                  publicKey: account.publicKey,
                }),
              });
              const res = await fetch("/api/auth/user");
              const { user } = (await res.json()) as unknown as {
                user: IronSession["user"];
              };
              setUser(user);
              if (!user?.hasProfile) {
                redirectOnboarding();
              }
            } catch (e) {
              console.error(e);
            }
          }
        });

        // Listen to the signedOut event
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.on("signedOut", async () => {
          try {
            // Log out
            await fetch("/api/auth/logout", {
              method: "POST",
            });
            setUser(undefined);
          } catch (e) {
            console.error(e);
          }
        });
      })
      .catch(console.error);

    return () => {
      // Unsubscribe from the store changes
      useGlobalStore.getState().selector?.off("signedIn", console.log);
      useGlobalStore.getState().selector?.off("signedOut", console.log);
    };
  }, []);
}
