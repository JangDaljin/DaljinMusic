require('dotenv').config()
const uri  = process.env.DB_URI

const mongoose = require('mongoose')
const { Schema } = mongoose

const crypto = require('crypto')


function tryConnect () {
    const connectOptions = {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    }
    mongoose.Promise = global.Promise
    mongoose.connect(uri , connectOptions , (err) => {
        if(err) {
           console.dir(err) 
        }
        else {
            console.dir('DB CONNECT COMPLETE')
        }
    })
}

function connect () {
    tryConnect()
    mongoose.connection.on('disconnected' , tryConnect)
}

const Singer = new Schema({
    name : { type : String, required : true },    
})

const Category = new Schema({
    name : { type : String, required : true , unique : true},
})

const Album = new Schema({
    name : { type : String, required : true },
    imagepath : String
})

const Music = new Schema({
    song : { type : String, required : true } ,
    singer : { type : Schema.Types.ObjectId, ref : 'singer' },
    album : { type : Schema.Types.ObjectId, ref : 'album' },
    category : { type : Schema.Types.ObjectId, ref : 'category' },
    playtime : { type : String, required : true } ,
    uploaddate : { type : Date, required : true } ,
    totalplaycount : { type : Number, default : 0 },
    weekplaycount : { type : Number, default : 0 },
    dayplaycount : { type : Number, default : 0 },
})



const User = new Schema({
    userid : { type : String, required : true , unique : true , trim : true },
    userpw : { type : String, required : true , trim : true },
    username : { type : String , required : true , default : 'unknown'},
    salt : { type : String, required : true },
    signuptime : { type : String, required : true },
    updatetime : String,
    mymusiclist : [{
                        listname : { type : String, required : true } ,
                        list : [ { type : Schema.Types.ObjectId , ref : 'music'} ] 
                    }],
    playlist : [{ type : Schema.Types.ObjectId , ref : 'music' }],
    recentplaylist : [{ type : Schema.Types.ObjectId , ref : 'music' }],
})

User.method('makeSalt' , function() {
    return Math.round(new Date().valueOf() * Math.random()) + ''
})

User.method('encryptPassword', function (password) {
    return crypto.createHmac('sha512' , this.salt).update(password).digest('hex')
})

User.method('authenticate' , function(plainPw) {
    return this.encryptPassword(plainPw) === this.userpw
})

User.virtual('password').set(function(plainPw) {
    this._plainPw = plainPw
    this.salt = this.makeSalt()
    this.userpw = this.encryptPassword(plainPw)
}).get(function() {
    return this._plainPw
})






module.exports.connect = connect
module.exports.singerModel = mongoose.model('singer' , Singer)
module.exports.categoryModel = mongoose.model('category' , Category)
module.exports.albumModel = mongoose.model('album' , Album)
module.exports.musicModel = mongoose.model('music' , Music)
module.exports.userModel = mongoose.model('user' , User)
