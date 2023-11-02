// You may need the next line in some situations
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as IronSession from "iron-session";
import { type AccountId } from "./validation/common";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      accountId: AccountId;
      publicKey: string;
      admin?: boolean;
      hasProfile?: boolean;
    };
  }
}
