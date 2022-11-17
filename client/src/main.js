import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "./styles/global.scss"
import i18n from "./i18n"
import "izitoast/dist/css/iziToast.min.css"
import Notifications from "./plugins/notifications"
import GenericServices from "./plugins/generics"
import NProgress from "vue-nprogress"
import VueNumericInput from "vue-numeric-input"

Vue.config.productionTip = false

Vue.use(VueNumericInput)
Vue.use(Notifications)
Vue.use(GenericServices)
Vue.use(NProgress)

const nprogress = new NProgress()
const init = async () => {
  //checks user auth status
  try {
    await store.dispatch(`auth/checkLogin`, {
      toastOptions: {disabled: true},
    })
    await store.dispatch("event/index", {
      toastOptions: {disabled: true},
    })
  } catch {
    console.log("No auth")
  } finally {
    store.$vue = new Vue({
      nprogress,
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app")
  }
}

init()
