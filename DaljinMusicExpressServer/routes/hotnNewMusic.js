const express = require('express')
const router = express.Router()

const IndexModel = require('../Database/mongoDB').indexModel
const doAsync = require('./async')

const Dlogger = require('../Dlogger')
router.get('/' , doAsync(async(req , res , next) => {
    
    const response = {
        message : '',
        list : []
    }
    try {
        const index = await IndexModel.findOne({}).populate(
            {
                path : 'hotAndNew.music' , 
                populate : 'singer album'
            }).lean()
        response.list = index.hotAndNew
        response.message = '조회 완료'
    }
    catch(e) {
        console.error(e)
        response.message = '조회 오류'
    }
    
    Dlogger.info(response.message)
    res.json(response)
}))


module.exports = router;