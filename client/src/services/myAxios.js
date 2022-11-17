import axios from "axios"

const myAxios = axios.create({
  baseURL: process.env.VUE_APP_URL,
})


myAxios.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    return config
  }
)

export default myAxios
