import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import deLocale from "@/locale/de";
import enLocale from "@/locale/en";
import esLocale from "@/locale/es";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["de", "en", "es"],
    resources: {
      de: { translation: { ...deLocale } },
      en: { translation: { ...enLocale } },
      es: { translation: { ...esLocale } },
    },
    fallbackLng: "en", // Set the initial language of the App
  });

document.documentElement.lang = i18n.language;
