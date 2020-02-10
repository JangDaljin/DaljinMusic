const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const UserModel = require('../Database/mongoDB').userModel

const initResponse = {
    userId : '',
    userName : '',
    isAuthenticated : false,
    message : ''
}

router.post('/login' , doAsync(async (req , res , next) => {
    const { userId , userPw } = req.body
    const response = { ...initResponse }

    try {
        const user = await UserModel.findOne({'userId' : userId})
        if(user !== null) {
            if(user.authenticate(userPw)) {
                req.session.userId = user.userId
                req.session.userName = user.userName
                req.session.isAuthenticated = true

                response.userId = user.userId
                response.userName = user.userName
                response.isAuthenticated = true
                response.message = ''
            }
            //비밀번호 오류
            else {
                console.log('아이디 또는 비밀번호가 잘못되었습니다.')
                response.message = '아이디 또는 비밀번호가 잘못되었습니다.'
            }
        }
        else {
            //아이디 오류
            console.log('아이디 또는 비밀번호가 잘못되었습니다.')
            response.message = '아이디 또는 비밀번호가 잘못되었습니다.'
        }
    }
    catch(err) {
        response.message = '오류 발생'
    }
    res.json(response)
}))

router.post('/logout' , (req , res) => {
    const response = { ...initResponse }
    req.session.destroy((err) => {})
    res.json(response);
})

router.post('/islogged' , (req , res) => {
    const response = { ...initResponse }

    response.userId = req.session.userId || ''
    response.userName = req.session.userName || ''
    response.isAuthenticated = req.session.userName || false
    
    res.json(response)
})

module.exports = router