import { getIronSession } from "iron-session";
import { type NextRequest, NextResponse } from "next/server";
import { loginUser } from "~/lib/auth";
import { ironSessionConfig } from "~/lib/constants/iron-session";
import { getUserFromSession } from "~/lib/session";
import { type User } from "~/lib/validation/user";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/onboarding") {
    return handleOnboarding(request);
  }

  return NextResponse.next();
}

async function handleOnboarding(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const account_id = searchParams.get("account_id");
  const public_key = searchParams.get("public_key");
  const all_keys = searchParams.get("all_keys");

  const user = await getUserFromSession();

  // If the user is not logged in and there is no account_id or public_key in the url then redirect to login
  if (!user.loggedIn && (!account_id || !public_key)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is logged in and has a profile then redirect to home
  if (user.loggedIn && user.hasProfile) {
    const homePageRedirect = new URL("/", request.url);
    homePageRedirect.searchParams.set("account_id", account_id!);
    homePageRedirect.searchParams.set("public_key", public_key!);
    homePageRedirect.searchParams.set("all_keys", all_keys!);

    return NextResponse.redirect(homePageRedirect);
  }

  // If the user is logged in and has no profile then update the session
  const session = await getIronSession<User>(
    request,
    NextResponse.next(),
    ironSessionConfig,
  );
  const logedInUser = await loginUser(account_id!, public_key!);

  session.loggedIn = true;

  // Type guard
  if (!session.loggedIn || !logedInUser.loggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  session.accountId = logedInUser.accountId;
  session.publicKey = logedInUser.publicKey;
  session.admin = logedInUser.admin;

  // Type guard
  if (logedInUser.hasProfile) {
    (session.hasProfile = true) &&
      (session.profileType = logedInUser.profileType);
  }

  await session.save();

  // If the new user has a profile then redirect to home
  if (logedInUser.hasProfile) {
    const homePageRedirect = new URL("/", request.url);
    homePageRedirect.searchParams.set("account_id", account_id!);
    homePageRedirect.searchParams.set("public_key", public_key!);
    homePageRedirect.searchParams.set("all_keys", all_keys!);

    return NextResponse.redirect(homePageRedirect);
  }

  return NextResponse.next();
}
