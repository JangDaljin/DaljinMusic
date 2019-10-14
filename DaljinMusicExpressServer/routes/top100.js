const express = require('express')
const router = express.Router()


router.get('/' , (req , res) => {

    const { from , to } = req.query
    const p_from = parseInt(from)
    const p_to = parseInt(to)
    const response = [];

    if(!(typeof(from) === String || typeof(to) === String) && ( p_from > 0 && p_to > 0) && (p_from < 101 && p_to < 101)) {
        for(let i = parseInt(from) ; i <= parseInt(to); i++) { 
            response.push(
                {
                    rank : `${i}`,
                    song : `SONG ${i}`,
                    singer : `SINGER ${i}`,
                    album : `ALBUM ${i}`,
                    albumImgUri : `twice${(i%2) + 1}.jpg`
                }
            )
        }
    }

    res.json(response)
})




module.exports = router;