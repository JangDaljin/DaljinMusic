const express = require('express')
const router = express.Router()
const doAsync = require('./async')

router.get('/' , doAsync(async (req , res , next) => {

    res.json({
        ok : true
    })
}))

module.exports = router;