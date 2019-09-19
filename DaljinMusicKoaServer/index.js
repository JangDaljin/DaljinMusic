const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')


const router = new Router()
const authRouter = require('./Route/Auth/auth')
const musicRouter = require('./Route/Music/music')

router.get('/' , (ctx) => {
    ctx.body = '홈'
})

router.use('/auth' , authRouter.routes())
router.use('/music' , musicRouter.routes())


app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(8888 , () => {
    console.log('listening to port 8888');
})