const express = require('express')
const router = express.Router()

router.post('/' , (req , res) => {
    const userId = req.body || ''
    console.log(`myMusic[ userId : ${userId} ]`)
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



module.exports = router