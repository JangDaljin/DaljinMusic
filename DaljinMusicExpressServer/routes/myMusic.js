const express = require('express')
const router = express.Router()

router.post('/' , (req , res) => {
    const userId = req.body || ''
    const response = []

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
})

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



module.exports = router