import { useEffect, useRef, useState } from "react";
import "./TransferScreen.css";
import Stepper from "@/components/Stepper/Stepper";
import { CustomDropzone } from "@/components/CustomDropzone/CustomDropzone";
import { TypographyH1 } from "@/components/ui/typography";
import SelectedFileCard from "@/components/CustomDropzone/SelectedFileCard";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Asterisk,
  Lock,
  ShieldCheck,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z
  .object({
    message: z.string().optional(),
    recipient: z.string().email(),
    expiration: z.string(),
    destroyOnOpen: z.boolean().optional(),
    notifyWhenOpened: z.boolean().optional(),
    notifyEmail: z.string().email().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.notifyWhenOpened && !values.notifyEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required when notifyWhenOpened is enabled",
        path: ["notifyEmail"],
      });
    }
  });

const TransferScreen = () => {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const lastStepIndex = 1;
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftColHeight, setLeftColHeight] = useState(0);

  useEffect(() => {
    if (leftColRef.current) {
      setLeftColHeight(leftColRef.current.clientHeight);
    }
  }, [leftColRef.current]);

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
      recipient: "",
      expiration: "1 week",
      destroyOnOpen: false,
      notifyWhenOpened: false,
      notifyEmail: undefined,
    },
  });
  const watchNotifyWhenOpened = form.watch("notifyWhenOpened");

  useEffect(() => {
    if (watchNotifyWhenOpened) {
      form.register("notifyEmail");
    } else {
      form.unregister("notifyEmail");
    }
  }, [watchNotifyWhenOpened]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form values", values);
  }

  const requiredFormLabel = (label: string) => (
    <FormLabel className="text-left flex items-center justify-start">
      {label}
      <Asterisk className="text-accent w-3 h-3 ml-0.5 mb-0.5" />
    </FormLabel>
  );

  const Step2Content = () => (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>configure transfer settings</TypographyH1>
      <div className="glass p-5 transition-none" style={{ borderRadius: 8 }}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>We value your privacy</AlertTitle>
              <AlertDescription>
                Privalink will never store any data you upload to this form in
                plain text. All personally identifiable information is encrypted
                using military grade zero-knowledge encryption.
              </AlertDescription>
            </Alert>
            <div className="flex w-full h-full gap-8">
              <div
                className="flex flex-col w-1/2 space-y-8 h-full"
                ref={leftColRef}
              >
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      {requiredFormLabel("Recipient Email")}
                      <FormControl className="w-full">
                        <Input
                          {...field}
                          placeholder="Email address"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiration"
                  render={({ field }) => (
                    <FormItem>
                      {requiredFormLabel("Delete After")}
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 hour">1 hour</SelectItem>
                            <SelectItem value="12 hours">12 hours</SelectItem>
                            <SelectItem value="1 day">1 day</SelectItem>
                            <SelectItem value="1 week">1 week</SelectItem>
                            <SelectItem value="1 month">1 month</SelectItem>
                            <SelectItem value="1 year">1 year</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Set an expiration date for your transfer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col border p-4 rounded-md gap-5">
                  <FormField
                    control={form.control}
                    name="destroyOnOpen"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Destroy on open</FormLabel>
                          <FormDescription>
                            Immediately delete encrypted files from Privalink
                            servers after being opened
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notifyWhenOpened"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Notify me when opened</FormLabel>
                          <FormDescription>
                            Get notified via email when your files are opened
                          </FormDescription>
                          {watchNotifyWhenOpened && (
                            <div className="!mt-5 !mb-2.5">
                              <FormField
                                control={form.control}
                                name="notifyEmail"
                                render={({ field }) => (
                                  <FormItem>
                                    {requiredFormLabel("Email Address")}
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Email address"
                                        className="w-full"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div
                className={`flex flex-col w-1/2 justify-start items-start h-${leftColHeight}`}
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="!space-y-0 flex flex-col gap-2 w-full h-full justify-center">
                      <FormLabel className="text-left flex items-center justify-start">
                        {"Message"}
                      </FormLabel>
                      <FormControl className="h-full">
                        <Textarea
                          {...field}
                          className={"w-full min-h-[200px] !h-full"}
                          placeholder="Add an optional message"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
        return form.formState.isValid;
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
