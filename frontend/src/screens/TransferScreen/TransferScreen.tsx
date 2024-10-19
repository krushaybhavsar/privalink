import { useState } from "react";
import "./TransferScreen.css";
import Stepper from "@/components/Stepper/Stepper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";

export const formSchema = z
  .object({
    recipient: z.string().email(),
    expiration: z.string(),
    destroyOnOpen: z.boolean().optional(),
    notifyWhenOpened: z.boolean().optional(),
    notifyEmail: z.string().email().optional(),
    message: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.notifyWhenOpened && !values.notifyEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter an email to get notified",
        path: ["notifyEmail"],
      });
    }
  });

const TransferScreen = () => {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const lastStepIndex = 2;
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      expiration: "1 week",
      destroyOnOpen: false,
      notifyWhenOpened: false,
      notifyEmail: undefined,
      message: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form values", values);
    setLoading(true);
    setStep(step + 1);
    // TODO: Implement API call
    setTimeout(() => {
      setSelectedFiles([]);
      form.reset();
      setLoading(false);
    }, 5000);
  };

  const getContent = (s: number) => {
    switch (s) {
      case 0:
        return (
          <Step1
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        );
      case 1:
        return (
          <Step2
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            onSubmit={onSubmit}
            form={form}
          />
        );
      default:
        return <Step3 loading={loading} setLoading={setLoading} />;
    }
  };

  const inputValidation = (s: number) => {
    switch (s) {
      case 0:
        return selectedFiles.length > 0;
      case 1:
        return form.formState.isValid;
      default:
        return false;
    }
  };

  const handleNextButton = () => {
    if (step !== lastStepIndex - 1) {
      setStep(step + 1);
      return;
    }
    onSubmit(form.getValues());
  };

  return (
    <div className="flex flex-col w-full items-center justify-start px-[100px] pt-[50px] max-w-[1400px] m-auto mb-4">
      <Stepper
        stepIndex={step}
        setStepIndex={setStep}
        lastStepIndex={lastStepIndex}
        disableNextSteps={!inputValidation(step)}
        content={
          <div className="flex flex-col gap-5">
            {getContent(step)}
            {step !== lastStepIndex && (
              <div className="step-control-container flex justify-between gap-4">
                <Button
                  className="icon-button-reverse step-control-button"
                  onClick={() => setStep(step - 1)}
                  variant="ghost"
                  disabled={step === 0}
                >
                  <div className="relative w-[18px] h-[18px]">
                    <ArrowLeft className="icon-button-reverse-icon" size={18} />
                  </div>
                  Back
                </Button>
                <Button
                  className={`${
                    step !== lastStepIndex - 1 ? "icon-button" : ""
                  } step-control-button`}
                  type={step !== lastStepIndex - 1 ? "button" : "submit"}
                  onClick={handleNextButton}
                  disabled={!inputValidation(step)}
                >
                  {step !== lastStepIndex - 1 ? "Next" : "Encrypt & Send"}
                  <div className="relative w-[18px] h-[18px]">
                    {step !== lastStepIndex - 1 ? (
                      <ArrowRight className="icon-button-icon" size={18} />
                    ) : (
                      <Lock className="ml-1.5" size={16} />
                    )}
                  </div>
                </Button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default TransferScreen;
