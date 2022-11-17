import Vue from "vue"
import Vuex from "vuex"
import authModule from "@/store/modules/authModule"
import Notifications from "../services/notifications"
import I18n from "../i18n"

Vue.use(Vuex)
let vuexData = {
  state: { title: "test" },
  getters: { title: (state) => state.title },
  modules: {authModule}
}
const store = new Vuex.Store(vuexData)

store.subscribeAction({
  error: (action, state, error) => {
    if (action.payload?.toastOptions?.disabled) return
    Notifications.errorToast("", extractClapError(error))
  },
  after: (action) => {
    const { disabled, title, message } = action.payload?.toastOptions || {}
    const actionSuffix = action.type.match(/\/[^/]+?$/)?.[0].replace("/", "")
    if (disabled || actionSuffix === "index") return
    const toastMessageType =
        actionSuffix === "update"
          ? "update"
          : actionSuffix === "store"
            ? "store"
            : actionSuffix === "destroy"
              ? "destroy"
              : "success"

    Notifications.successToast(
      title || "",
      message || I18n.t(`toasts.${toastMessageType}`)
    )
  },
})

function extractClapError(e) {
  let lang = I18n._vm.locale || "he"
  if (e && e.response && e.response.data && e.response.data.clapErr) {
    let errObj = e.response.data
    return errObj[lang]
  } else {
    return "משהו השתבש"
  }
}

export default store
