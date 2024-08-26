import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className="header w-2/3 p-24 flex flex-col items-center justify-center">
        <TypographyH1 className="text-center font-normal text-[56px] mb-6">
          Share sensitive data the right way.
        </TypographyH1>
        <TypographyH3 className="text-center font-normal text-[20px] opacity-60">
          Take control of your data with end-to-end encryption and
          self-destructing links that ensure your information is safe and
          secure.
        </TypographyH3>
        <div className="flex flex-row gap-4 items-center justify-center mt-12">
          <Button variant="outline" onClick={() => navigate("/#how-it-works")}>
            <Shield className="mr-2" size={18} />
            How it works
          </Button>
          <Button onClick={() => navigate("/generate")}>
            Try Privalink free
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
