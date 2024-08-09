import { getUser } from "@workos-inc/authkit-nextjs";
import {
  NoUserInfo,
  UserInfo,
} from "@workos-inc/authkit-nextjs/dist/cjs/interfaces";
import { WorkOS } from "@workos-inc/node";
import JobForm from "@/app/components/JobForm";

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

  return <JobForm orgId={orgId} />;
}
