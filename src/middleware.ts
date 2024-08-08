import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = {
  matcher: [
    "/",
    "/new-listing",
    "/new-listing/:path*",
    "/new-company",
    "/jobs/:orgId*",
  ],
};
