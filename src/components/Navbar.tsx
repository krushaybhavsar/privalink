import { Link } from "react-router-dom";
import logo from "../assets/logos/navy.png";
import { Separator } from "./ui/separator";
import { TypographyH3 } from "./ui/typography";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <div className="navbar w-full flex items-center flex-col">
      <div className="flex items-center justify-between px-12 py-4 w-full">
        <a className="flex items-center" href="/">
          <img className="w-6 h-6" src={logo} />
          <TypographyH3 className="ml-2 text-foreground">
            privalink
          </TypographyH3>
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/generate"
              >
                Generate
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
