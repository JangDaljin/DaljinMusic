//dotenv 사용
require('dotenv').config()

//외부모듈
const express = require('express')
, session = require('express-session')
, http = require('http')
, cors = require('cors')
, bodyParser = require('body-parser')

//내부모듈
const AuthRouter = require('./routes/auth')
const SignUpRouter = require('./routes/signUp')
const TodaysMusicRouter = require('./routes/todaysMusic')
const SuggestMusicRouter = require('./routes/suggestMusic')
const HotnNewMusicRouter = require('./routes/hotnNewMusic')
const Top100Router = require('./routes/top100')
const MyMusicRouter = require('./routes/myMusic')
const TestRouter = require('./routes/test')
const AdminRouter = require('./routes/admin')
const SearchRouter = require('./routes/search')

//DB
const MongoDB = require('./Database/mongoDB')

//기본 설정사항
const PORT = process.env.PORT

//EXPRESS 사용
var app = express()

//크로스 브라우저 가능
app.use(cors({credentials:true , origin:'http://localhost:3000'}))

//바디파서 사용(POST 사용)
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

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
app.use('/hotnnewmusic' , HotnNewMusicRouter)
app.use('/top100' , Top100Router)
app.use('/mymusic' , MyMusicRouter)
app.use('/test' , TestRouter)
app.use('/admin' , AdminRouter)
app.use('/search' , SearchRouter)




http.createServer(app).listen(PORT , () => {
    console.log(`SERVER OPEN (PORT : ${PORT})`)
    MongoDB.connect();
})