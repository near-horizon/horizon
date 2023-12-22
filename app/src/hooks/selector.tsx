import { useEffect } from "react";
import {
  removeUser,
  setUser,
  setWalletSelector,
  setWalletSelectorModal,
  useGlobalStore,
} from "~/stores/global";
import { getUser, login, logout } from "~/lib/client/auth";

export function useWalletSelectorEffect() {
  useEffect(() => {
    import("../lib/selector")
      .then(async ({ setupSelector, setupModalSelector }) => {
        const selector = await setupSelector();
        setWalletSelector(selector);
        setWalletSelectorModal(setupModalSelector(selector));

        // Subscribe to the store changes
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.store.observable.subscribe(async (state) => {
          const account = state.accounts.at(0);
          // If no account is selected, clear the user
          if (!account) {
            removeUser();
            return;
          }

          // Check the current session by fetching from the server
          const user = await getUser();
          // If the user is already logged in, check if the account is the same
          if (user.loggedIn && user.accountId === account.accountId) {
            // If the account is the same, update the user
            setUser(user);
          } else {
            // If the account is different, log in with the new account
            await login({
              accountId: account.accountId,
              publicKey: account.publicKey!,
            });
            // Update the user from the new session
            const newUser = await getUser();
            setUser(newUser);
          }
        });

        // Listen to the signedIn event
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.on("signedIn", async ({ accounts: [account] }) => {
          // If there is an account, log in
          if (account) {
            try {
              await login({
                accountId: account.accountId,
                publicKey: account.publicKey!,
              });
              const user = await getUser();
              setUser(user);
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
            await logout();
            removeUser();
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
