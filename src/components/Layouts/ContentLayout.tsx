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
  description?: string | null;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col bg-skin-secondary min-h-screen">
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="flex flex-1 my-16">
        <Container>{children}</Container>
      </main>

      <Footer className="mt-36" />
    </div>
  );
};

export default ContentLayout;
