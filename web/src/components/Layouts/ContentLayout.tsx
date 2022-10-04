import React from "react";
import { Footer } from "../Footer";

type IProps = {
  title: string;
  children: React.ReactNode;
};

const ContentLayout: React.FC<IProps> = ({ title, children }) => {
  return (
    <>
      <title>{title}</title>
      <main>{children}</main>
      <Footer className="mt-auto" />
    </>
  );
};

export default ContentLayout;
