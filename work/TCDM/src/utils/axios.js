import axios from "axios";
/* 允许跨域带session */
axios.defaults.withCredentials = true;

const Axios = axios.create({
  timeout: process.env.TIMEOUT // request timeout
});

// let storage = window.sessionStorage;
// let baseURL = "";

// if (process.env.ENV_CONFIG == "dev") {
//   // 如果是开发环境
//   Axios.defaults.baseURL = process.env.BASE_API;
// }

// if (storage.length && storage.config) {
//   Axios.defaults.baseURL = JSON.parse(storage.config).baseURL;
// }
// // 如果是生产环境且config没有保存到session中取本地配置文件数据
// else if (process.env.ENV_CONFIG == "prod") {
//   axios
//     .get("serverconfig.json")
//     .then(response => {
//       storage.setItem("config", JSON.stringify(response.data));
//       Axios.defaults.baseURL = response.data.baseURL;
//       console.log(response.data.baseURL);
//     })
//     .catch(res => {
//       Axios.defaults.baseURL = process.env.BASE_API;
//       console.log("没有找到本地json配置文件！");
//     });
// }

//返回状态判断(添加响应拦截器)
Axios.interceptors.request.use(
  config => {
    if (!config.baseURL) {
    }
    return config;
  },
  error => {
    // 返回 response 里的错误信息
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => response,
  error => {
    console.log("err==>" + error); // for debug
    return Promise.reject(error);
  }
);

export default Axios;
