// @ts-ignore
import { attributes as social } from "../../content/site/social.md";
// @ts-ignore
import { attributes as url } from "../../content/site/url.md";
// @ts-ignore
import { attributes as stats } from "../../content/site/stats.md";

const config = {
  ...social,
  ...url,
  ...stats,
};

type SiteConfig = {
  twitter: string;
  facebook: string;
  youtube: string;
  email: string;
  videoURL: string;
  signInLink: string;
  signUpLink: string;
  engagements: number;
  registered: number;
  participants: number;
  launched: string;
};

export function getSiteConfig(): SiteConfig {
  return config;
}
