const express = require('express')
const router = express.Router()

const IndexModel = require('../Database/mongoDB').indexModel
const doAsync = require('./async')


router.get('/' , doAsync(async (req , res , next) => {

    const response = {
        music : null,
        message : ''
    }



    try {
        const index = await IndexModel.findOne({}).populate({ path : 'todaysLive' , populate : 'singer album' }).lean()
        //console.log(index.todaysLive)
        response.music = index.todaysLive
        response.message = '조회 성공'
    }
    catch(e) {
        console.error(e)
        response.message = '조회 에러 발생'
    }



    res.json(response)
}))




module.exports = router;