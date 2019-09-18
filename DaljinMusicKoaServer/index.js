const Koa = require('koa')
const Router = require('koa-router')


const app = new Koa()
const router = new Router()

router.get('/' , (ctx) => {
    ctx.body = '홈'
})

router.get('/about/:name?' , (ctx) => {
    const { name } = ctx.params
    const { id } = ctx.query
    ctx.body = (name ? `NAME : ${name}` : 'I don\'t have name') + '\n' + (id ? `ID : ${id}` : `I don\'t have ID`)
})


app.use(router.routes()).use(router.allowedMethods())

app.listen(8888 , () => {
    console.log('listening to port 8888');
})