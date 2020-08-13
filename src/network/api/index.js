import store from "../../store/index"
import Axios from "axios"

function request(config, headers) {
  const instance = Axios.create({
    baseURL: process.env.VUE_APP_SERVER_BASE_URL,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json"
    },
    validateStatus(status) {
      return status >= 200 && status < 500; //默认
    },
  })
  instance.interceptors.request.use(config => {
    store.commit("updateApiCount", "add")
    if (headers) {
      Object.assign(config.headers, headers)
    }
    setTimeout(() => {
      store.commit("updateApiCount", "sub")
    }, 3000);
    return config
  })
  instance.interceptors.response.use(res => {
    store.commit("updateApiCount", "sub")
    return res.data
  })
  return instance(config)
}

export default request
