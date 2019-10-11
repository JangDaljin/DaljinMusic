const express = require('express')
const router = express.Router()


router.post('/:id' , (req , res) => {
    const { id } = req.params.id

    const response = [
        { 
            singer : "SINGER A" ,
            song : "SONG A" ,
            album : "ALBUM A"
        },
        { 
            singer : "SINGER B" ,
            song : "SONG B" ,
            album : "ALBUM B"
        },
        { 
            singer : "SINGER C" ,
            song : "SONG B" ,
            album : "ALBUM B"
        }
    ]

    res.json(response)
})




module.exports = router;