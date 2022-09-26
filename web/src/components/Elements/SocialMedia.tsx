import React, { FC } from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaTwitter, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import cx from "classnames";

export const SocialMedia: FC<{
  links: {
    facebook: string;
    twitter: string;
    youtube: string;
    email: string;
  };
}> = ({ links }) => {
  return (
    <div className="flex items-center">
      <FacebookIcon href={links.facebook} />
      <TwitterIcon href={links.twitter} />
      <YoutubeIcon href={links.youtube} />
      <EmailIcon href={links.email} />
    </div>
  );
};

export default SocialMedia;

const Icon: FC<{
  icon: React.ElementType;
  href: string;
  title: string;
  className: string;
}> = ({ icon: IconComponent, href, title, className }) => {
  return (
    <Link href={href}>
      <a title={title} target="_blank" rel="noopener">
        <IconComponent
          className={cx(
            `mx-1 p-1.5 md:p-2.5 text-4xl md:text-5xl rounded-md transition-all duration-300`,
            className
          )}
        />
      </a>
    </Link>
  );
};

type ISocialIconProps = {
  href: string;
};

const FacebookIcon: FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaFacebookSquare}
      href={href}
      title="Facebook"
      // className={
      //   isLightTheme
      //     ? `hover:text-blue-800 text-blue-800 bg-white`
      //     : `hover:text-white bg-gray-100 hover:bg-blue-800`
      // }
      className="hover:text-blue-800 text-blue-800 bg-white"
    />
  );
};

const TwitterIcon: FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaTwitter}
      href={href}
      title="Twitter"
      // className={
      //   isLightTheme
      //     ? `hover:text-blue-400 text-blue-400 bg-white`
      //     : `hover:text-white bg-gray-100 hover:bg-blue-400`
      // }
      className="hover:text-blue-400 text-blue-400 bg-white"
    />
  );
};

const YoutubeIcon: FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaYoutube}
      href={href}
      title="Youtube"
      // className={
      //   isLightTheme
      //     ? `hover:text-red-600 text-red-600 bg-white`
      //     : `hover:text-white bg-gray-100 hover:bg-red-600`
      // }
      className="hover:text-red-600 text-red-600 bg-white"
    />
  );
};

const EmailIcon: FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={MdEmail}
      href={href}
      title="Email"
      // className={
      //   isLightTheme
      //     ? `hover:text-blue-500 text-blue-500 bg-white`
      //     : `hover:text-white bg-gray-100 hover:bg-blue-500`
      // }
      className="hover:text-blue-500 text-blue-500 bg-white"
    />
  );
};
