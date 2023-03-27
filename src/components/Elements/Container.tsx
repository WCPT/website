import React from "react";
import cx from "clsx";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cx("container mx-auto max-w-7xl px-8 sm:px-12", className)}>
      {children}
    </div>
  );
};

export default Container;
