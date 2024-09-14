import { HashLink } from "react-router-hash-link";
import logo from "../../assets/logos/navy.png";
import { TypographyH3 } from "../ui/typography";
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
    type?: "hash" | "link";
  };

  const links: NavbarLink[] = [
    {
      name: "Generate",
      url: "/generate",
    },
    {
      name: "How it works",
      url: "/#how-it-works",
      type: "hash",
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
    <div className="navbar h-navbar-height w-full flex items-center flex-col backdrop-blur-[14px] sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-[100px] w-full max-w-[1400px]">
        <a className="flex items-center" href="/">
          <img className="w-[24px] h-[24px]" src={logo} />
          <TypographyH3 className="ml-[10px] text-foreground font-[600]">
            privalink
          </TypographyH3>
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-8">
              {links.map((link, index) =>
                link.type === "hash" ? (
                  <HashLink
                    key={index}
                    className="font-neometric"
                    to={link.url}
                    smooth
                  >
                    {link.name}
                  </HashLink>
                ) : (
                  <NavigationMenuLink
                    key={index}
                    className="font-neometric"
                    href={link.url}
                  >
                    {link.name}
                  </NavigationMenuLink>
                )
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* <Separator /> */}
    </div>
  );
};

export default Navbar;
