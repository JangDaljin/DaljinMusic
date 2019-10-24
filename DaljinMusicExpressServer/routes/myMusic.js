const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const MusicModel = require('../Database/mongoDB').musicModel
const UserModel = require('../Database/mongoDB').userModel
const musicListModel = require('../Database/mongoDB').musicListModel

router.post('/' , doAsync(async (req , res , next) => {
    console.log(`MYMUSC /`)
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
    console.dir(response)
    res.json(response)

    /*
    for(let i = 0 ; i < 3; i++) {
        response.push({
            listName : `TEST${i+1}`,
            items : []
        })
        for(let j = 1; j <= 108; j++) {
            response[i].items.push({
                id : `${i+1}-${j}`,
                song : `SONG ${i+1}-${j}`,
                singer : `SINGER ${i+1}-${j}`,
                album : `ALBUM ${i+1}-${j}`,
                time : `TIME ${i+1}-${j}`,
                album : `ALBUM ${i+1}-${j}`,
                albumImgUri : `twice${(j%2)+1}.jpg`,
            })
        }
    }
    res.json(response)
    */
}))

const multer = require('multer')
const uploadStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        console.log('here1')
        cb(null , `musics/`)
    },
    filename : (req , file , cb) => {
        
        console.log('here2')
        cb(null , file.originalname)
    }
})
const upload = multer({storage : uploadStorage , limits : { fileSize : 1024 * 1024 * 1024 * 1024}})

router.post('/upload' , upload.array('filelist'), (req, res) => {
    const userId = req.session.userId

    console.log(req.files)

    const response = {
        uploadProgess : 10
    }

    res.json(response)
})

router.post('/makemusiclist' , doAsync(async(req , res , next) => {
    const { userId , listName } = req.body
    console.dir(`USERID : ${userId} , LISTNAME : ${listName}`)
    const response = {
        message : ''
    }

    if(userId === req.session.userId) {
        try {
            const user = await UserModel.findOne({'userId' : userId })
            if(user !== null) {
                user.myMusicLists.push({ 'listName' : listName , 'list' : []})
            }
            await user.save()
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

router.post('/deletemusiclist' , doAsync(async(req , res , next) => {
    const { userId , listId } = req.body;
    const response = {
        message : ''
    }

    console.log(`userId : ${userId} , listId : ${listId}`)

    if (userId === req.session.userId) {
        try {
            const user = await UserModel.findOne({ 'userId' : userId})
            if(user !== null) {
                console.log(user.myMusicLists)
                const index = user.myMusicLists.findIndex((value) => ( value._id == listId ) )
                user.myMusicLists.splice(index , 1)
                console.log(user.myMusicLists)
                await user.save()
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