import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";
import zhHK from "./zh-HK.json";

const resources = {
  "en-US": {
    translation: enUS,
  },
  "zh-CN": {
    translation: zhCN,
  },
  "zh-HK": {
    translation: zhHK,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh-HK",
  fallbackLng: "zh-HK",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
