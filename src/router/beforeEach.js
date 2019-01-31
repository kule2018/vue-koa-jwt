import store from '../vuex'

const needAuth = route => route.meta.requiresAuth === true

const beforeEach = (to, from, next) => {

  store
    .dispatch('checkUserToken') // 检查用户 token 是否有效
    .then(() => {
      // token 有效，说明用户已经登录
      // 如果要访问的路由是 auth 相关的（登录、注册），重定向到用户后台
      if (store.getters.isLogged && to.path.indexOf('auth') > 0) {
        next({ name: 'user' })
      }
      // 不是 auth 相关的路由，想去哪去哪
      next()
    })
    .catch(() => {
      // token 无效：有可能是token过期，有可能是没有登录
      // 如果要访问的路由是需要授权的，既然token无效，那么只好重新登陆一次了
      if (needAuth(to)) {
        // No token, or it is invalid
        return next({ name: 'auth.login' }) // redirect to login
      }
      // 访问不需要授权登录的路由，想去哪去哪
      next()
    })
}

export default beforeEach
