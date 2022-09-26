import React from 'react';

type IProps = {
  title: string;
  children: React.ReactNode;
};

const ContentLayout: React.FC<IProps> = ({ title, children }) => {
  return (
    <>
      <title>{title}</title>
      <main>{children}</main>
    </>
  );
};

export default ContentLayout;
