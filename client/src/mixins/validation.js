const validationMixins = {
  computed: {
    emailValidationRule() {
      return [
        (value) => !!value || this.$t("errors.validate.required"),
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t("errors.auth.emailInvalid")
        },
      ]
    },
    nameValidationRule() {
      return [
        (value) => !!value || this.$t("errors.validate.required"),
        (value) => value.length >= 2 || this.$t("errors.validate.minlen2"),
        (value) => value.length <= 40 || this.$t("errors.validate.maxlen40"),
      ]
    },
    phoneValidationRule() {
      return [
        (value) => !!value || this.$t("errors.validate.required"),
        (value) => {
          const pattern =
            /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|([71,72,73,74,75,76,77]{2}\d{7})|[5]{1}\d{8})$/g
          return pattern.test(value) || this.$t("errors.auth.phoneInvalid")
        },
      ]
    },
    addressValidationRule() {
      return [
        (value) =>
          !value || value?.length >= 6 || this.$t("errors.validate.minlen6"),
        (value) =>
          !value || value?.length <= 100 || this.$t("errors.validate.maxlen100"),
      ]
    },
    passwordValidationRule() {
      return [
        (value) => !!value || this.$t("errors.validate.required"),
        (value) => value.length >= 6 || this.$t("errors.validate.minlen6"),
        (value) => value.length <= 40 || this.$t("errors.validate.maxlen40"),
      ]
    },
    requiredValidationRule() {
      return [
        (value) =>
          !!value ||
          value === 0 ||
          value === false ||
          this.$t("errors.validate.required"),
      ]
    },
  },
}

export default validationMixins
