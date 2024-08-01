import { CLOUD_NAME, CLOUD_PRESET_NAME } from "@/app/constant";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const folderName = "job-board";
  formData.append("upload_preset", CLOUD_PRESET_NAME as string);
  formData.append("folder", folderName);
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const response = await axios.post(api, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return Response.json({
    newFileName: "Unique file name",
    url: response.data.secure_url,
  });
}
