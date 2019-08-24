//외부모듈
const express = require('express')
, session = require('express-session')


//내부모듈
const indexRouter = require('./routes/Index')
, musicRouter = require('./routes/Music')


var app = express()

//공개 경로 설정
app.use('/' , express.static('public'))

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
app.use('/' , indexRouter)

//서버오픈
app.listen(8888 , () => {
    console.log('8888 listen')
})

console.log('aaaa');