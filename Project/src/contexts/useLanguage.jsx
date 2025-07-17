import { useContext } from "react";
import { LanguageContext } from "./LanguageContext"; // Ensure this path is correct

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default useLanguage; // Ensure this line is present
