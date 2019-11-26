const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const UserModel = require('../Database/mongoDB').userModel
const MusicModel = require('../Database/mongoDB').musicModel

router.post('/getmusiclists' , doAsync(async (req , res , next) => {
    const { userId } = req.body
    const response = {
        message : '',
        myMusicLists : []
    }


    if( userId === req.session.userId) {
        try {
            const user = await UserModel.findOne({ 'userId' : userId}).populate(
                {
                    path : 'myMusicLists.list',
                    populate : 'singer album'
                }
            ).lean()


            if(user !== null) {
                response.myMusicLists = user.myMusicLists
                response.message = '검색 완료'
            }
        }
        catch (err) {
            console.err(err)
            console.log('검색 실패')
            response.message = '검색 실패'
        }
    }
    else {
        console.log('검증 실패')
        response.message = '검증 실패'
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

router.post('/addmusicinlist' , doAsync(async (req , res , next) => {
    
    const response = {
        message : '',
        myMusicList : []
    }

    const { userId , listId , musicId } = req.body;

    if(userId == req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId})
            const musicList = user.myMusicLists.find(obj => obj._id == listId)
            const list = musicList.list
            if(Array.isArray(musicId)) {
                for(const _musicId of musicId) {
                    list.push(_musicId)
                }
            }
            else {
                list.push(musicId)
            }
            await user.save()
        }
        catch(err) {
            console.err(err)
            console.log('음악 추가 실패')
            response.message = '음악 추가 실패'
        }
    }
    else {
        console.log('아이디 검증 실패')
        response.message = '아이디 검증 실패'
    }

    res.json(response)
}))

router.post('/removemusicinlist' , doAsync(async (req , res , next) => {
    const response = {
        message : ''
    }

    const { userId , listId , musicId } = req.body;

    if(userId == req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId})
            const musicList = user.myMusicLists.find(obj => obj._id == listId)
            const list = musicList.list
            if(Array.isArray(musicId)) {
                for(const _musicId of musicId) {
                    list.splice(list.findIndex( obj => obj._id == _musicId))
                }
            }
            else {
                list.splice(list.findIndex( obj => obj._id == musicId))
            }
        }
        catch(err) {
            console.err(err);
            console.log('삭제 실패')
            response.message = '삭제 실패'
        }
    }
    else {
        console.log('아이디 검증 실패')
        response.message = '아이디 검증 실패'
    }

    res.json(response)
}))

router.post('/getplaylist' , doAsync(async (req , res , next) => {
    const response = {
        message : '',
        playList : []
    }

    const { userId } = req.body
    if(userId == req.session.userId) {
        const user = await UserModel.findOne({ 'userId' : userId}).populate({path : 'playList' , populate : 'singer album'}).lean()
        response.playList = user.playList
    }
    else {
        console.log('검증 실패')
        response.message = '검증 실패'
    }

    res.json(response)
}))

router.post('/playlistitemadd' , doAsync(async (req , res , next) => {
    const response = {
        message : '',
        addedPlayList : []
    }
    const { userId , addList } = req.body

    try {
        const foundMusics = await MusicModel.find({'_id' : { $in : addList }}).populate('singer album').lean()
        response.playList = foundMusics


        if(userId == req.session.userId) {
            console.log(foundMusics)
                const user = await UserModel.findOne({'userId' : userId})
                for(const foundMusic of foundMusics) {
                    user.playList.push(foundMusic._id)
                }
                await user.save()
        }
        else {
            console.log('아이디 검증 실패')
            response.message = '아이디 검증 실패'
        }
    }
    catch (err) {
        console.error(err)
        console.message += '저장 실패'
    }

    
    res.json(response)
}))

router.post('/playlistitemremove' , doAsync(async (req , res , next) => {
    const response = {
        message : '',
    }

    const { userId , removeList } = req.body
    console.log(removeList)
    if(userId == req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId})
            for(let cnt = removeList.length-1 ; cnt > -1 ; cnt--) {
                console.log(removeList[cnt])
                user.playList.splice(removeList[cnt] , 1)
            }
            await user.save()
        }
        catch(err) {
            console.error(err)
            response.message = '삭제 실패'
        }
    }
    else {
        console.log('아이디 검증 실패')
        response.message = '아이디 검증 실패'
    }
    res.json(response)

}))

router.post('/playmusic' , doAsync(async (req , res , next) => {
    const response = {
        message : ''
    }

    const { _id } = req.body

    console.log(_id)

    res.json(response)
}))



module.exports = router