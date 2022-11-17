import GenericsServices from "../services/generics"
const Generics = {
  install: function (Vue) {
    Vue.prototype.$services = GenericsServices
  },
}

export default Generics
