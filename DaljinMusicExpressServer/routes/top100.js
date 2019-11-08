const express = require('express')
const router = express.Router()

const doAsync = require('./async')

const MusicModel = require('../Database/mongoDB').musicModel

router.get('/' , doAsync( async (req , res , next) => {

    const { from , to , mode} = req.query
    const p_from = parseInt(from)
    const p_to = parseInt(to)
    const p_mode = (mode === null || mode === undefined || mode == '' || mode == 'total') ? '-totalPlayCount' : (mode == 'week') ? '-weekPlayCount' : '-dayPlayCount' 
    const response = [];

    if(!(typeof(from) === String || typeof(to) === String) && ( p_from > 0 && p_to > 0) && (p_from < 101 && p_to < 101)) {

        const musics = await MusicModel.find().sort(p_mode).skip(p_from -1).limit(p_to - p_from + 1).lean()
        console.log(musics)
        for(let i = parseInt(from) ; i <= parseInt(to); i++) { 
            response.push(
                {
                    rank : `${i}`,
                    song : `SONG ${i}`,
                    singer : `SINGER ${i}`,
                    album : `ALBUM ${i}`,
                    albumImgUri : `twice${(i%2) + 1}.jpg`
                }
            )
        }

    }

    res.json(response)
}))




module.exports = router;