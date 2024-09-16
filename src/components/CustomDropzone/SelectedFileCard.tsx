import { File, X } from "lucide-react";
import { TypographyP } from "../ui/typography";

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

  return (
    <div className="glass bg-card p-5" style={{ borderRadius: 8 }}>
      <div className="flex items-center gap-2">
        <File className="w-6 h-6" />
        <TypographyP>{props.file.name}</TypographyP>
      </div>
      <div className="flex items-center gap-2">
        <TypographyP>{formatBytes(props.file.size)}</TypographyP>
        <button
          onClick={() => {
            const newFiles = props.selectedFiles.filter(
              (file) => file !== props.file
            );
            props.setSelectedFiles(newFiles);
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SelectedFileCard;
