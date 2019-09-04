const express = require('express')
const router = express.Router()


router.post('/' , (req , res) => {
    const userid = req.body.userid || ''
    const userpw = req.body.userpw || ''


    res.json({ "isOK" : "jksdfnasdfasdfasdfasfdsdf" })
})



module.exports = router