import { useEffect, useMemo } from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import { TypographyP } from "../ui/typography";
import { FolderUp } from "lucide-react";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderRadius: 8,
  border: "2px dashed hsl(var(--border))",
  backgroundColor: "hsl(var(--card))",
  color: "hsl(var(--primary))",
  outline: "none",
  transition: "all 0.25s ease",
  cursor: "pointer",
  textAlign: "center",
  width: "100%",
};

const focusedStyle = {};

const acceptStyle = {
  border: "2px dashed hsl(var(--accent))",
  backgroundColor: "hsl(var(--accent-background))",
  color: "hsl(var(--accent)) !important",
};

const rejectStyle = {};

type CustomDropzoneProps = {
  className: string;
  containerStyle?: React.CSSProperties;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  innerContent?: React.ReactNode;
};

export const CustomDropzone = (props: CustomDropzoneProps) => {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({});

  useEffect(() => {
    // remove duplicates
    if (acceptedFiles.length === 0) return;
    const newFiles: File[] = [];
    for (let i = 0; i < acceptedFiles.length; i++) {
      if (
        !props.selectedFiles.find(
          (file) => file.name === acceptedFiles[i].name
        ) &&
        !newFiles.find((file) => file.name === acceptedFiles[i].name)
      ) {
        newFiles.push(acceptedFiles[i]);
      }
    }
    props.setSelectedFiles([...props.selectedFiles, ...newFiles]);
  }, [acceptedFiles]);

  const style: DropzoneRootProps = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div
      className="glass bg-card p-3"
      style={{ borderRadius: 8, ...props.containerStyle }}
    >
      <div {...getRootProps({ style })} className={props.className}>
        <input {...getInputProps()} />
        {props.innerContent || (
          <>
            <FolderUp
              size={64}
              className="text-primary opacity-30"
              strokeWidth={1}
            />
            <TypographyP className="text-primary opacity-40">
              Drag and drop your files or click here to upload
            </TypographyP>
          </>
        )}
      </div>
    </div>
  );
};
