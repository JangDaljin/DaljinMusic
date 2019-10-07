const express = require('express')
const router = express.Router()


const response = {
    userId : '',
    userName : '',
    authenticate : false,
}

router.post('/login' , (req , res) => {
    const userId = req.body.userId || ''
    const userPw = req.body.userPw || ''

    const newResponse = { ...response }

    if(userId === 'daljin' && userPw === 'daljin') {
        req.session.userId = 'ID TEST'
        req.session.userName = 'NAME TEST'
        req.session.isAuthenticated = true;

        newResponse.userId = 'ID TEST'
        newResponse.userName = 'NAME TEST'
        newResponse.isAuthenticated = true
    }
    res.json(newResponse)
})

router.post('/logout' , (req , res) => {
    const newRes = { ...response }
    req.session.destroy((err) => {})
    res.json(newRes);
})

router.post('/islogged' , (req , res) => {
    

    const newRes = { ...response }

    newRes.userId = req.session.userId || ''
    newRes.userName = req.session.userName || ''
    newRes.isAuthenticated = req.session.userName || false
    
    res.json(newRes)
})

module.exports = router