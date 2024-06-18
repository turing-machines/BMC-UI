import deLocale from "./de";
import enLocale, { type OptionalTranslations } from "./en";
import esLocale from "./es";
import nlLocale from "./nl";
import plLocale from "./pl";
import zhHansLocale from "./zh-Hans";

export const languages = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  nl: "Nederlands",
  pl: "Polski",
  "zh-Hans": "简体中文",
} as const;

type Locale = typeof languages;

export const resources = {
  en: { translation: { ...enLocale } },
  es: { translation: { ...esLocale } },
  de: { translation: { ...deLocale } },
  nl: { translation: { ...nlLocale } },
  pl: { translation: { ...plLocale } },
  "zh-Hans": { translation: { ...zhHansLocale } },
} satisfies { [key in keyof Locale]: { translation: OptionalTranslations } };
