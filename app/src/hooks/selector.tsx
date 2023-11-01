import { type IronSession } from "iron-session";
import { useEffect } from "react";
import {
  setupModalSelector,
  setUser,
  setWalletSelector,
  setWalletSelectorModal,
  useGlobalStore,
} from "~/stores/global";

export const useWalletSelectorEffect = () => {
  useEffect(() => {
    import("../stores/global")
      .then(async ({ setupSelector }) => {
        const selector = await setupSelector();
        setWalletSelector(selector);
        setWalletSelectorModal(setupModalSelector(selector));

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.store.observable.subscribe(async (state) => {
          const account = state.accounts.at(0);
          if (!account) {
            setUser(undefined);
            return;
          }

          const response = await fetch("/api/auth/user");
          const { user } = (await response.json()) as unknown as {
            user: IronSession["user"];
          };

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
            const res = await fetch("/api/auth/user");
            const { user: newUser } = (await res.json()) as unknown as {
              user: IronSession["user"];
            };
            setUser(newUser);
          }
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.on("signedIn", async ({ accounts: [account] }) => {
          if (account) {
            try {
              await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({
                  accountId: account.accountId,
                  publicKey: account.publicKey,
                }),
              });
            } catch (e) {
              console.error(e);
            }
          }
        });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        selector.on("signedOut", async () => {
          try {
            await fetch("/api/auth/logout", {
              method: "POST",
            });
          } catch (e) {
            console.error(e);
          }
        });
      })
      .catch(console.error);

    return () => {
      useGlobalStore.getState().selector?.off("signedIn", console.log);
      useGlobalStore.getState().selector?.off("signedOut", console.log);
    };
  }, []);
};
