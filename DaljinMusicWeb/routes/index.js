const express = require('express')
const router = express.Router()


router.get('/' , (req, res) => {
    res.redirect('/index.html')
})

router.post('/login' , (req , res) => {
    console.log("login")
})



module.exports = router