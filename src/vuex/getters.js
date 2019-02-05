import { isEmpty } from 'lodash'

// 重新打开浏览器，token首先会从本地缓存中恢复，但是如果这个token已经过期，调用API是获取不到的user的
// 所以即便 setToken 成功了，但是 setUser 失败还是要判定为未登录状态！
export const isLogged = ({ token, user }) => !isEmpty(token) && !isEmpty(user)