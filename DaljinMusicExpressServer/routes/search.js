const express = require('express')
const router = express.Router()
const doAsync = require('./async')

const MusicModel = require('../Database/mongoDB').musicModel
const SingerModel = require('../Database/mongoDB').singerModel
const AlbumModel = require('../Database/mongoDB').albumModel

router.get('/song' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : ''
    }
    const { search } = req.query
    
    try {
        const foundDoc = await MusicModel.find({ 'song' : search })
        console.log(foundDoc)
        response.foundList = foundDoc
        response.message = "검색 완료"
    }
    catch(err) {
        console.log('search/song 검색 실패')
        response.message = "검색 실패"
    }
    res.json(response)
}))

router.get('/singer' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : ''
    }
    const { search } = req.query
    
    try {
        const foundDoc = await SingerModel.find({ 'name' : search })
        console.log(foundDoc)
        response.foundList = foundDoc
        response.message = "검색 완료"
    }
    catch(err) {
        console.log('search/singer 검색 실패')
        response.message = "검색 실패"
    }
    res.json(response)
}))

router.get('/album' , doAsync( async (req , res , next) => {
    const response = {
        foundList : [],
        message : ''
    }
    const { search } = req.query
    
    try {
        console.log(search)
        const foundDoc = await AlbumModel.find({ 'name' : search })
        console.log(foundDoc)
        response.foundList = foundDoc
        response.message = "검색 완료"
    }
    catch(err) {
        console.log('search/album 검색 실패')
        response.message = "검색 실패"
    }
    res.json(response)
}))

module.exports = router