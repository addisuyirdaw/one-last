import React, { createContext } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const language = "English"; // Set your language logic here

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
};
