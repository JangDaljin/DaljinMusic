const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const MusicModel = require('../Database/mongoDB').musicModel
const UserModel = require('../Database/mongoDB').userModel

router.post('/' , doAsync(async (req , res , next) => {
    const { userId } = req.body
    const response = {
        message : '',
        myMusicLists : []
    }

    if( userId === req.session.userId) {
        try {
            const user = await UserModel.findOne({ 'userId' : userId}).lean().populate('mymusiclist.list' , 'list listname')
            if(user !== null) {
                response.myMusicLists = user.myMusicLists
                response.message = '검색 완료'
            }
        }
        catch (err) {
            response.message = '검색 실패'
        }
    }
    res.json(response)
}))


//음악 리스트 만들기
router.post('/makemusiclist' , doAsync(async(req , res , next) => {
    const { userId , listName } = req.body
    console.dir(`USERID : ${userId} , LISTNAME : ${listName}`)
    const response = {
        myMusicLists : [],
        message : ''
    }

    if(userId === req.session.userId) {
        try {
            
            const user = await UserModel.findOne({'userId' : userId })
            if(user !== null) {
                user.myMusicLists.push({ 'listName' : listName , 'list' : []})
            }
            await user.save()
            response.myMusicLists = user.myMusicLists
            response.message = '생성 완료'
        }
        catch (err) {
            response.message = '생성 오류'
        }
    }
    else {
        response.message = '검증 오류'
    }

    res.json(response)
}))

//음악 리스트 삭제
router.post('/deletemusiclist' , doAsync(async(req , res , next) => {
    const { userId , listId } = req.body;
    const response = {
        myMusicLists : [],
        message : ''
    }

    console.log(`userId : ${userId} , listId : ${listId}`)

    if (userId === req.session.userId) {
        try {
            const user = await UserModel.findOne({ 'userId' : userId})
            if(user !== null) {
                const index = user.myMusicLists.findIndex((value) => ( value._id == listId ) )
                user.myMusicLists.splice(index , 1)
                await user.save()

                response.myMusicLists = user.myMusicLists
                response.message = '삭제 완료'
            }
            else {
                response.message = '대상 조건을 찾을 수 없습니다.'
            }
        }
        catch(err) {
            console.dir(err)
            response.message = '데이터베이스 오류'
        }
    }
    else {
        response.message = '검증 실패'
    }


    console.log(response)
    res.json(response)
}))



module.exports = router