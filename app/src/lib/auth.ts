import { type IronSession } from "iron-session";
import { getKeyInfo, viewCall } from "./fetching";
import { env } from "~/env.mjs";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { ironSessionConfig } from "./constants/iron-session";
import {
  type NextApiHandler,
  type GetServerSidePropsContext,
  type GetServerSidePropsResult,
} from "next";
import { type AccountId } from "./validation/common";
// import { sleep } from "./utils";

export async function loginUser(
  accountId: AccountId,
  publicKey: string
): Promise<IronSession["user"]> {
  // Wait for chain to update key info
  // await sleep(1500);

  // const isKeyValid = await getKeyInfo(accountId, publicKey);
  // if (!isKeyValid) {
  //   throw new Error("Key is not valid");
  // }

  const admin = await viewCall<boolean>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "check_is_owner",
    { account_id: accountId }
  );

  return {
    accountId,
    publicKey,
    admin,
  };
}

export function withSSRSession<Props>(
  ssrFunction: (
    context: GetServerSidePropsContext,
    user: IronSession["user"] | null
  ) => Promise<GetServerSidePropsResult<Props>>
) {
  return withIronSessionSsr(async function(context) {
    const user = context.req.session.user ?? null;

    const result = await ssrFunction(context, user);

    return {
      ...result,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      props: {
        user,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...result.props,
      },
    };
  }, ironSessionConfig);
}

export function withAPISession<T>(apiHandler: NextApiHandler<T>) {
  return withIronSessionApiRoute(apiHandler, ironSessionConfig);
}
