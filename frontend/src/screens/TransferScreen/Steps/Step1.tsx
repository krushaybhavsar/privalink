import { CustomDropzone } from "@/components/CustomDropzone/CustomDropzone";
import SelectedFileCard from "@/components/CustomDropzone/SelectedFileCard";
import { TypographyH1 } from "@/components/ui/typography";
import React from "react";

type Step1Props = {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export const Step1 = (props: Step1Props) => {
  return (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>upload your files</TypographyH1>
      <div className="flex flex-row w-full h-[50vh] gap-2">
        <CustomDropzone
          className="upload-modal-content__drop-area h-full transition-all ease-in-out duration-100"
          containerStyle={{
            width: props.selectedFiles.length > 0 ? "66%" : "100%",
          }}
          selectedFiles={props.selectedFiles}
          setSelectedFiles={props.setSelectedFiles}
        />
        <div
          className="flex flex-col gap-2 justify-start items-start w-1/3 overflow-auto rounded-[8px] transition-all ease-in-out duration-100"
          style={{
            width: props.selectedFiles.length > 0 ? "33%" : "0%",
            padding: props.selectedFiles.length > 0 ? "0 0.5rem" : "0",
          }}
        >
          {props.selectedFiles.map((file, index) => (
            <SelectedFileCard
              key={index}
              file={file}
              selectedFiles={props.selectedFiles}
              setSelectedFiles={props.setSelectedFiles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
