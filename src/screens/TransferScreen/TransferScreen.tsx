import { useState } from "react";
import "./TransferScreen.css";
import Stepper from "@/components/Stepper/Stepper";
import { CustomDropzone } from "@/components/CustomDropzone/CustomDropzone";
import { TypographyH1 } from "@/components/ui/typography";
import SelectedFileCard from "@/components/CustomDropzone/SelectedFileCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tag } from "emblor";
import CustomTagInput from "@/components/CustomTagInput/CustomTagInput";

const formSchema = z.object({
  message: z.string().optional(),
  // recipients: z.array(z.string()).min(1),
  recipients: z
    .array(
      z.object({
        id: z.string().email(),
        text: z.string().email(),
      })
    )
    .min(1),
  expiration: z.date().optional(),
});

const TransferScreen = () => {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [recipients, setRecipients] = useState<Tag[]>([]);
  const lastStepIndex = 1;

  const Step1Content = () => (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>upload your files</TypographyH1>
      <div className="flex flex-row w-full h-[50vh] gap-2">
        <CustomDropzone
          className="upload-modal-content__drop-area h-full transition-all ease-in-out duration-100"
          containerStyle={{
            width: selectedFiles.length > 0 ? "66%" : "100%",
          }}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
        <div
          className="flex flex-col gap-2 justify-start items-start w-1/3 overflow-auto px-2 rounded-[8px] transition-all ease-in-out duration-100"
          style={{ width: selectedFiles.length > 0 ? "33%" : "0%" }}
        >
          {selectedFiles.map((file, index) => (
            <SelectedFileCard
              key={index}
              file={file}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      recipients: [],
      expiration: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form values", values);
  }

  const Step2Content = () => (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>configure transfer settings</TypographyH1>
      <div className="glass p-5 transition-none" style={{ borderRadius: 8 }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="recipients"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Recipients</FormLabel>
                  <FormControl className="w-full">
                    <CustomTagInput
                      field={field}
                      form={form}
                      tags={recipients}
                      setTags={setRecipients}
                      placeholder={"Enter an email"}
                    />
                  </FormControl>
                  <FormDescription className="text-left">
                    Add recipient email addresses
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Message"}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Add an optional message to your recipients
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </div>
    </div>
  );

  const inputValidation = (s: number) => {
    switch (s) {
      case 0:
        return selectedFiles.length > 0;
      case 1:
        return true;
      default:
        return false;
    }
  };

  const getContent = (s: number) => {
    switch (s) {
      case 0:
        return Step1Content();
      case 1:
        return Step2Content();
      default:
        return null;
    }
  };

  const handleNextButton = () => {
    if (step !== lastStepIndex) {
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
        maxSteps={lastStepIndex + 1}
        disableNextSteps={!inputValidation(step)}
        content={
          <div className="flex flex-col gap-5">
            {getContent(step)}
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
                  step !== lastStepIndex ? "icon-button" : ""
                } step-control-button`}
                type={step !== lastStepIndex ? "button" : "submit"}
                onClick={handleNextButton}
                disabled={!inputValidation(step)}
              >
                {step !== lastStepIndex ? "Next" : "Encrypt & Send"}
                <div className="relative w-[18px] h-[18px]">
                  {step !== lastStepIndex ? (
                    <ArrowRight className="icon-button-icon" size={18} />
                  ) : (
                    <Lock className="ml-1.5" size={16} />
                  )}
                </div>
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default TransferScreen;
