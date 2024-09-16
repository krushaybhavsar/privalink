import { Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { TypographyP } from "../ui/typography";
import "./Stepper.css";
import React, { useEffect, useRef, useState } from "react";

type StepperProps = {
  stepIndex: number;
  setStepIndex: (step: number) => void;
  maxSteps: number;
  content: React.ReactNode;
};

const Stepper = (props: StepperProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const steps = Array.from({ length: props.maxSteps }, (_, i) => i);

  useEffect(() => {
    setContentHeight(contentRef.current?.children[0].clientHeight || 0);
  }, [contentRef.current, props.stepIndex]);

  return (
    <div className="flex flex-row w-full px-[75px] gap-10">
      <div className="flex flex-col justify-start gap-3 items-center">
        {steps.map((step) => (
          <div
            key={step}
            className={`transition-all duration-[3s] ease`}
            style={
              step === props.maxSteps - 1
                ? { height: undefined }
                : props.stepIndex === step
                ? { height: Math.max(contentHeight, 100) }
                : { height: 100 }
            }
          >
            <div
              key={step}
              onClick={() => props.setStepIndex(step)}
              className={`stepper__step ${
                props.stepIndex >= step ? "active" : ""
              } flex justify-center items-center w-10 h-10 rounded-full bg-border`}
            >
              {props.stepIndex > step ? (
                <Check size={20} className="text-accent-foreground" />
              ) : (
                <TypographyP
                  className={
                    props.stepIndex === step
                      ? "!text-accent-foreground"
                      : "text-primary"
                  }
                >
                  {step + 1}
                </TypographyP>
              )}
            </div>
            {step !== props.maxSteps - 1 && (
              <Separator
                orientation="vertical"
                className="h-[calc(100%-3rem)] mx-auto my-3"
              />
            )}
          </div>
        ))}
      </div>
      <div ref={contentRef} className="w-full">
        {props.content}
      </div>
    </div>
  );
};

export default Stepper;
