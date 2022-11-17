const Swal = require("sweetalert2")
import toast from "izitoast"
import vuetify from "../plugins/vuetify"

let primaryColor = vuetify?.userPreset?.theme?.themes?.light?.primary

const swalClass = (locale = "he") => {
  const myClass = locale === "he" ? "rtl" : "ltr"
  return {
    content: myClass,
    header: myClass,
    actions: myClass,
    footer: myClass,
    htmlContainer: myClass,
    input: myClass,
    inputLabel: myClass,
    confirmButton: myClass,
    cancelButton: myClass,
    validationMessage: myClass,
  }
}

class NotificationService {
  static successToast(title = "", message = "", btnMsg, cb) {
    toast.success({
      title,
      message,
      position: "topCenter",
      rtl: true,
      buttons: btnMsg
        ? [
          [
            `<button>${btnMsg}</button>`,
            (instance, toast) => {
              instance.hide({ transitionOut: "fadeOutUp" }, toast)
              cb()
            },
          ],
        ]
        : [],
    })
  }
  static infoToast(title = "", message = "", btnMsg, cb) {
    toast.info({
      title,
      message,
      position: "topCenter",
      timeout: false,
      rtl: true,
      buttons: btnMsg
        ? [
          [
            `<button>${btnMsg}</button>`,
            (instance, toast) => {
              instance.hide({ transitionOut: "fadeOutUp" }, toast)
              cb()
            },
          ],
        ]
        : [],
    })
  }
  static errorToast(title = "", message = "") {
    toast.error({ title, message, position: "topCenter" })
  }

  static warningToast(title = "", message = "") {
    toast.show({
      title,
      message,
      color: "orange",
      position: "topCenter",
      rtl: true,
    })
  }

  static createSwal({ icon, title, color, text, closeable, ...options }) {
    if (!color) color = primaryColor
    if (closeable === null || closeable === undefined) closeable = true
    if (!icon) icon = "question"
    return Swal.fire({
      dir: "rtl",
      icon,
      title: title,
      html: text || "",
      confirmButtonText: this.$t("generics.confirm"),
      confirmButtonColor: color,
      showCancelButton: true,
      cancelButtonText: this.$t("generics.cancel"),
      backdrop: true,
      textColor: "ee44aa",
      allowOutsideClick: closeable,
      reverseButtons: true,
      customClass: swalClass(this.$i18n.locale),
      ...options,
    })
  }

  static timeoutSwal({ icon, title, color, text = "" }) {
    if (!color) color = "#2196F3"
    if (!icon) icon = "success"
    Swal.fire({
      icon,
      title: title,
      html: text || "",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1500,
      titleColor: "ee44aa",
      allowOutsideClick: false,
      position: "center",
      reverseButtons: true,
    })
  }

  static async createInputSwaldata({
    title,
    inputType = "text",
    color,
    presistant = false,
    timer = null,
    validationMessage = null,
    validatorMaxInput = 100,
  }) {
    validationMessage = validationMessage
      ? validationMessage
      : this.$t("errors.validate.minAndMaxPassenger", {
        max: validatorMaxInput,
      })
    if (!color) color = "#2196F3"
    let data = {
      title,
      input: inputType,
      showCancelButton: true,
      confirmButtonColor: color,
      showConfirmButton: true,
      confirmButtonText: this.$t("generics.confirm"),
      cancelButtonText: this.$t("generics.cancel"),
      allowOutsideClick: presistant,
      reverseButtons: true,
      customClass: swalClass(this.$i18n.locale),
      target: this.$el,
      inputValidator: (v) => {
        if (v < 1 || v > validatorMaxInput) {
          return validationMessage
        }
      },
    }
    if (timer) {
      data["timer"] = timer
      data["timerProgressBar"] = true
    }
    const { value: chose } = await Swal.fire({ ...data })
    return chose
  }
  static async selectSwal(title, selects) {
    const { value: chose } = await Swal.fire({
      title: title,
      input: "radio",
      icon: "question",
      inputOptions: selects,
      reverseButtons: true,
      customClass: swalClass(this.$i18n.locale),
      allowOutsideClick: false,
      confirmButtonText: this.$t("generics.confirm"),
      showCancelButton: true,
      cancelButtonText: this.$t("generics.cancel"),
      inputValidator: (v) => {
        if (!v) {
          return this.$t("errors.validate.choose")
        }
      },
    })
    return chose
  }
}

export default NotificationService
