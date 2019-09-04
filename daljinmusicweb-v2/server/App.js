//외부모듈
const express = require('express')
, session = require('express-session')
, http = require('http')
, bodyparser = require('body-parser')
, cors = require('cors')

//내부모듈
const indexRouter = require('./routes/Index')
, musicRouter = require('./routes/Music')
, loginRouter = require('./routes/Login')


var app = express()


//크로스 브라우저 가능
app.use(cors())

//바디파서 사용
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//공개 경로 설정
app.use('/' , express.static('../public'))

//세션
app.use(session(
    {
        secret:'daljinMusic',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000
        }
    }
))

//라우팅
app.use('/music' , musicRouter)
app.use('/login' , loginRouter)
app.use('/' , indexRouter)


http.createServer(app).listen(8888)