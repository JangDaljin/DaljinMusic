const express = require('express')
const router = express.Router()


router.get('/' , (req , res) => {

    const response = [
        { 
            singer : "SINGER A" ,
            song : "SONG A" ,
            album : "ALBUM A",
            albumImgUri : '/twice2.jpg',
            isNew : true,
        },
        { 
            singer : "SINGER B" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice.jpg',
            isNew : true,
        },
        { 
            singer : "SINGER C" ,
            song : "SONG B" ,
            album : "ALBUM B",
            albumImgUri : '/twice2.jpg',
            isNew : false,
        }
    ]

    res.json(response)
})




module.exports = router;