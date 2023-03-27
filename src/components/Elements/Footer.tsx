import cx from "clsx";

import Container from "./Container";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cx("relative bg-skin-secondary", className)}>
      <Container>
        <div className="z-10 flex flex-col md:flex-row justify-between container mx-auto py-12">
          <div className="flex justify-center items-center my-2">
            <div className="text-center text-gray-900">
              <span>Wisdom Community of Pasifika Teachers &copy; </span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
          <div className="flex justify-center items-center my-2">
            <span className="text-center text-gray-900">
              Supported by Fiji National University
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
