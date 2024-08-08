import { Job } from "@/models/Job";
import JobRow from "./JobRow";

export default function Jobs({
  header,
  jobs,
}: {
  header: string;
  jobs: Job[];
}) {
  return (
    <div className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">{header || "Recent jobs"}</h2>
        <div className="flex flex-col gap-4">
          {(!jobs || jobs.length === 0) && <div>No jobs found</div>}
          {jobs &&
            jobs.length > 0 &&
            jobs.map((job, index) => {
              return (
                <>
                  <div key={index}>
                    <JobRow job={job} />
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
