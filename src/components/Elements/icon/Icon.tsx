import React from "react";
import Link from "next/link";
import cx from "clsx";

export const Icon = ({
  icon: IconComponent,
  href,
  title,
  className,
}: {
  icon: React.ElementType;
  href: string;
  title: string;
  className: string;
}) => {
  return (
    <Link href={href} target="_blank" rel="noopener" title={title}>
      <IconComponent
        className={cx(
          `mx-1 p-2.5 text-5xl rounded-md transition-all duration-300`,
          className
        )}
      />
    </Link>
  );
};

export default Icon;
