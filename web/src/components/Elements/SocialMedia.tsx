import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaTwitter, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import cx from "classnames";

export const SocialMedia: React.FC<{
  themeStyle?: 0 | 1 | 2;
  links: {
    facebook: string;
    twitter: string;
    youtube: string;
    email: string;
  };
}> = ({ links, themeStyle = 0 }) => {
  return (
    <div
      className={cx("flex items-center", {
        "theme-social-transparent-bg": themeStyle === 1,
        "theme-social-gray-bg": themeStyle === 2,
      })}
    >
      <FacebookIcon href={links.facebook} />
      <TwitterIcon href={links.twitter} />
      <YoutubeIcon href={links.youtube} />
      <EmailIcon href={links.email} />
    </div>
  );
};

export default SocialMedia;

const Icon: React.FC<{
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

const FacebookIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaFacebookSquare}
      href={href}
      title="Facebook"
      className="text-skin-facebook hover:text-skin-facebook-hover bg-skin-facebook hover:bg-skin-facebook-hover"
    />
  );
};

const TwitterIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaTwitter}
      href={href}
      title="Twitter"
      className="text-skin-twitter hover:text-skin-twitter-hover bg-skin-twitter hover:bg-skin-twitter-hover"
    />
  );
};

const YoutubeIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaYoutube}
      href={href}
      title="Youtube"
      className="text-skin-youtube hover:text-skin-youtube-hover bg-skin-youtube hover:bg-skin-youtube-hover"
    />
  );
};

const EmailIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={MdEmail}
      href={href}
      title="Email"
      className="text-skin-email hover:text-skin-email-hover bg-skin-email hover:bg-skin-email-hover"
    />
  );
};
