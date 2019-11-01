import Vue from "vue";
import ElementUI from "element-ui";
/*ElementUI基础样式*/
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";

/*ElementUI动画样式*/
// fade/zoom 等
import "element-ui/lib/theme-chalk/base.css";

import App from "./App";
import router from "./router";

import store from './store'
//font-awesome 图标字体库
import "font-awesome/css/font-awesome.css";
//引入全局样式
import "./common/css/common.scss";

//注册全局组件
import camelCase from 'lodash/camelCase'
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.vue$/
)


requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.substring(fileName.lastIndexOf("/") + 1, fileName.lastIndexOf("."))
    )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

//引入全局指令
// import "./common/js/instruct"

//引入mock模拟数据
// import './mock'

// 引入工具类
import * as utils from "./utils/index"
Vue.prototype.utils = utils;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component("icon", Icon); 

//时间戳转时间moment过滤器引用
import moment from 'moment'
Vue.prototype.$moment = moment;
Vue.filter('moment', function (value, formatString = 'HH:mm',dateFormat="YYYYMMDDHHmm") {
  if(!value){
    return "--"
  }
  return moment(value,dateFormat).format(formatString); // 这是时间戳转时间
});

document.oncontextmenu = function () {
  return false;
}

import VueDND from 'awe-dnd'
Vue.use(VueDND)
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
