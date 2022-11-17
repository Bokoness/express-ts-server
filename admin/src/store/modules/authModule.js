import axios from "axios"
import router from "../../router/index"

export default {
  state: {
    isLoggedIn: false,
    fullName: null,
    role: null,
		token: null,
  },
  getters: {
    fullName: (state) => state.fullName,
    isAuth: (state) => state.isLoggedIn,
    role: (state) => state.role,
  },
  mutations: {
    setName: (state, payload) => (state.fullName = payload),
    "auth/login": (state, user) => {
      state.isLoggedIn = true
      state.fullName = user.fullName
      state.role = user.role
    },
		"auth/loginByToken"(state, { user, token }) {
      this.token = token
      state.isAuth = true
      state.username = user.username
      state.role = user.role
      localStorage.setItem("token", token)
    },
    clearData: (state) => {
      state.isLoggedIn = false
      state.fullName = null
      state.role = null
    },
  },
  actions: {
    "auth/register": async (context, payload) => {
      let {data} = await axios.post("/auth/register", payload)
      context.commit("auth/login", data)
    },
    "auth/login": async (context, payload) => {
      let {data} = await axios.post("/auth/login", payload, )
      context.commit("auth/login", data)
    },
    "auth/checkLogin": async (context) => {
      let {data} = await axios.get("/auth/checkLogin")
      context.commit("auth/login", data)
    },
    "auth/logout": async (context) => {
			await axios.post("/auth/logout")
      context.commit("clearData")
			localStorage.removeItem("token")
      router.push({name: "Login"})
    }
  }
}
