"use client";

import { IconDefinition, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ImageUpload({
  icon,
  name,
}: {
  icon: IconDefinition;
  name: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  async function handleUploadFile(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement | null;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      setIsUploading(true);
      const response = await axios.post("/api/upload", formData);
      setImageUrl(response.data.url);
      setIsUploading(false);
      setIsImageUploading(true);
    }
  }

  const imageUploading = isImageUploading || isUploading;

  return (
    <>
      <div className="overflow-hidden bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
        {imageUploading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-400 animate-spin"
          />
        )}
        {!imageUrl && !imageUploading && (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
        {!isUploading && imageUrl && (
          <Image
            onLoad={() => setIsImageUploading(false)}
            src={imageUrl}
            alt="Upload image"
            width={1024}
            height={1024}
            className="w-auto h-auto"
          />
        )}
      </div>
      <input type="hidden" value={imageUrl} name={name} />
      <div className="mt-2">
        <input
          onChange={handleUploadFile}
          ref={inputRef}
          type="file"
          hidden
          id=""
        />
        <Button
          onClick={() => inputRef.current?.click()}
          type="button"
          variant="soft"
        >
          Select file
        </Button>
      </div>
    </>
  );
}
