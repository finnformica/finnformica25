import Link from "next/link";

import { Initials } from "@/components/branding";
import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { RollingText } from "@/components/text";
import { scrollToSection } from "@/lib/utils";

const Header = () => (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light z-40 hidden w-full md:block">
      <div className="container mx-auto flex w-full flex-row justify-between py-4">
        <a onClick={() => scrollToSection("#info")}>
          <RollingText text="info" className="cursor-pointer" />
        </a>

        <div className="flex w-1/2 flex-row items-center justify-between">
          <CrosshairIcon />

          <Link href="/">
            <Initials />
          </Link>

          <CrosshairIcon />
        </div>

        <a onClick={() => scrollToSection("#projects")}>
          <RollingText text="projects" className="cursor-pointer" />
        </a>
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
          <CrosshairIcon />
        </div>
      </div>
    </nav>
  </>
);

export default Header;
