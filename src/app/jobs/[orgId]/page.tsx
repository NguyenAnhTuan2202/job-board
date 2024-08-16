import Jobs from "@/app/components/Jobs";
import addOrgAndUserData, { JobModel } from "@/models/Job";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import mongoose from "mongoose";
import { getUser } from "@workos-inc/authkit-nextjs";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGO_URI as string);

  let jobsDocs = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );

  jobsDocs = await addOrgAndUserData(jobsDocs, user);

  return (
    <div>
      <div className="container">
        <h1 className="text-xl my-6">{org.name} Jobs</h1>
        <Jobs jobs={jobsDocs} header={"Job posted by " + org.name} />
      </div>
    </div>
  );
}
