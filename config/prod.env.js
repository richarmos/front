"use strict";

const minimist = require('minimist');
/*获取传递的参数*/
var args = minimist(process.argv.slice(2));
/* 如果运行npm run build 未指定服务端API地址，则给一个默认的后端地址
*打包执行如下命令
*npm run build -- --baseURL=172.17.6.65 --HOST=9999
需替换相关IP及端口配置
*/
let {
  baseURL = "172.17.6.57:9990",
  WS = "139.159.187.33:8991"
} = args;


module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: '"http://' + baseURL +'"',
};
