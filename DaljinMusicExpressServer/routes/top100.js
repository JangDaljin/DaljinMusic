const express = require('express')
const router = express.Router()


router.get('/' , (req , res) => {

    const { from , to } = req.query
    const response = [];
    
    for(let i = from ; i <= to; i++) {
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

    res.json(response)
})




module.exports = router;