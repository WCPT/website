import React from "react";

import { Navbar } from "@/components/Navigation";
import { SocialMedia } from "@/components/Elements";
import { Footer } from "@/components/Footer";
import { useSocialLinks } from "@/hooks";

export const ContentLayout: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const socialLinks = useSocialLinks();

  return (
    <>
      <title>{title}</title>
      <Navbar
        className="border-b border-gray-200"
        itemsRight={
          <SocialMedia
            themeStyle={1}
            links={{
              facebook: socialLinks.facebook,
              twitter: socialLinks.twitter,
              youtube: socialLinks.youtube,
              email: socialLinks.email,
            }}
          />
        }
      />
      <main>{children}</main>
      <Footer className="mt-auto" />
    </>
  );
};

export default ContentLayout;
