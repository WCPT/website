import cx from "clsx";

import Container from "./Container";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cx("bg-skin-inverted text-skin-inverted", className)}>
      <Container>
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <span>Wisdom Community of Pasifika Teachers &copy; </span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
