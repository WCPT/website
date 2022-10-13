import React from "react";
import NextImage, { ImageProps } from "next/future/image";
import cx from "classnames";

import Credit from "./Credit";

export const Image: React.FC<
  ImageProps & {
    overlayed?: boolean | string;
    backgroundCover?: boolean;
    credit?: string;
    creditHref?: string;
    fixed?: boolean;
  }
> = ({
  overlayed,
  backgroundCover,
  credit,
  creditHref,
  className,
  fixed,
  ...rest
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
          backgroundCover && "inset-0 -z-50 object-cover h-full",
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
