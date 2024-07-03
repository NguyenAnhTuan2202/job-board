import Link from "next/link";
import { getUser, signOut, getSignInUrl } from "@workos-inc/authkit-nextjs";

export default async function Header() {
  const { user } = await getUser();

  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container flex items-center justify-between my-4">
        <Link className="font-bold text-xl" href={"/"}>
          Job Board
        </Link>
        <nav className="flex gap-2 *:py-2 *:px-4 *:rounded-md">
          {!user && (
            <Link className="bg-gray-200" href={signInUrl}>
              Login
            </Link>
          )}

          {user && (
            <form
              className="bg-gray-200"
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Log out</button>
            </form>
          )}
          <Link className="bg-blue-600 text-white" href={"/new-listing"}>
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}
