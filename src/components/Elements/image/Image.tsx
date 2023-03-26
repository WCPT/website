import React from "react";
import NextImage from "next/image";
import cx from "clsx";

import Credit from "./Credit";

export const Image = ({
  overlayed,
  backgroundCover,
  credit,
  creditHref,
  className,
  fixed,
  ...rest
}: React.ComponentProps<typeof NextImage> & {
  overlayed?: boolean | string;
  backgroundCover?: boolean;
  credit?: string;
  creditHref?: string;
  fixed?: boolean;
}) => {
  let position;
  if (fixed) {
    position = "fixed";
  } else if (backgroundCover) {
    position = "absolute";
  } else {
    position = "relative";
  }

  return (
    <div className={cx(backgroundCover ? "static" : "relative")}>
      <NextImage
        className={cx(
          className,
          backgroundCover && "inset-0 -z-50 object-cover h-full w-full",
          position
        )}
        {...rest}
      />
      {credit && <Credit credit={credit} href={creditHref} />}
      {overlayed && (
        <div
          className={cx(
            fixed ? "fixed" : "absolute",
            "inset-0 -z-40 pointer-events-none",
            typeof overlayed === "string" ? overlayed : "opacity-30 bg-black"
          )}
        />
      )}
    </div>
  );
};

export default Image;
