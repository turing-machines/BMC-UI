// src/components/FileInput.tsx
import { useRef } from "react";

import UploadIcon from "../assets/upload-icon.svg?react";

interface FileInputProps {
  name: string;
  label: string;
  accept: string;
}

export default function FileInput({ name, label, accept }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (inputRef.current) {
      inputRef.current.value = file ? file.name : "";
    }
  };

  return (
    <label
      htmlFor={`${name}-file-id`}
      className="input-wrap input-type-file-wrap active"
    >
      <span className="label">{label}</span>
      <input
        type="text"
        name={`${name}-url`}
        className="file-upload-input"
        ref={inputRef}
        readOnly
      />

      <button
        type="button"
        className="file-upload-button"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <UploadIcon />
      </button>
      <input
        type="file"
        name={name}
        id={`${name}-file-id`}
        className="form-control hidden"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
      />
    </label>
  );
}
