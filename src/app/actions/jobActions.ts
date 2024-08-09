"use server";

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(data: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const { id, ...rest } = Object.fromEntries(data);
  const jobDoc = id
    ? await JobModel.findByIdAndUpdate(id, rest)
    : await JobModel.create(rest);
  if ("orgId" in rest) {
    revalidatePath("jobs" + rest.orgId);
  }
  return JSON.parse(JSON.stringify(jobDoc));
}
