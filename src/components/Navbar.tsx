import logo from "../assets/logos/navy.png";
import { Separator } from "./ui/separator";
import { TypographyH3 } from "./ui/typography";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  type NavbarLink = {
    name: string;
    url: string;
  };

  const links: NavbarLink[] = [
    {
      name: "Generate",
      url: "/generate",
    },
    {
      name: "How it works",
      url: "/#how-it-works",
    },
    {
      name: "Security",
      url: "/security",
    },
    // {
    //   name: "Pricing",
    //   url: "/pricing",
    // },
  ];

  return (
    <div className="navbar h-navbar-height w-full flex items-center flex-col">
      <div className="flex h-full items-center justify-between px-12 w-full">
        <a className="flex items-center" href="/">
          <img className="w-6 h-6" src={logo} />
          <TypographyH3 className="ml-2 text-foreground">
            privalink
          </TypographyH3>
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-8">
              {links.map((link, index) => (
                <NavigationMenuLink
                  key={index}
                  className="font-neometric"
                  href={link.url}
                >
                  {link.name}
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
