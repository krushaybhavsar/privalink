import { TypographyH1 } from "@/components/ui/typography";
import { Asterisk, ShieldCheck } from "lucide-react";
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
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "../TransferScreen";
import { z } from "zod";

type Step2Props = {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const Step2 = (props: Step2Props) => {
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftColHeight, setLeftColHeight] = useState(0);
  const watchNotifyWhenOpened = props.form.watch("notifyWhenOpened");

  useEffect(() => {
    if (watchNotifyWhenOpened) {
      props.form.register("notifyEmail");
    } else {
      props.form.unregister("notifyEmail");
    }
  }, [watchNotifyWhenOpened]);

  useEffect(() => {
    if (leftColRef.current) {
      setLeftColHeight(leftColRef.current.clientHeight);
    }
  }, [leftColRef.current]);

  const requiredFormLabel = (label: string) => (
    <FormLabel className="text-left flex items-center justify-start">
      {label}
      <Asterisk className="text-accent w-3 h-3 ml-0.5 mb-0.5" />
    </FormLabel>
  );

  return (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>configure transfer settings</TypographyH1>
      <div className="glass p-5 transition-none" style={{ borderRadius: 8 }}>
        <Form {...props.form}>
          <form
            onSubmit={props.form.handleSubmit(props.onSubmit)}
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
                  control={props.form.control}
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
                  control={props.form.control}
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
                    control={props.form.control}
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
                    control={props.form.control}
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
                                control={props.form.control}
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
                  control={props.form.control}
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
};
