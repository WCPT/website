import React from "react";
import cx from "classnames";

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={cx("relative bg-skin-secondary", className)}>
      <div className="flex flex-col container mx-auto px-8 sm:px-12">
        <div className="z-10 flex flex-col md:flex-row justify-between container mx-auto py-12">
          <div className="flex justify-center items-center my-2">
            <span className="text-center text-gray-900">
              Wisdom Community of Pasifika Teachers &copy;
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex justify-center items-center my-2">
            <span className="text-center text-gray-900">
              Supported by Fiji National University
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
