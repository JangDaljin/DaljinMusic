const express = require('express')
const router = express.Router()

const UserModel = require('../Database/mongoDB').userModel
const MusicModel = require('../Database/mongoDB').musicModel

router.get('/' , (req , res) => {
    const { userid } = req.query

    const response = [
        { 
            singer : "SINGER A" ,
            song : "SONG A" ,
            album : "ALBUM A",
            albumImgUri : '/twice2.jpg'
        },
        { 
            singer : "SINGER B" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice1.jpg'
        },
        { 
            singer : "SINGER C" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice2.jpg'
        }
    ]

    res.json(response)
})






module.exports = router;