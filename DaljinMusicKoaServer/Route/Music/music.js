const Router = require('koa-router')

const music = new Router();


//자신 음악리스트 요청
music.get('/mymusic' , (ctx) => {

})

//자신 음악리스트 수정
music.patch('/mymusic' , (ctx) => {

})

//다른 사람 음악리스트 요청
music.get('/othersmusic' , (ctx) => {

})

//음악 재생
music.get('/streammusic' , (ctx) => {

})


module.exports = music;