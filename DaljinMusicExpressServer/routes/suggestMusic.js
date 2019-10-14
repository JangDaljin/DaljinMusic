const express = require('express')
const router = express.Router()


router.get('/:id' , (req , res) => {
    const { id } = req.params.id

    const response = [
        { 
            singer : "SINGER A" ,
            song : "SONG A" ,
            album : "ALBUM A",
            albumImgUri : '/twice2.jpg'
        },
        { 
            singer : "SINGER B" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice1.jpg'
        },
        { 
            singer : "SINGER C" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice1.jpg'
        }
    ]

    res.json(response)
})

router.get('/' , (req , res) => {
    const response = [
        { 
            singer : "SINGER A" ,
            song : "SONG A" ,
            album : "ALBUM A",
            albumImgUri : '/twice2.jpg'
        },
        { 
            singer : "SINGER B" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice1.jpg'
        },
        { 
            singer : "SINGER C" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice2.jpg'
        }
    ]

    res.json(response)
})






module.exports = router;