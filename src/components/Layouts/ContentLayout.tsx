import React from "react";

import {
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  EmailIcon,
} from "@/components/Elements";
import { Navbar } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useSiteConfig } from "@/hooks";

export const ContentLayout: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const socialLinks = useSiteConfig();

  return (
    <>
      <title>{title}</title>
      <Navbar
        className="border-b border-gray-200"
        itemsRight={
          <div className="flex items-center theme-social-transparent-bg">
            <FacebookIcon href={socialLinks.facebook} />
            <TwitterIcon href={socialLinks.twitter} />
            <YoutubeIcon href={socialLinks.youtube} />
            <EmailIcon href={socialLinks.email} />
          </div>
        }
      />
      <main>{children}</main>
      <Footer className="mt-auto" />
    </>
  );
};

export default ContentLayout;
