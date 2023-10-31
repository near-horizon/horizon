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
      .then(({ setupSelector }) => {
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
                  const { user } = (await res.json()) as unknown as {
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
      })
      .catch(console.error);

    return () => {
      useGlobalStore.getState().selector?.off("signedIn", console.log);
    };
  }, []);
};
