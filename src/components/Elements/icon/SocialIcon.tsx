import { MdEmail } from "react-icons/md";
import { FaTwitter, FaFacebookSquare, FaYoutube } from "react-icons/fa";

import Icon from "./Icon";

type Props = {
  href: string;
};

export const FacebookIcon = (props: Props) => {
  return (
    <Icon
      {...props}
      icon={FaFacebookSquare}
      title="Facebook"
      className="text-skin-facebook hover:text-skin-facebook-hover bg-skin-facebook hover:bg-skin-facebook-hover"
    />
  );
};

export const TwitterIcon = (props: Props) => {
  return (
    <Icon
      {...props}
      icon={FaTwitter}
      title="Twitter"
      className="text-skin-twitter hover:text-skin-twitter-hover bg-skin-twitter hover:bg-skin-twitter-hover"
    />
  );
};

export const YoutubeIcon = (props: Props) => {
  return (
    <Icon
      {...props}
      icon={FaYoutube}
      title="Youtube"
      className="text-skin-youtube hover:text-skin-youtube-hover bg-skin-youtube hover:bg-skin-youtube-hover"
    />
  );
};

export const EmailIcon = (props: Props) => {
  return (
    <Icon
      {...props}
      icon={MdEmail}
      title="Email"
      className="text-skin-email hover:text-skin-email-hover bg-skin-email hover:bg-skin-email-hover"
    />
  );
};
