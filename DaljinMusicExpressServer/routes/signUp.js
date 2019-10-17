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
        toastMessage : '사용불가'
    }

    if(userId !== 'daljin') {
        response.isOk = true
        response.toastMessage = '사용가능'
    }
    
    console.log(userId);
    res.json(response);
})

router.post('/' , (req , res) => {
    const { userId , userPw , userName } = req.body;
    const response = {
        message : '회원가입에 실패하였습니다.'
    };

    if(userId !== '' && userId !== 'undefined' &&
        userPw !== '' && userId !== 'undefined' &&
        userName !== '' && userName !== 'undefined')
        {
            const nowTime = getyyyyMMddhhmmss()
            console.log(nowTime)
            const newUser = new UserModel({
                'userid' : userId,
                'userpw' : userPw,
                'sort' : 'test',
                'signuptime' : nowTime
            })
            newUser.save((err , user) => {
                if(err) {
                    console.error(err)
                }
                else {
                    response.message = '회원가입에 성공하였습니다.'
                }
                console.dir(user)
                res.json(response)
            })
            /*
            userid : { type : String, required : true , unique : true , trim : true },
    userpw : { type : String, required : true , trim : true },
    sort : { type : String, required : true },
    signuptime : { type : Date, required : true },
    updatetime : Date,
    mymusiclist : [MusicList],
    playlist : [Music],
    recentplaylist : [Music]
    
}*/
        }
})


module.exports = router;