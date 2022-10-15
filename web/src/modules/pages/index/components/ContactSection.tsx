import React from "react";

import { SocialMedia } from "@/components/Elements";

export const ContactSection: React.FC<{
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
    email: string;
  };
}> = ({ socialLinks }) => {
  return (
    <section className="relative py-12 sm:py-12 bg-white">
      <div className="xl:container mx-auto py-16 px-8 sm:px-12 flex flex-col">
        <h2 className="z-10 font-sans font-black text-3xl sm:text-4xl tracking-tight text-gray-900">
          <span className="block">Want to get in touch?</span>
          <span className="block bg-clip-text text-skin-primary">
            Reach us through social media or email us!
          </span>
        </h2>
        <div className="z-10 mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
          <SocialMedia
            themeStyle={2}
            links={{
              facebook: socialLinks.facebook,
              twitter: socialLinks.twitter,
              youtube: socialLinks.youtube,
              email: socialLinks.email,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
