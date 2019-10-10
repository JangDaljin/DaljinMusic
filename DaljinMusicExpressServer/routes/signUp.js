const express = require('express')
const router = express.Router()

const UserModel = require('../Database/mongoDB').userModel

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
        
    };


    res.json(response)
})


module.exports = router;