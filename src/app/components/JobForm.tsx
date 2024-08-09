"use client";

import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Theme,
  TextField,
  RadioGroup,
  Button,
  TextArea,
} from "@radix-ui/themes";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import ImageUpload from "./ImageUpload";
import { saveJobAction } from "../actions/jobActions";
import { redirect } from "next/navigation";
import type { Job } from "@/models/Job";

export default function JobForm({
  orgId,
  jobDoc,
}: {
  orgId: string;
  jobDoc?: Job;
}) {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || "");
  const [stateName, setStateName] = useState(jobDoc?.state || "");
  const [cityName, setCityName] = useState(jobDoc?.city || "");

  async function handleSaveJob(data: FormData) {
    data.set("country", countryName.toString());
    data.set("state", stateName.toString());
    data.set("city", cityName.toString());
    data.set("cityId", cityId.toString());
    data.set("stateId", stateId.toString());
    data.set("countryId", countryId.toString());
    data.set("orgId", orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }
  return (
    <Theme>
      <form
        action={handleSaveJob}
        className="container mt-6 flex flex-col gap-4"
      >
        {jobDoc && <input type="hidden" name="id" value={jobDoc?._id} />}
        <TextField.Root
          defaultValue={jobDoc?.title}
          name="title"
          placeholder="Job title"
        ></TextField.Root>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            Remote?
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || "onsite"}
              name="remote"
            >
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root
              defaultValue={jobDoc?.type || "project"}
              name="type"
            >
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root defaultValue={jobDoc?.salary} name="salary">
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div>
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow">
            <CountrySelect
              defaultValue={
                countryId ? { id: countryId, name: countryName } : 0
              }
              onChange={(e: any) => {
                setCountryId(e.id);
                setCountryName(e.name);
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              defaultValue={stateId ? { id: stateId, name: stateName } : 0}
              countryid={countryId}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <CitySelect
              defaultValue={cityId ? { id: cityId, name: cityName } : 0}
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="sm:flex gap-6">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <ImageUpload
              defaultValue={jobDoc?.jobIcon || ""}
              name="jobIcon"
              icon={faUser}
            />
          </div>
          <div className="grow">
            <h3>Contact person</h3>
            <div className="flex gap-4">
              <div className="flex flex-col ">
                <ImageUpload
                  defaultValue={jobDoc?.contactPhoto || ""}
                  name="contactPhoto"
                  icon={faStar}
                />
              </div>
              <div className="flex flex-col gap-2 grow">
                <TextField.Root
                  defaultValue={jobDoc?.contactName}
                  name="contactName"
                  placeholder="John Doe"
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  defaultValue={jobDoc?.contactPhone}
                  name="contactPhone"
                  placeholder="Phone"
                  type="tel"
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  defaultValue={jobDoc?.contactEmail}
                  name="contactEmail"
                  placeholder="Email"
                  type="email"
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea
          defaultValue={jobDoc?.description}
          placeholder="Job description"
          name="description"
          resize="vertical"
        />{" "}
        <div className="flex justify-center">
          <Button size="3">
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
