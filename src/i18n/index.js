import { createI18n } from "vue-i18n";
import pluralRules from "./rules/pluralization";
import numberFormats from "./rules/numbers.js"
import datetimeFormats from "./rules/datetime.js"
import en from "./locales/en.json" // <--- add this

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
    legacy: false, // <--- 3
    globalInjection: true, // <--- add this
    messages: { en },
    runtimeOnly: false,
    pluralRules,
    numberFormats,
    datetimeFormats
})