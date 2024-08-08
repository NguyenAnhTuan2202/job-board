"use client";

import { Job } from "@/models/Job";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "react-timeago";

export default function JobRow({ job }: { job: Job }) {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm relative">
        <div className="absolute top-4 right-4 cursor-pointer">
          <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
        </div>
        <div className="grow flex gap-4">
          <div className="content-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify"
              className="size-12"
            />
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div className="text-gray-500 text-sm">{job.orgName}</div>
              <div className="font-bold text-lg mb-1">{job.title}</div>
              <div className="text-gray-400 text-sm">
                Remote &middot; New York, US &middot; Full-time
              </div>
            </div>
            {job.createdAt && (
              <div className="content-end text-gray-500 text-sm">
                <TimeAgo date={job.createdAt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
