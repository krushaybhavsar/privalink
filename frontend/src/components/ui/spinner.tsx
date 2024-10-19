import { cn } from "@/lib/utils";
import { LoaderCircle, LucideProps } from "lucide-react";

export const Spinner = ({ ...props }: LucideProps) => {
  return (
    <LoaderCircle
      {...props}
      strokeWidth={0.5}
      className={cn(
        "animate-spin transition-all duration-[3s] ease-in-out",
        props.className
      )}
    />
  );
};
