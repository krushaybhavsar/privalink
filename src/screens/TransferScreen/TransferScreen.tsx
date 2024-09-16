import { useState } from "react";
import "./TransferScreen.css";
import Stepper from "@/components/Stepper/Stepper";
import { CustomDropzone } from "@/components/CustomDropzone/CustomDropzone";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import SelectedFileCard from "@/components/CustomDropzone/SelectedFileCard";

const TransferScreen = () => {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const Step1Content = () => (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>upload your files.</TypographyH1>
      <CustomDropzone
        className="upload-modal-content__drop-area h-[200px]"
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      {selectedFiles.length > 0 && (
        <div className="flex flex-row gap-2 flex-wrap justify-start items-start mb-5">
          {selectedFiles.map((file, index) => (
            <SelectedFileCard
              key={index}
              file={file}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
          ))}
        </div>
      )}
    </div>
  );

  const Step2Content = () => (
    <div className="transfer__right-content w-full">
      <TypographyH2>Step 2</TypographyH2>
    </div>
  );

  const Step3Content = () => (
    <div className="transfer__right-content w-full">
      <TypographyH2>Step 3</TypographyH2>
    </div>
  );

  const getContent = (s: number) => {
    switch (s) {
      case 0:
        return <Step1Content />;
      case 1:
        return <Step2Content />;
      case 2:
        return <Step3Content />;
      default:
        return <Step1Content />;
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-start px-[100px] pt-[50px] max-w-[1400px] m-auto">
      <Stepper
        stepIndex={step}
        setStepIndex={setStep}
        maxSteps={3}
        content={getContent(step)}
      />
    </div>
  );
};

export default TransferScreen;
