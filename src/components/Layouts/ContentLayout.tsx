import React from "react";
import Head from "next/head";

import { Container, Navbar } from "@/components/Elements";
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
    <div className="bg-skin-secondary">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Navbar />

      <main className="my-16">
        <Container>{children}</Container>
      </main>

      <Footer className="mt-36" />
    </div>
  );
};

export default ContentLayout;
