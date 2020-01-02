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
            module.exports.indexModel.countDocuments({} ,
            (err , count) => {
                if(err) {
                    console.error(err)
                }
                if(count === 0 ) {
                    new module.exports.indexModel({

                    }).save()
                }
                console.dir(`INDEX MODEL INITIALIZE COMPLETE`)
            })
        }
    })
}

function connect () {
    tryConnect()
    mongoose.connection.on('disconnected' , tryConnect)
}

const Singer = new Schema({
    name : { type : String, required : true , unique : true},    
})

const Category = new Schema({
    name : { type : String, required : true , unique : true},
})

const Album = new Schema({
    name : { type : String , default : null},
    albumImgUri : { type : String, default : `${process.env.ALBUM_IMG_URI}/noimage.png` },
    singer : { type : Schema.Types.ObjectId , ref : 'singer' , require : true}
})

const Music = new Schema({
    filePath : { type : String , required : true },
    song : { type : String, required : true } ,
    singer : { type : Schema.Types.ObjectId, ref : 'singer' , required : true},
    album : { type : Schema.Types.ObjectId, ref : 'album'},
    duration : { type : Number, required : true } ,
    uploadDate : { type : Date, required : true } ,
    totalPlayCount : { type : Number, default : 0 },
    monthPlayCount : { type : Number , default : 0 },
    weekPlayCount : { type : Number, default : 0 },
    dayPlayCount : { type : Number, default : 0 },
    category : { type : Schema.Types.ObjectId , ref : 'category'}
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
    recentlyPlayList : [{ type : Schema.Types.ObjectId , ref : 'music' }],
    preferCategoryCounter : [
        {
            categoryId : {type : Schema.Types.ObjectId , ref : 'category' },
            count : {type : Number , default : 1}
        }
    ]
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

const Index = new Schema({
    todaysLive : { type : Schema.Types.ObjectId , ref : 'music' , default : null},
    hotAndNew : [{
        music : { type : Schema.Types.ObjectId , ref : 'music' },
        hot : { type : Boolean , require : true },
        new : {type : Boolean , require : true}
    }]
})

module.exports.connect = connect
module.exports.singerModel = mongoose.model('singer' , Singer)
module.exports.categoryModel = mongoose.model('category' , Category)
module.exports.albumModel = mongoose.model('album' , Album)
module.exports.musicModel = mongoose.model('music' , Music)
module.exports.userModel = mongoose.model('user' , User)
module.exports.indexModel = mongoose.model('index' , Index)