const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const session = require('koa-session')


const router = new Router()
const authRouter = require('./Route/Auth/auth')

router.get('/' , (ctx) => {
    ctx.body = '홈'
})

router.use('/auth' , authRouter.routes())

app.use(cors())
app.use(bodyParser())

const sessionConfig = {
    maxAge : 86400000,
}
app.use(session(sessionConfig , app))
app.keys = ['DaljinMusicWebClient']

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888 , () => {

})