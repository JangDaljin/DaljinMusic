const express = require('express')
const router = express.Router()
const doAsync = require('./async')

const TestModel = require('../Database/mongoDB').testModel
const RefTestModel = require('../Database/mongoDB').refTestModel



router.post('/makeref' , doAsync(async (req , res , next) => {
    const response = {
        message : '',
        outputData : null
    }
    console.log('MAKE REF START')
    try {
        for(let i = 0 ; i < 20; i++) {
            const newRefTestModel = new RefTestModel({
                identity : Math.round((Math.random() * 10000) + 1),
                item1 : 'a',
                item2 : 'b',
                item3 : 'c',
            })
            await newRefTestModel.save()
            response.message = `1.데이터 생성 성공`
        }
    }
    catch (err) {
        console.dir(err)
        response.message = `1.데이터 생성 실패`
    }
    console.log('MAKE REF END')
    res.json(response)
}))

router.post('/maketest' , doAsync( async (req , res , next) => {
    const inputData = req.body.outputData

    const response = {
        message : '',
        outputData : null
    }

    console.log(`MAKE TEST START`)
    try {
        const newModel = new TestModel({
            identity : 20,
            refdata : []
        })  
        await newModel.save()

        const tempModel = await TestModel.findOne({ identity : 20 })
        const tempRef1 = (await RefTestModel.findOne({ identity : 1456 }))._id
        const tempRef2 = (await RefTestModel.findOne({ identity : 4326 }))._id
        tempModel.refdata.push(tempRef1)
        tempModel.refdata.push(tempRef2)
        await tempModel.save()

        response.message = `테스트 데이터 생성 완료`   
    }
    catch (err) {
        console.dir(err)
        response.message = '테스트 데이터 생성 실패'
    }
    console.log(`MAKE TEST END`)
    res.json(response)
}))


router.post('/start' , doAsync( async (req , res , next) => {
    

    const tempTestModel = await TestModel.findOne({ identity : 20})
    console.log(tempTestModel.refdata)

    const tempTestModelPo = await TestModel.findOne({ identity : 20}).populate('refdata')
    console.log(tempTestModelPo.refdata)
}))


module.exports = router