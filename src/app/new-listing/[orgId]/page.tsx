import { getUser } from "@workos-inc/authkit-nextjs";
import {
  NoUserInfo,
  UserInfo,
} from "@workos-inc/authkit-nextjs/dist/cjs/interfaces";
import { WorkOS } from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListTingForOrgPage(props: PageProps) {
  const user: UserInfo | NoUserInfo | any = await getUser();
  if (!user) {
    return "Please log in!";
  }
  const { params } = props;
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const orgId = params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });

  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return "No access";
  }

  return (
    <form action="" className="container mt-6">
      <input
        type="text"
        className="border p-2"
        placeholder="Job title"
        name=""
        id=""
      />
    </form>
  );
}
