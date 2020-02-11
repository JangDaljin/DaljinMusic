const express = require('express')
const router = express.Router()
const doAsync = require('./async')
const UserModel = require('../Database/mongoDB').userModel
const MusicModel = require('../Database/mongoDB').musicModel


const Dlogger = require('../Dlogger')
router.get('/' , doAsync(async(req , res , next) => {
    const { userid , musiccount } = req.query

    const musicCount = parseInt(musiccount)
    const response = {
        message : '',
        suggestMusics : []
    }
    
    //console.log(`userid : ${userid}`)

    //아이디가 이상하면 
    if(typeof userid === 'undefined' || typeof userid === null || userid.trim() === '') {
        try {
            const randoms = []
            const documentSize = await MusicModel.countDocuments({})
            
            while(randoms.length !== musicCount ) {
                const random = Math.floor((Math.random() * documentSize))

                let result = true;
                for(const r of randoms) {
                    if(r === random) {
                        result = false;
                        break;
                    }
                }
                if(result) {
                    randoms.push(random)
                }
            }

            for(const random of randoms) {
                const randomMusic = await MusicModel.findOne({}).skip(random).populate('singer album').lean()
                response.suggestMusics.push(randomMusic)
            }

            response.message = Dlogger.info(`[NOT LOGGED-SUGGESTMUSIC] 추천음악 조회 성공`)
        }
        catch(e) {
            response.message = Dlogger.error(`[NOT LOGGED-SUGGESTMUSIC] 추천음악 조회 실패`)
        }
    }
    else {
        try {
            const user = await UserModel.findOne({ 'userId' : userid}).lean()
            const preferCategoryCounter = user.preferCategoryCounter
            console.log(preferCategoryCounter)
            
            let totalCount = 0;
            let resizePreferCategoryCounter = []
            for(let i = 0 ; i < preferCategoryCounter.length ; i++) {
                totalCount += preferCategoryCounter[i].count
                resizePreferCategoryCounter.push(JSON.parse(JSON.stringify(preferCategoryCounter[i])))
            }

            console.log('문제없음')
            let maxValueIndex = 0
            let minValueIndex = 0
            let extractCount = 0
            for(let i = 0 ; i < resizePreferCategoryCounter.length; i++) {
                //최대값 인덱스 저장
                if(resizePreferCategoryCounter[i].count > resizePreferCategoryCounter[maxValueIndex].count) {
                    maxValueIndex = i
                }
                console.log('error check1')

                //최소값 인덱스 저장
                if(resizePreferCategoryCounter[i].count < resizePreferCategoryCounter[minValueIndex].count) {
                    minValueIndex = i
                }
                console.log('error check2')
                //musiccount만큼 갯수 뽑기
                resizePreferCategoryCounter[i].count = Math.round(resizePreferCategoryCounter[i].count / totalCount * musicCount)
                extractCount += resizePreferCategoryCounter[i].count
                console.log('error check3')
            }

            console.log(`max : ${maxValueIndex}`)
            console.log(`min : ${minValueIndex}`)
            console.log(`ex : ${extractCount}`)
            console.log(resizePreferCategoryCounter)

            if(extractCount !== musicCount) {
                if(extractCount > musicCount) {
                    resizePreferCategoryCounter[minValueIndex].count -= extractCount - musicCount
                }

                else if(extractCount < musicCount) {
                    resizePreferCategoryCounter[maxValueIndex].count += musicCount - extractCount
                }
            }

            
            //선호도 비율에 맞게 노래 가져오기
            for(let i = 0 ; i < resizePreferCategoryCounter.length ; i++) {

                const randoms = []
                const documentSize = await MusicModel.countDocuments({'category' : resizePreferCategoryCounter[i].categoryId})
                
                while(randoms.length !== resizePreferCategoryCounter[i].count ) {
                    const random = Math.floor(Math.random() * documentSize)

                    let result = true;
                    for(const r of randoms) {
                        if(r === random) {
                            result = false;
                            break;
                        }
                    }
                    if(result) {
                        randoms.push(random)
                    }
                }

                for(random of randoms) {
                    const randomMusic = await MusicModel.findOne({'category' : resizePreferCategoryCounter[i].categoryId}).skip(random).populate('singer album').lean()
                    response.suggestMusics.push(randomMusic)
                }
                //console.log(response)
            }
            response.message = Dlogger.info('[LOGGED-SUGGESTMUSIC]추천음악 조회 완료')
        }  
        catch(e) {
            console.error(e)
            response.message = Dlogger.error('[LOGGED-SUGGESTMUSIC]추천음악 조회 실패')
        }
    }

    res.json(response)
}))






module.exports = router;