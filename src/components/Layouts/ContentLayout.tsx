import React from "react";
import Head from "next/head";

import { Navbar } from "@/components/Elements";
import { Footer } from "@/components/Elements";

export const ContentLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Navbar />

      <main>{children}</main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default ContentLayout;
