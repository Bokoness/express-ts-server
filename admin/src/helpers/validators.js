export default class Validators {
  static email(v) {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(v) || this.$t("errors.auth.emailInvalid")
  }
  static phone(v) {
    const pattern =
      /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|([71,72,73,74,75,76,77]{2}\d{7})|[5]{1}\d{8})$/g
    return pattern.test(v) || this.$t("errors.auth.phoneInvalid")
  }

  static required(v) {
    return !!v || v === 0 || v === false || this.$t("errors.validate.required")
  }

  static minPass(v) {
    return v.length >= 6 || this.$t("errors.auth.minlen6")
  }
}
