import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import he from "vuetify/lib/locale/he"

Vue.use(Vuetify)

export default new Vuetify({
  rtl: true,
  lang: {
    locales: { he },
    current: "he",
  },
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#F33015",
        secondary: "#000000",
        secondaryLight: "#FFE9DA",
        black: "#000000",
        textColor: "#606060",
        background: "#FFE9DA",
        accent: "#82b1ff",
        error: "#e05b5b",
        info: "#2196f3",
        success: "#78c485",
        warning: "#ffc107",
        lightGrey: "#b8b7b7",
        lightGreySecondary:"#eee",
        orange: "#f36515",
        azure: "#0FADE9",
        lightAzure: "#CDF1FF",
        initial: "revert",
        textColorPrimary: "#000",
        textColorSecondary: "#11A6DE",
        backgroundWarm: "#ffe9da",
        backgroundCold: "#cdf1ff",
      },
    },
  },
})
