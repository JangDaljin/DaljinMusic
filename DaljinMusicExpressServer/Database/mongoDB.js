const mongoose = require('mongoose')
require('dotenv').config()
const uri  = process.env.DB_URI
function connect () {

    const connectOptions = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }

    mongoose.connect(uri , connectOptions).then(() => {
        console.log('connected to mongodb')
    }).catch((e) => {
        console.error(e);
    })
}


module.exports.connect = connect