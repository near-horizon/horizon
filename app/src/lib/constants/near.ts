import { type connect } from "near-api-js";

export const NEAR_RPC_URL = "https://rpc.mainnet.near.org";

type ConnectConfig = Parameters<typeof connect>[0];

export function generateConnectionConfig(
  keyStore: ConnectConfig["keyStore"],
): ConnectConfig {
  return {
    networkId: "mainnet",
    nodeUrl: NEAR_RPC_URL,
    keyStore,
  };
}
