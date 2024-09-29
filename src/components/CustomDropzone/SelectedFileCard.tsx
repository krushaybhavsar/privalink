import { File, X } from "lucide-react";
import { TypographyP } from "../ui/typography";
import "./SelectedFileCard.css";

type SelectedFileCardProps = {
  file: File;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const SelectedFileCard = (props: SelectedFileCardProps) => {
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const extractFileType = (file: File) => {
    const ftype = file.name.split(".").pop()?.toUpperCase();
    // truncate file type with ellipsis if it's longer than 4 characters
    return ftype?.length! > 4 ? ftype?.slice(0, 4) + "..." : ftype;
  };

  return (
    <div
      className="file-card glass bg-card flex justify-between items-center px-3.5 py-3 w-full cursor-pointer"
      style={{ borderRadius: 8 }}
      onClick={() => {
        const newFiles = props.selectedFiles.filter(
          (file) => file !== props.file
        );
        props.setSelectedFiles(newFiles);
      }}
    >
      <div className="flex items-center justify-start w-full">
        <File
          className="text-primary !w-[32px] !h-[32px] mr-3"
          strokeWidth={0.75}
        />
        <div className="flex flex-col gap-0.5 justify-center items-start w-[calc(100%-78px)] mr-2">
          <TypographyP className="inline-block !mt-0 whitespace-nowrap overflow-ellipsis overflow-hidden w-[calc(100%)]">
            {props.file.name}
          </TypographyP>
          <TypographyP className="text-center !mt-0 whitespace-nowrap !text-[12px]">
            {formatBytes(props.file.size)}
          </TypographyP>
        </div>
        <button className="remove-file-button">
          <X className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default SelectedFileCard;
