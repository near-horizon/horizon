import {
  setupWalletSelector,
  type WalletSelector,
} from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { env } from "~/env.mjs";

export const setupSelector = () => {
  return setupWalletSelector({
    network: "mainnet",
    modules: [
      setupNearWallet({
        successUrl: `${window.location.protocol}//${window.location.host}/onboarding`,
      }),
      setupMyNearWallet({
        successUrl: `${window.location.protocol}//${window.location.host}/onboarding`,
      }),
      setupSender(),
      setupHereWallet(),
      setupMeteorWallet(),
      setupNeth({
        gas: "300000000000000",
        bundle: false,
      }),
      setupNightly(),
      setupWelldoneWallet(),
    ],
  });
};

export const setupModalSelector = (selector: WalletSelector) => {
  return setupModal(selector, {
    contractId: env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
  });
};
