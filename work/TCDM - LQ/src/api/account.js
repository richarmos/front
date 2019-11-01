import axios from '../utils/axios'

/**
 *通过账号id获取账号权限范围内的保障服务
 * @param accountId 账号id
 */
export function getKeyServices(accountId) {
  return axios({
    url: `/api/accounts/${accountId}/keyservices`,
    method: "get"
  });
}
