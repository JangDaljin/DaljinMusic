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
    imagePath : String
})

const Music = new Schema({
    filePath : { type : String , required : true },
    song : { type : String, required : true } ,
    singer : { type : Schema.Types.ObjectId, ref : 'singer' , required : true},
    album : { type : Schema.Types.ObjectId, ref : 'album' },
    playTime : { type : Number, required : true } ,
    uploadDate : { type : Date, required : true } ,
    totalPlayCount : { type : Number, default : 0 },
    weekPlayCount : { type : Number, default : 0 },
    dayPlayCount : { type : Number, default : 0 },
})



const User = new Schema({
    userId : { type : String, required : true , unique : true , trim : true },
    userPw : { type : String, required : true , trim : true },
    userName : { type : String , required : true , default : 'unknown'},
    salt : { type : String, required : true },
    signUpTime : { type : String, required : true },
    updateTime : String,
    myMusicLists : [{
        listName : { type : String, require : true },
        list : [ {type : Schema.Types.ObjectId , ref : 'music'}]
    }],
    playList : [{ type : Schema.Types.ObjectId , ref : 'music' }],
    recentPlayList : [{ type : Schema.Types.ObjectId , ref : 'music' }],
})

User.method('makeSalt' , function() {
    return Math.round(new Date().valueOf() * Math.random()) + ''
})

User.method('encryptPassword', function (password) {
    return crypto.createHmac('sha512' , this.salt).update(password).digest('hex')
})

User.method('authenticate' , function(plainPw) {
    return this.encryptPassword(plainPw) === this.userPw
})

User.virtual('password').set(function(plainPw) {
    this._plainPw = plainPw
    this.salt = this.makeSalt()
    this.userPw = this.encryptPassword(plainPw)
}).get(function() {
    return this._plainPw
})




//테스트용
const Test = new Schema({
    identity : { type : String , unique : true },
    refdata : [{type : Schema.Types.ObjectId , ref : 'reftest'}]
})

//테스트용
const RefTest = new Schema({
    identity : { type : String , unique : true },
    item1 : String,
    item2 : String,
    item3 : String,
})






module.exports.connect = connect
module.exports.singerModel = mongoose.model('singer' , Singer)
module.exports.categoryModel = mongoose.model('category' , Category)
module.exports.albumModel = mongoose.model('album' , Album)
module.exports.musicModel = mongoose.model('music' , Music)
module.exports.userModel = mongoose.model('user' , User)
module.exports.testModel = mongoose.model('test' , Test)
module.exports.refTestModel = mongoose.model('reftest' , RefTest)
