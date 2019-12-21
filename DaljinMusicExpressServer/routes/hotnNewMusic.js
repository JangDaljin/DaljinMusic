const express = require('express')
const router = express.Router()

const IndexModel = require('../Database/mongoDB').indexModel
const doAsync = require('./async')
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
    }
    catch(e) {
        console.error(e)
        response.message = '조회 오류'
    }
    
    console.log(response)
    res.json(response)
}))


module.exports = router;