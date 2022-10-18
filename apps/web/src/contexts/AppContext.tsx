import React from "react";

import { SocialLinks } from "../types";

// @ts-ignore
export const AppContext = React.createContext<{ socialLinks: SocialLinks }>();

export const AppContextProvider: React.FC<{
  children: React.ReactNode;
  socialLinks: SocialLinks;
}> = ({ children, socialLinks }) => {
  const [state] = React.useState({ socialLinks });

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppContext;
