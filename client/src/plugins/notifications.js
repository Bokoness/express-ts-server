import NotificationService from "../services/notifications"
const Notifications = {
  install: function (Vue) {
    Vue.prototype.$createSwal = NotificationService.createSwal
    Vue.prototype.$timeoutSwal = NotificationService.timeoutSwal
    Vue.prototype.$selectSwal = NotificationService.selectSwal
    Vue.prototype.$createInputSwaldata =
      NotificationService.createInputSwaldata
    Vue.prototype.$infoToast = NotificationService.infoToast
    Vue.prototype.$warningToast = NotificationService.warningToast
    Vue.prototype.$errorToast = NotificationService.errorToast
    Vue.prototype.$adminAlert = NotificationService.adminAlert
  },
}

export default Notifications
