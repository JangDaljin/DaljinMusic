//외부모듈
const express = require('express')
, session = require('express-session')
, http = require('http')
, bodyparser = require('body-parser')
, cors = require('cors')

//내부모듈
const AuthRouter = require('./routes/auth')
const SignUpRouter = require('./routes/signUp')
const TodaysMusicRouter = require('./routes/todaysMusic')
const SuggestMusicRouter = require('./routes/suggestMusic')

//DB
const MongoDB = require('./Database/mongoDB')

const {
    PORT : port = 8888,
    SESSION_KEY : sessionKey
} = process.env

var app = express()


//크로스 브라우저 가능
app.use(cors({credentials:true , origin:'http://localhost:3000'}))

//바디파서 사용(POST 사용)
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//공개 경로 설정
//app.use('/' , express.static('../public'))

//세션
app.use(session(
    {
        secret: 'DaljinMusicWebClient',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    }
))

//라우팅
app.use('/auth' , AuthRouter)
app.use('/signup' , SignUpRouter)
app.use('/todaysmusic' , TodaysMusicRouter)
app.use('/suggestmusic' , SuggestMusicRouter)



http.createServer(app).listen(port , () => {
    console.log(`SERVER OPEN (PORT : ${port})`)
    MongoDB.connect();
})