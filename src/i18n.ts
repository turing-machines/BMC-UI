import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import deLocale from "@/locale/de";
import enLocale from "@/locale/en";
import esLocale from "@/locale/es";
import nlLocale from "@/locale/nl";
import plLocale from "@/locale/pl";
import zhHansLocale from "@/locale/zh-Hans";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["de", "en", "es", "nl", "pl", "zh-Hans"],
    resources: {
      de: { translation: { ...deLocale } },
      en: { translation: { ...enLocale } },
      es: { translation: { ...esLocale } },
      nl: { translation: { ...nlLocale } },
      pl: { translation: { ...plLocale } },
      "zh-Hans": { translation: { ...zhHansLocale } },
    },
    fallbackLng: {
      "zh-CN": ["zh-Hans"],
      default: ["en"],
    },
  });

document.documentElement.lang = i18n.language;
