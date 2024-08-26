import { TypographyH2 } from "@/components/ui/typography";
import React from "react";

const LandingScreen = () => {
  return (
    <div className="flex w-full align-center justify-start">
      <div className="header w-full p-24">
        <TypographyH2>Secrets should be kept secrets.</TypographyH2>
      </div>
    </div>
  );
};

export default LandingScreen;
