import io from 'socket.io-client'
import sio from 'socket.io-stream'

export default class Socket {

    constructor () {
        this.socket = null
        this.audioBuffer = null
        this.source = null
        this.audioContext = null
    }

    open = () => {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.audioContext.createBufferSource()

        this.socket = io(process.env.REACT_APP_SERVER)

        this.socket.on('connect' , () => {
            console.log('connected server')
        })
        
        //스트리밍
        sio(this.socket).on('play' , (stream , info) => {
            //const { stat , duration } = info
            stream.on('data' , async (data) => {
                const audioBufferChunk = await this.audioContext.decodeAudioData(this.withWaveHeader(data , 2 , 44100))
                const newaudioBuffer = (this.source && this.source.buffer) ? this.appendBuffer(this.source.buffer, audioBufferChunk, this.audioContext): audioBufferChunk;
                this.source = this.audioContext.createBufferSource();
                this.source.buffer = newaudioBuffer;
                this.source.connect(this.audioContext.destination)
                this.source.start()
            })
        })
        
        this.socket.on('disconnect' , () => {
            console.log('disconnected server')
        })
    }

    play = (_id , duration) => {
        this.socket.emit('play' , { '_id' : _id , 'duration' : duration})
    }
    
    close = () => {
        this.socket.close()
        this.socket = null
    }

    concat = (buffer1, buffer2) => {
        const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
      
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
      
        return tmp.buffer;
      };
      
    appendBuffer = (buffer1, buffer2, context) => {
        const numberOfChannels = Math.min( buffer1.numberOfChannels, buffer2.numberOfChannels );
        const tmp = context.createBuffer( numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate );
        for (let i=0; i<numberOfChannels; i++) {
          const channel = tmp.getChannelData(i);
          channel.set( buffer1.getChannelData(i), 0);
          channel.set( buffer2.getChannelData(i), buffer1.length);
        }
        return tmp;
      };
      
      
    withWaveHeader = (data, numberOfChannels, sampleRate) => {
        const header = new ArrayBuffer(44);
      
        const d = new DataView(header);
      
        d.setUint8(0, "R".charCodeAt(0));
        d.setUint8(1, "I".charCodeAt(0));
        d.setUint8(2, "F".charCodeAt(0));
        d.setUint8(3, "F".charCodeAt(0));
      
        d.setUint32(4, data.byteLength / 2 + 44, true);
      
        d.setUint8(8, "W".charCodeAt(0));
        d.setUint8(9, "A".charCodeAt(0));
        d.setUint8(10, "V".charCodeAt(0));
        d.setUint8(11, "E".charCodeAt(0));
        d.setUint8(12, "f".charCodeAt(0));
        d.setUint8(13, "m".charCodeAt(0));
        d.setUint8(14, "t".charCodeAt(0));
        d.setUint8(15, " ".charCodeAt(0));
      
        d.setUint32(16, 16, true);
        d.setUint16(20, 1, true);
        d.setUint16(22, numberOfChannels, true);
        d.setUint32(24, sampleRate, true);
        d.setUint32(28, sampleRate * 1 * 2);
        d.setUint16(32, numberOfChannels * 2);
        d.setUint16(34, 16, true);
      
        d.setUint8(36, "d".charCodeAt(0));
        d.setUint8(37, "a".charCodeAt(0));
        d.setUint8(38, "t".charCodeAt(0));
        d.setUint8(39, "a".charCodeAt(0));
        d.setUint32(40, data.byteLength, true);
      
        return this.concat(header, data);
      };

      
}