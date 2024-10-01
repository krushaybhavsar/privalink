import React, { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import secureAnimation from "@/assets/animations/secure.json";
import { Spinner } from "@/components/ui/spinner";

type Step3Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Step3 = (props: Step3Props) => {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (
      !props.loading &&
      animationRef.current &&
      animationRef.current.animationLoaded
    ) {
      animationRef.current.setSpeed(1.25);
      animationRef.current.goToAndPlay(30, true);
    } else {
      animationRef.current?.goToAndStop(30, true);
    }
  }, [props.loading]);

  return (
    <div className="transfer__right-content w-full flex flex-col gap-5">
      <TypographyH1>
        {props.loading ? "hang tight!" : "share the link"}
      </TypographyH1>
      <div
        className="glass p-20 pt-12 transition-none"
        style={{ borderRadius: 8 }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="step-3-loading-container relative w-[160px] h-[160px] flex justify-center items-center pb-1 filter">
            <Spinner
              className="absolute z-1 w-full h-full top-0 left-0"
              style={{ opacity: props.loading ? 1 : 0 }}
            />
            <Lottie
              className="transition-all duration-[3s] ease-in-out"
              style={
                props.loading
                  ? { width: 75, height: 75 }
                  : {
                      width: 125,
                      height: 125,
                    }
              }
              loop={false}
              autoPlay={false}
              autoplay={false}
              lottieRef={animationRef}
              animationData={secureAnimation}
            />
          </div>
          <TypographyP className="text-lg font-normal !mt-[0px]">
            {props.loading
              ? "Encrypting and uploading your files..."
              : "Files transferred successfully"}
          </TypographyP>
        </div>
      </div>
    </div>
  );
};
