// # koa v2.5.3
const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const routers = require('./routers/index')
const cors = require('koa-cors');

const app = new Koa()

app.use(cors())

// 日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())


app.listen(3000)
console.log('koa server starting at port 3000')