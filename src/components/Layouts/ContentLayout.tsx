import React from "react";
import Head from "next/head";

import {
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  EmailIcon,
  Container,
} from "@/components/Elements";
import { Footer } from "@/components/Elements";
import { getSiteConfig } from "@/lib";

export const ContentLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  const socialLinks = getSiteConfig();

  return (
    <div className="bg-skin-secondary">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100" />
        </div>
      </div>

      <Container.Outer>
        {/* <Navbar
        className="border-b border-gray-200"
        itemsRight={
          <div className="flex items-center theme-social-gray-bg">
            <FacebookIcon href={socialLinks.facebook} />
            <TwitterIcon href={socialLinks.twitter} />
            <YoutubeIcon href={socialLinks.youtube} />
            <EmailIcon href={socialLinks.email} />
          </div>
        }
      /> */}
        <Container.Inner>
          <main>{children}</main>
        </Container.Inner>

        <Footer className="mt-auto" />
      </Container.Outer>
    </div>
  );
};

export default ContentLayout;
