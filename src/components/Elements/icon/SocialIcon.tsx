import cx from "clsx";
import { MdEmail } from "react-icons/md";
import { FaTwitter, FaFacebookSquare, FaYoutube } from "react-icons/fa";

import Icon from "./Icon";

type Props = {
  href: string;
  className?: string;
};

export const FacebookIcon = ({ className, ...props }: Props) => {
  return (
    <Icon
      {...props}
      icon={FaFacebookSquare}
      title="Facebook"
      className={cx(
        "text-skin-facebook hover:text-skin-facebook-hover bg-skin-facebook hover:bg-skin-facebook-hover",
        className
      )}
    />
  );
};

export const TwitterIcon = ({ className, ...props }: Props) => {
  return (
    <Icon
      {...props}
      icon={FaTwitter}
      title="Twitter"
      className={cx(
        "text-skin-twitter hover:text-skin-twitter-hover bg-skin-twitter hover:bg-skin-twitter-hover",
        className
      )}
    />
  );
};

export const YoutubeIcon = ({ className, ...props }: Props) => {
  return (
    <Icon
      {...props}
      icon={FaYoutube}
      title="Youtube"
      className={cx(
        "text-skin-youtube hover:text-skin-youtube-hover bg-skin-youtube hover:bg-skin-youtube-hover",
        className
      )}
    />
  );
};

export const EmailIcon = ({ className, ...props }: Props) => {
  return (
    <Icon
      {...props}
      icon={MdEmail}
      title="Email"
      className={cx(
        "text-skin-email hover:text-skin-email-hover bg-skin-email hover:bg-skin-email-hover",
        className
      )}
    />
  );
};
