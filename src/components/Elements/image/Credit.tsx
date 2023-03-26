import React from "react";
import cx from "clsx";

export const Credit = ({
  className,
  credit,
  href,
}: {
  className?: string;
  credit: string;
  href?: string;
}) => {
  const [display, setDisplay] = React.useState(false);
  const toggleCredit = () => setDisplay((display) => !display);

  const ref = href ? (
    <a
      href={href}
      target="__blank"
      referrerPolicy="no-referrer"
      className="hover:underline"
    >
      {credit}
    </a>
  ) : (
    credit
  );

  return (
    <span
      className={cx(
        "absolute bottom-0 right-0 z-50 px-3 py-1 text-sm sm:text-base text-gray-300 transition-all bg-black hover:text-white bg-opacity-80 cursor-pointer rounded-tl-md text-center",
        display && "bg-opacity-60 hover:bg-black",
        className
      )}
      onClick={toggleCredit}
    >
      {display ? <span>Photo by {ref}</span> : "Credit"}
    </span>
  );
};

export default Credit;
