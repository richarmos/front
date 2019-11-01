import axios from '../utils/axios'

/**
 *测试接口
 * @param accountId 账号id
 */
export function test (accountId) {
  return axios({
    url: `/static/json/test/index-update.json`,
    method: 'get'
  }).then(res => {
    return res.data
  })
}
