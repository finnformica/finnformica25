import { Menu } from "lucide-react";
import Link from "next/link";

import { Initials } from "@/components/branding";
import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { RollingText } from "@/components/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const renderMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>info</DropdownMenuItem>
        <DropdownMenuItem>profile</DropdownMenuItem>
        <DropdownMenuItem>blog</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light z-40 hidden w-full md:block">
        <div className="container mx-auto flex w-full flex-row justify-between py-4">
          <div className="w-1/4">
            <a href="#info">
              <RollingText text="info" />
            </a>
          </div>

          <div className="flex w-1/2 flex-row items-center justify-between">
            <CrosshairIcon />
            <Link href="/">
              <Initials />
            </Link>
            <CrosshairIcon />
          </div>

          <div className="w-1/4 text-right">
            <a href="#projects">
              <RollingText text="projects" />
            </a>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-light bg-light block w-full md:hidden">
        <div className="container mx-auto flex w-full flex-row justify-between py-4">
          <div className="flex items-center gap-4">
            <CrosshairIcon />
            <Link href="/">
              <Initials />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {renderMenu()}
            <CrosshairIcon />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
