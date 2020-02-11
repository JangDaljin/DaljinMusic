const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const UserModel = require('../Database/mongoDB').userModel
const MusicModel = require('../Database/mongoDB').musicModel
const fs = require('fs')
const Dlogger = require('../Dlogger')

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
        console.log('getmusiclists 검증 실패')
        response.message = '검증 실패'
    }
    res.json(response)
}))

router.post('/getmusiclist' , doAsync(async (req , res , next) => {
    const { userId , listName } = req.body
    const response = {
        message : '',
        myMusicList : [],
        error : true,
    }

    console.log('getmusiclist')

    if( userId === req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId}).populate(
                {
                    path : 'myMusicLists.list',
                    populate : 'singer album'
                }
            ).lean()


            if(user !== null) {
                const foundItem = user.myMusicLists.find(value => value.listName === listName)
                if(typeof foundItem === 'undefined') {
                    throw new Error(`리스트 이름 찾을 수 없음(${listName})`)
                }
                response.myMusicList = foundItem
                console.dir(response.myMusicList)
                response.message = '검색 완료'
                response.error = false
            }
        }
        catch (err) {
            console.err(err)
            console.log('검색 실패')
            response.error = true
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
            const user = await UserModel.findOne({'userId' : userId }).populate({
                path : 'myMusicLists.list',
                populate : 'singer album'
            })
            if(user !== null) {
                user.myMusicLists.push({ 'listName' : listName , 'list' : []})
                await user.save()
                response.myMusicLists = user.myMusicLists
                response.message = '생성 완료'
            }
        }
        catch (err) {
            console.error(err)
            console.log("생성 오류")
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
            const user = await UserModel.findOne({ 'userId' : userId}).populate({
                path : 'myMusicLists.list',
                populate : 'singer album'
            })
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
    res.json(response)
}))

router.post('/renamemusiclist' , doAsync( async ( req , res , next) => {
    const { userId , listId , name } = req.body

    console.log(`userId : ${userId} , listId : ${listId} , name : ${name}`)
    const response = {
        message : '',
        myMusicLists : []
    }

    if(userId == req.session.userId) {
        try {
            const user = await UserModel.findOne({ 'userId' : userId}).populate({
                path : 'myMusicLists.list',
                populate : 'singer album'
            })
            if(user !== null) {
                const index = user.myMusicLists.findIndex(value => value._id == listId)
                console.log(index)
                user.myMusicLists[index].listName = name
                await user.save()
                response.message = "수정 성공"
                response.myMusicLists = user.myMusicLists
            }
        }
        catch(err) {
            console.error(err)
            console.log('수정에러')
            response.message = '수정에러'
        }
    
    }
    else {
        console.log('검증 에러')
        response.message = '검증 에러'
    }

    res.json(response)
}))

router.post('/addmusicinlist' , doAsync(async (req , res , next) => {
    
    const response = {
        message : '',
        myMusicLists : []
    }

    const { userId , listId , musicId } = req.body;
    console.dir(musicId)
    if(userId == req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId}).populate({
                path : 'myMusicLists.list',
                populate : 'singer album'
            })
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
            
            response.myMusicLists = user.myMusicLists
            console.log("음악 추가 성공")
            response.message = "음악 추가 성공"
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
        message : '',
        myMusicLists : [],
    }

    const { userId , listId , indexes } = req.body;

    if(userId == req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId}).populate({
                path : 'myMusicLists.list',
                populate : 'singer album'
            })
            const myMusicList = user.myMusicLists.find(obj => obj._id == listId).list

            const sortedMusicIndexes = indexes.sort((a , b) => b - a)

            for(const index of sortedMusicIndexes) {
                myMusicList.splice(index , 1)
            }

            await user.save()
            response.myMusicLists = user.myMusicLists
            response.message = '삭제 성공'
            console.log('삭제 성공')
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
        addedPlayList : [],
    }
    const { userId , addList } = req.body
    console.log(addList)
    try {
        const foundMusics = await MusicModel.find({'_id' : { $in : addList }}).populate('singer album').lean()
        response.addedPlayList = foundMusics
        if(userId == req.session.userId) {
            
            const user = await UserModel.findOne({'userId' : userId})
            
            //추가된 아이템 시작 인덱스
            response.addedIndex = user.playList.length

            for(foundMusic of foundMusics) {
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
        response.message = '저장 실패'
    }

    Dlogger.info(response.message)
    res.json(response)
}))

router.post('/playlistitemremove' , doAsync(async (req , res , next) => {
    const response = {
        message : '',
    }

    const { userId , removeList } = req.body
    //console.log(removeList)
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

router.get('/playmusic' , doAsync(async (req , res , next) => {

    const { musicid , userid } = req.query

    try {
        const music = await MusicModel.findOne({'_id' : musicid}).populate('singer album')

        music.totalPlayCount++;
        music.monthPlayCount++;
        music.weekPlayCount++;
        music.dayPlayCount++;

        //console.log(music.totalPlayCount)
        if(typeof userid !== 'undefined' && userid.trim() !== '') {

            const user = await UserModel.findOne({ 'userId' : userid })
            
            //최근 들은 음악리스트에 추가(100개 까지 저장)
            if(user.recentlyPlayList.length > 100) {
                user.recentlyPlayList.shift()
            }
            user.recentlyPlayList.push(musicid)


            //선호도 카운터 증가
            let loopFlag = false
            for(let i = 0 ; i < user.preferCategoryCounter.length ; i++) {
                if(user.preferCategoryCounter[i].categoryId.equals(music.category)) {
                    //console.log('equals')
                    user.preferCategoryCounter[i].count += 1
                    //편중현상 줄이기
                    if(user.preferCategoryCounter[i].count > 10) {
                        user.preferCategoryCounter[i].count = user.preferCategoryCounter[i].count / 2
                    }
                    loopFlag = true
                    break;
                }
            }
            if(!loopFlag) {
                user.preferCategoryCounter.push({ 'categoryId' : music.category , 'count' : 1})
            }

            await user.save()
        }

        

        const filePath = music.filePath
        const fileStat = fs.statSync(filePath)

        await music.save()



        res.writeHead(206, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileStat.size,
            'Accepts-Ranges' : 'bytes',
            'Content-Range' : `bytes 0-1023/${fileStat.size}`
        });

        const rs = fs.createReadStream(filePath)
        rs.pipe(res)
    }
    catch(err) {
        console.error(err)
        res.end()
    }
    

}))



module.exports = router