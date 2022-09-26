import React from "react";
import cx from "classnames";
import Link from "next/link";

import { Logo } from "../Elements";

export const Navbar: React.FC<{
  theme?: "transparent";
  className?: string;
  itemsRight: React.ReactNode;
}> = ({ theme, className, itemsRight }) => {
  const hasTransparentTheme = theme === "transparent";

  return (
    <nav
      className={cx(
        `flex w-full text-gray-100 transition-all text-nav-base bg-nav-fill`,
        className,
        { "theme-transparent": hasTransparentTheme }
      )}
    >
      <div className="container mx-auto flex items-center py-8 px-12 sm:px-16">
        <Link href="/">
          <a className="flex items-center">
            <Logo className="mr-4 h-16 md:h-20 transition-all" />
            <span className="hidden xs:block w-44 text-lg md:text-xl font-light">
              Wisdom Community of Pasifika Teachers
            </span>
          </a>
        </Link>

        <div className="ml-auto">
          {itemsRight}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
