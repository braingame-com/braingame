import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/common.json";
import es from "./locales/es/common.json";

export const supportedLanguages = ["en", "es"] as const;

void i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		es: { translation: es },
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: { escapeValue: false },
});

export default i18n;
