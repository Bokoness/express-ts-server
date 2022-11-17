import Vue from "vue"
import VueI18n from "vue-i18n"
import he from "./i18n/he"
import en from "./i18n/en"

Vue.use(VueI18n)

function loadLocaleMessages() {
  let messages = {
    en,
    he,
  }
  return messages
}
const I18n = new VueI18n({
  locale: localStorage.getItem("lang") || "he",
  fallbackLocale: localStorage.getItem("lang") || "he",
  messages: loadLocaleMessages(),
})

export function isRtlLang(currentLocale) {
  const rtlLangauges = ["he"]
  return rtlLangauges.includes(currentLocale)
}

export default I18n
