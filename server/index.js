const path = require("path")
const Koa = require("koa")
const KoaStatic = require("koa-static")
const convert = require("koa-convert")
const cors = require('@koa/cors');
const koaBody = require("koa-body")
const router = require('./router')  // 引入路由文件

const app = new Koa()

app.use(koaBody())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.use(convert(KoaStatic(path.join(__dirname, "../dist"))))

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server started at port of ${port}`)
})