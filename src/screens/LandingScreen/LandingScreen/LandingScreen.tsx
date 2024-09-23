import "./LandingScreen.css";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../HowItWorks/HowItWorks";
import NavyLogo from "../../../assets/logos/navy.png";
import { HashLink } from "react-router-hash-link";
import { cn } from "@/lib/utils";
import { SiteMap } from "@/types";

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center justify-start px-[100px] max-w-[1400px] m-auto">
      <div className="header px-24 pb-24 pt-[3rem] flex flex-col items-center justify-center gap-10 max-w-[1000px]">
        <div className="flex flex-col gap-6 max-w-[865px] justify-center items-center">
          <img src={NavyLogo} className="w-[60px] h-[60px] mb-2" />
          <TypographyH1 className="text-center font-semibold text-[56px] leading-[4rem]">
            share sensitive data the right way.
          </TypographyH1>
          <TypographyH3 className="text-center font-poppins text-[22px] opacity-40 px-[100px]">
            Take control of your data with end-to-end encryption and
            self-destructing links.
          </TypographyH3>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <HashLink
            to={SiteMap.LandingScreen.children.HowItWorks.slug}
            smooth
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            <Shield className="mr-2" size={18} />
            How it works
          </HashLink>
          {/* </Button> */}
          <Button
            className="icon-button"
            onClick={() => navigate(SiteMap.TransferScreen.slug)}
          >
            Try Privalink free
            <div className="relative w-[18px] h-[18px]">
              <ArrowRight className="icon-button-icon" size={18} />
            </div>
          </Button>
        </div>
      </div>
      <HowItWorks />
    </div>
  );
};

export default LandingScreen;
