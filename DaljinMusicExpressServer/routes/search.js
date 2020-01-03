const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const Dlogger = require('../Dlogger')
const MusicModel = require('../Database/mongoDB').musicModel
const SingerModel = require('../Database/mongoDB').singerModel
const AlbumModel = require('../Database/mongoDB').albumModel

router.get('/song' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : ''
    }
    const { searchtext } = req.query
    
    try {
        const musics = await MusicModel.find({ 'song' : searchtext }).populate('singer album')
        response.foundList = musics
        response.message = Dlogger.info("검색 완료")
    }
    catch(err) {
        response.message = Dlogger.info("검색 실패")
    }
    res.json(response)
}))

router.get('/singer' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : ''
    }
    const { searchtext } = req.query
    
    try {
        const singer = await SingerModel.findOne({ 'name' : searchtext })
        const musics = await MusicModel.find({'singer' : singer._id}).populate('singer album')
        response.foundList = musics
        response.message = Dlogger.info("가수 검색 완료")
    }
    catch(err) {
        console.error(err)
        response.message = Dlogger.error("가수 검색 실패")
    }
    res.json(response)
}))

router.get('/album' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : ''
    }
    const { searchtext } = req.query
    
    try {
        const album = await AlbumModel.find({ 'name' : searchtext }).select('_id')
        const musics = await MusicModel.find({'album' : { $in : album }}).populate('singer album')
        response.foundList = musics
        response.message = Dlogger.info("앨범 검색 완료")
    }
    catch(err) {
        response.message = Dlogger.info("앨범 검색 실패")
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

module.exports = router