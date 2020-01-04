const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const Dlogger = require('../Dlogger')
const MusicModel = require('../Database/mongoDB').musicModel
const SingerModel = require('../Database/mongoDB').singerModel
const AlbumModel = require('../Database/mongoDB').albumModel

router.get('/' , doAsync(async (req , res , next) => {
    const { searchtext } = req.query

    const response = {
        foundLists : {
            song : null,
            singer : null,
            album : null,
        },
        message : '검색 실패'
    }

    response.foundLists.song = await findMusicsByName(searchtext)
    response.foundLists.singer = await findMusicsBySingerName(searchtext)
    response.foundLists.album = await findMusicsByAlbumName(searchtext)
    if(response.foundLists.song !== null && response.foundLists.singer !== null && response.foundLists.album !== null) {
        response.message = '검색 성공'
    }
    res.json(response)
}))

router.get('/song' , doAsync( async (req , res , next) => {
    const response = {
        foundMusics : [],
        message : '검색 실패'
    }
    const { searchtext } = req.query
    response.foundMusics = findMusicsByName(searchtext)
    if(foundMusics !== null) {
        response.message = '검색 성공'
    }
    res.json(response)
}))

router.get('/singer' , doAsync( async (req , res , next) => {
    const response = {
        foundMusics : [],
        message : '검색 실패'
    }
    const { searchtext } = req.query
    response.foundMusics = findMusicsBySingerName(searchtext)
    if(response.foundMusics !== null) {
        response.message = '검색 성공'
    }
    res.json(response)
}))

router.get('/album' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : '검색 실패'
    }
    const { searchtext } = req.query
    response.foundMusics = findMusicsByAlbumName(searchtext)
    if(response.foundMusics !== null) {
        response.message = '검색 성공'
    }
    res.json(response)
}))

router.get('/singeridbyname' , doAsync(async (req , res , next) => {
    
    const response = {
        _id : null,
        message : ''
    }

    const { name } = req.query

    try {
        const singer = await SingerModel.findOne({'name' : name}).lean()
        response._id = singer._id
        response.message = '검색 완료'
    }
    catch(err) {
        response.message = '검색 실패'
    }
    //console.log(response)
    res.json(response)
}))

router.get('/albumidbyname' , doAsync(async (req , res , next) => {
    
    const response = {
        _id : null,
        message : ''
    }

    const { singer , name } = req.query

    try {
        const album = await AlbumModel.findOne({'singer' : singer ,'name' : name}).lean()
        response._id = album._id
        response.message = '검색 완료'
    }
    catch(err) {
        response.message = '검색 실패'
    }
    //console.log(response)
    res.json(response)
}))


const findMusicsByName = async (name) => {
    let musics = null
    try {
        musics = await MusicModel.find({ 'song' : name }).populate('singer album')
        Dlogger.info('노래 이름으로 노래 검색 성공')
    }
    catch(err) {
        Dlogger.error(err)
    }
    return musics
}

const findMusicsBySingerName = async (singerName) => {
    let musics = null
    try {
        const singer = await SingerModel.find({ 'name' : singerName }).select('_id')
        musics = await MusicModel.find({'singer' : { $in : singer }}).populate('singer album')
        Dlogger.info("가수 이름으로 음악 검색 성공")
    }
    catch(err) {
        Dlogger.error(err)
    }
    return musics
}

const findMusicsByAlbumName = async (albumName) => {
    let musics = null
    try {
        const album = await AlbumModel.find({ 'name' : albumName }).select('_id')
        musics = await MusicModel.find({'album' : { $in : album }}).populate('singer album')
        Dlogger.info("앨범 이름으로 음악 검색 완료")
    }
    catch(err) {
        Dlogger.info(err)
    }
    return musics
}


module.exports = router