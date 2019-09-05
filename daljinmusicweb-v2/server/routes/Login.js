const express = require('express')
const router = express.Router()


router.post('/' , (req , res) => {
    const userid = req.body.userid || ''
    const userpw = req.body.userpw || ''

    console.dir(req.body)


    var isOK = false;
    if(userid === 'daljin' && userpw === 'daljin') {
        isOK = true;
    }

    res.json({ "isOK" : isOK})
})



module.exports = router