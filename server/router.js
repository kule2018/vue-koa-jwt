const KoaRouter = require("koa-router")
const query = require('./db/db')
const createToken = require('./token/createToken')
const checkToken = require('./token/checkToken')

const router = new KoaRouter({
  prefix: "/api"
})

// 处理注册
router.post("/auth/register", async ctx => {
  let { name, password } = ctx.request.body;

  // 首先检查用户名是不是已经存在
  let sql = `SELECT * FROM users WHERE name = "${name}"`
  await query(sql).then(async res => {
    if (res.length === 0) {
      // 将接收到的前台数据和存放到数据库
      // 这里直接存储明文密码，也不做后端验证，正式项目中必须用 md5 加密
      sql = `INSERT INTO users(name, password) VALUES("${name}", "${password}")`
      await query(sql).then(res => {
        console.log(res)
        if (res.affectedRows === 1) {
          // 自定义创建 token 时要携带的信息
          let token = createToken({
            id: res.insertId,
            name
          })
          ctx.body = {
            code: 0,
            token,
            msg: '注册成功'
          }
        } else {
          ctx.throw(500, '注册失败！')
        }
      })
    } else {
      ctx.throw(422, '用户名已经存在！')
    }
  })

})

// 处理登录
router.post("/auth/login", async ctx => {
  let { name, password } = ctx.request.body;

  // 将接收到的前台数据和数据库中的数据匹配
  let sql = `SELECT * FROM users WHERE name = "${name}" AND password = "${password}"`
  await query(sql).then(res => {
    if (res.length === 0) {
      ctx.throw(401, '账号不存在或密码错误！')
    } else {
      // 自定义创建 token 时要携带的信息
      let access_token = createToken({
        id: res[0].id,
        name
      })
      ctx.body = {
        code: 0,
        access_token,
        msg: '登录成功'
      }
    }
  })
})

// 获取当前用户信息（认证接口）
router.get("/me", async ctx => {
  let token = ctx.header.authorization
  // console.log(token)  // Bearer *****
  let payload = await checkToken(token)
  // console.log(payload)
  // token 验证成功
  if (payload) {
    let sql = `SELECT * FROM users WHERE id = "${payload.id}"`
    await query(sql).then(res => {
      // 直接响应 user 对象，与前端约束好
      ctx.body = {
        name: res[0].name
      }
    })
  } else {  // token 验证失败
    ctx.throw(401, '您无权访问');
  }
})

module.exports = router