//dotenv 사용
require('dotenv').config()

//외부모듈
const express = require('express')
, session = require('express-session')
, http = require('http')
, cors = require('cors')
, bodyParser = require('body-parser')
, fs = require('fs')
, util = require('util')

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
const { PORT , MUSIC_PATH , UPLOAD_PATH , ALBUM_IMG_PATH , ALBUM_IMG_URI } = process.env

//EXPRESS 사용
const app = express()

//크로스 브라우저 가능
app.use(cors({credentials:true , origin:'http://localhost:3000'}))

//바디파서 사용(POST 사용)
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

//공개 경로 설정
//app.use('/' , express.static('../public'))
app.use(`${ALBUM_IMG_URI}` , express.static('./albumImgs'))

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


const directorySetting = async () => {
    const exists = util.promisify(fs.exists)
    const mkdir = util.promisify(fs.mkdir)

    if(await exists(UPLOAD_PATH)) {
        console.log(`UPLOAD PATH : ${UPLOAD_PATH} ALREADY EXIST`)
    }
    else {
        await mkdir(UPLOAD_PATH)
        console.log(`UPLOAD PATH : ${UPLOAD_PATH} MAKE COMPLETE`)
    }
    if(await exists(MUSIC_PATH)) {
        console.log(`MUSIC PATH : ${MUSIC_PATH} ALREADY EXIST`)
    }
    else {
        await mkdir(MUSIC_PATH)
        console.log(`MUSIC PATH : ${MUSIC_PATH} MAKE COMPLETE`)
    }
    if(await exists(ALBUM_IMG_PATH)) {
        console.log(`ALBUM PATH : ${ALBUM_IMG_PATH} ALREADY EXIST`)
    }
    else {
        await mkdir(ALBUM_IMG_PATH)
        console.log(`ALBUM PATH : ${ALBUM_IMG_PATH} MAKE COMPLETE`)
    }
}


const expressServer = http.createServer(app).listen(PORT , () => {
    directorySetting()
    console.log(`SERVER OPEN (PORT : ${PORT})`)
    MongoDB.connect();
})




