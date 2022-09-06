const koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path')

// 实例化koa
const app = new koa();
const router = new Router();

const home = serve(path.join(__dirname)+'/public/');
// 路由
router.get("/", async ctx => {
  ctx.body = {
    msg: "Hello Koa Interfaces"
  };
})

app.use(home);
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on ${port}`)
})