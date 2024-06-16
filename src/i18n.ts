import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enLocale from "@/locale/en";
import esLocale from "@/locale/es";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "es"],
    resources: {
      en: { translation: { ...enLocale } },
      es: { translation: { ...esLocale } },
    },
    fallbackLng: "en", // Set the initial language of the App
  });
