import React from "react";
import cx from "classnames";
import Link from "next/link";

import { Logo } from "../Elements";

export const Navbar: React.FC<{
  themeStyle?: 0 | 1;
  className?: string;
  itemsRight?: React.ReactNode;
}> = ({ themeStyle = 0, className, itemsRight }) => {
  return (
    <nav
      className={cx(
        `flex w-full text-gray-100 transition-all text-skin-nav-base bg-skin-nav-fill`,
        className,
        { "theme-nav-transparent-bg": themeStyle === 1 }
      )}
    >
      <div className="container mx-auto flex items-center py-8 px-8 xs:px-12 sm:px-16">
        <Link href="/">
          <a className="flex items-center">
            <Logo
              dark={themeStyle === 0}
              className="mr-4 h-16 md:h-20 transition-all"
            />
            <span className="hidden xs:block w-44 text-lg md:text-xl font-light">
              Wisdom Community of Pasifika Teachers
            </span>
          </a>
        </Link>

        {itemsRight && <div className="ml-auto">{itemsRight}</div>}
      </div>
    </nav>
  );
};

export default Navbar;
