import React from "react";

import { AppContext } from "../contexts";

export const useSocialLinks = () => {
  const { socialLinks } = React.useContext(AppContext);
  return socialLinks;
};

export default useSocialLinks;
