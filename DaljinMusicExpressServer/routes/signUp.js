const express = require('express')
const router = express.Router()



router.post('/' , (res , req) => {

})

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



module.exports = router;