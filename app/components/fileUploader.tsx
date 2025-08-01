import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {formatSize} from "../lib/utils";
interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  file: File | null;
}

const FileUploader = ({ onFileSelect, file }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 20 * 1024 * 1024,
  });
  return (
    <div className="gradient-border w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-5 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium truncate text-gray-700 max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="cursor-pointer p-2"
                onClick={() => {
                  onFileSelect?.(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="size-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto h-16 w-16 flex items-center justify-center mb-3">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500 ">
                <span className="font-semibold">Click to upload </span>or drag
                and drop
              </p>
              <p className="text-lg text-gray-500 ">PDF (max 20 MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
