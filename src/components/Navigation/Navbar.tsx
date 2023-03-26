import React from "react";
import cx from "clsx";
import Link from "next/link";

import { Logo } from "@/components/Elements";

export const Navbar = ({
  themeStyle = 0,
  className,
  itemsRight,
}: {
  themeStyle?: 0 | 1;
  className?: string;
  itemsRight?: React.ReactNode;
}) => {
  return (
    <nav
      className={cx(
        `flex w-full text-gray-100 transition-all text-skin-nav-base bg-skin-nav-fill`,
        className,
        { "theme-nav-transparent-bg": themeStyle === 1 }
      )}
    >
      <div className="xl:container mx-auto flex justify-between items-center flex-1 py-8 px-8 sm:px-12">
        <Link href="/" className="flex items-center">
          <Logo
            dark={themeStyle === 0}
            className="mr-4 h-16 md:h-20 transition-all"
          />
          <span className="hidden sm:block w-44 md:w-48 text-lg md:text-xl font-light font-serif">
            Wisdom Community of Pasifika Teachers
          </span>
        </Link>

        {itemsRight && <div className="ml-auto">{itemsRight}</div>}
      </div>
    </nav>
  );
};

export default Navbar;
