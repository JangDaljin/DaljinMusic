const serverSocket = require('socket.io')
const socketStream = require('socket.io-stream')
const MusicModel = require('../Database/mongoDB').musicModel
const fs = require('fs')
module.exports = (expressServer) => {
    const socket = serverSocket().listen(expressServer)

    socket.on('connection' , (clientSocket) => {

        console.log('user connected')
        clientSocket.on('play' , async (data) => {
            
            const clientSocketStream = socketStream.createStream()
            const { _id , duration } = data
            console.dir(data)
            try {
                const music = await MusicModel.findOne({ '_id' : _id})
                const filePath = music.filePath
                const stat = fs.statSync(filePath)
                socketStream(clientSocket).emit('play' , clientSocketStream , { 'stat' : stat , 'duration' : duration })
                fs.createReadStream(filePath).pipe(clientSocketStream)
            }
            catch(error) {
                console.error(error)
            }

        })

        clientSocket.on('disconnect' , () => {
            console.log('user disconnected')
        })
        
    })



}