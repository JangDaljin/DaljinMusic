const express = require('express')
const router = express.Router()

const doAsync = require('./async')

const MusicModel = require('../Database/mongoDB').musicModel

router.get('/' , doAsync( async (req , res , next) => {

    const { from , to , mode} = req.query
    const p_from = parseInt(from)
    const p_to = parseInt(to)
    const p_mode = (mode === null || typeof mode === 'undefined' || mode == '' || mode == 'total') ? '-totalPlayCount' : (mode == 'week') ? '-weekPlayCount' : '-dayPlayCount' 
    const response = {
        from : p_from,
        to : p_to,   
        list : [],
        message : ''
    }


    console.log(`from : ${p_from} to : ${p_to}`)
    if(( p_from > 0 && p_to > 0) && (p_from < 101 && p_to < 101)) {
        try {
            const musics = await MusicModel.find().sort(p_mode).skip(p_from -1).limit(p_to - p_from + 1).populate('album').populate('singer').lean()

            if(musics.length < 1) throw new Error('검색 갯수 0개')


            musics.map((value, index) => { value.rank = index+1; return value})
            response.list = musics
            
        }
        catch(err) {
            console.error(err)
            response.message = "ERROR"
        }

    }
    res.json(response)
}))




module.exports = router;