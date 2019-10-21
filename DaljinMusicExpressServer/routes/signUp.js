const express = require('express')
const router = express.Router()

const UserModel = require('../Database/mongoDB').userModel

const getyyyyMMddhhmmss = (date = new Date()) => {

    const yyyy = date.getFullYear()
    const MM = date.getMonth() + 1
    const dd = date.getDay()
    const hh = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()

    return `${yyyy}-${(MM > 9)? MM : '0'+MM}-${(dd > 9)? dd : '0'+dd} ${(hh > 9)? hh : '0'+hh}:${(mm > 9)? mm : '0'+mm}:${(ss > 9)? ss : '0'+ss}`
}

router.post('/idcheck' , (req , res) => {
    const {userId} = req.body;
    
    const response = {
        isOk : false,
        message : '사용불가'
    }

    UserModel.findOne({userid : userId} , (err , user) => {
        if(user === null) {
            response.isOk = true,
            response.message = '사용가능' 
        }
        res.json(response);
    })
})

router.post('/' , (req , res) => {
    const { userId , userPw , userName } = req.body;
    const response = {
        message : '회원가입에 실패하였습니다.',
        isOk : false
    };

    if(userId !== '' && userId !== 'undefined' &&
        userPw !== '' && userId !== 'undefined' &&
        userName !== '' && userName !== 'undefined')
        {
            const nowTime = getyyyyMMddhhmmss()


            UserModel.findOne({'userid' : userId})

            const newUser = new UserModel({
                'userid' : userId,
                'password' : userPw, //mongoose virtual
                'username' : userName,
                'signuptime' : nowTime,
            })
            newUser.save((err , user) => {
                if(err) {
                    console.error(err)
                }
                else {
                    response.message = '회원가입에 성공하였습니다.'
                    response.isOk = true
                }
                res.json(response)
            })
        }
})


module.exports = router;