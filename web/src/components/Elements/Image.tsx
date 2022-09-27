import React from "react";
import NextImage, { ImageProps } from "next/image";
import cx from "classnames";

import Credit from "./Credit";

export const Image: React.FC<
  ImageProps & {
    overlayed?: boolean;
    backgroundCover?: boolean;
    credit?: string;
    creditHref?: string;
  }
> = ({
  overlayed,
  backgroundCover,
  credit,
  creditHref,
  className,
  ...rest
}) => {
  return (
    <>
      <div className={cx(backgroundCover ? "absolute inset-0" : "relative")}>
        <NextImage
          className={cx(className, backgroundCover && "-z-50")}
          {...rest}
        />
        {credit && <Credit credit={credit} href={creditHref} />}
      </div>
      {overlayed && (
        <div className="absolute inset-0 opacity-30 bg-black -z-40 pointer-events-none" />
      )}
    </>
  );
};

export default Image;
