import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaTwitter, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import cx from "classnames";

export const SocialMedia: React.FC<{
  themeStyle?: 0 | 1;
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
      className="text-facebook hover:text-facebook-hover bg-facebook hover:bg-facebook-hover"
    />
  );
};

const TwitterIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaTwitter}
      href={href}
      title="Twitter"
      className="text-twitter hover:text-twitter-hover bg-twitter hover:bg-twitter-hover"
    />
  );
};

const YoutubeIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={FaYoutube}
      href={href}
      title="Youtube"
      className="text-youtube hover:text-youtube-hover bg-youtube hover:bg-youtube-hover"
    />
  );
};

const EmailIcon: React.FC<ISocialIconProps> = ({ href }) => {
  return (
    <Icon
      icon={MdEmail}
      href={href}
      title="Email"
      className="text-email hover:text-email-hover bg-email hover:bg-email-hover"
    />
  );
};
