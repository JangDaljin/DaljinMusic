require('dotenv').config()

const express = require('express')
const router = express.Router()
const doAsync = require('./async')

const multer = require('multer')


const fs = require('fs')
const { UPLOAD_PATH , ALBUM_IMG_PATH , MUSIC_PATH } = process.env
const { getAudioDurationInSeconds } = require('get-audio-duration')

const MusicModel = require('../Database/mongoDB').musicModel
const SingerModel = require('../Database/mongoDB').singerModel
const AlbumModel = require('../Database/mongoDB').albumModel

const { getTime , isNUW } = require('../util')


const upload = multer({
    storage : multer.diskStorage({
        destination : function(req , file , cb) {
            cb(null , UPLOAD_PATH)
        },
        filename :  function(req,  file , cb) {
            const ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1 , file.originalname.length)
            cb(null , `${new Date().getTime()}.${ext}`)
        }
    })
})
router.post('/musicupload' , upload.fields( [ { name: 'musicFiles' } , { name : 'albumImgFiles' } ] ) , doAsync(async (req , res , next) => {
    const response = {
        message : ''
    }
    const songs = JSON.parse(req.body.songs)
    const singers = JSON.parse(req.body.singers)
    const albums  = JSON.parse(req.body.albums)
    const musicFiles = req.files['musicFiles']
    const albumImgFiles = req.files['albumImgFiles']


    /*
    console.log(`SONGS`)
    console.dir(songs)
    console.log(`SINGERS`)
    console.dir(singers)
    console.log(`ALBUMS`)
    console.dir(albums)
    console.log('MUSICFILES')
    console.dir(musicFiles)
    */
    


    //파일 길이만큼 반복
    for(let i = 0 ; i < musicFiles.length ; i++) {
        try {
            //음악 파일 옮기기
            const musicOldPath = `${UPLOAD_PATH}/${musicFiles[i].filename}`
            const musicNewPath = `${MUSIC_PATH}/${musicFiles[i].filename}`
            fs.renameSync(musicOldPath , musicNewPath)

            //앨범사진 파일 옮기기
            let albumNewPath = ''
            if(albums[i].isThere) {
                const albumOldPath = `${UPLOAD_PATH}/${albumImgFiles[albums[i].index].filename}`
                albumNewPath = `${ALBUM_IMG_PATH}/${albumImgFiles[albums[i].index].filename}`
                fs.renameSync(albumOldPath , albumNewPath)
            }

            //가수 저장
            const singerModel = new SingerModel({
                name : singers[i]
            })
            const singerDoc = await singerModel.save()
            
            //앨범 저장
            const albumModel = new AlbumModel({
                name : albums[i].name,
                imagePath : albumNewPath
            })
            const albumDoc = await albumModel.save()

            //음악 저장
            const musicModel = new MusicModel({
                song : songs[i],
                singer : singerDoc._id,
                album : albumDoc._id,
                filePath : musicNewPath,
                playTime : await getAudioDurationInSeconds(musicNewPath),
                uploadDate : getTime(),
                totalPlayCount : 0,
                weekPlayCount : 0,
                dayPlayCount : 0,
            })
            musicModel.save()

        }
        catch(err) {
            console.error(err)
            console.log('업로드 실패')
            response.message = '업로드 실패'
        }
    }
    

    res.json(response)
}))



module.exports = router