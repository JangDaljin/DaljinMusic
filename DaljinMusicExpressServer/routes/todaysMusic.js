const express = require('express')
const router = express.Router()


router.get('/' , (req , res) => {

    const response = {
        song : 'LIKE IT',
        singer : 'TWICE',
        album : '미니 1집',
        albumImgUri : '/twice.jpg'
    }

    res.json(response)
})




module.exports = router;