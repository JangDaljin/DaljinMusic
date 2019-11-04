import React , { Component } from 'react'
import { Map , List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as adminActions from '../../ReduxModules/admin'
import classNames from 'classnames/bind'
import styles from './adminView.css'
const cn = classNames.bind(styles)

const fileSizeChanger = (fileSize , offset = 0) => {
    if(fileSize > 1024) {
        return fileSizeChanger(fileSize/1024 , offset+1)
    }
    else {
        return `${fileSize.toFixed(2)}${ offset === 0 ? 'Byte' : offset === 1 ? 'KB' : offset === 2 ? 'MB' : offset === 3 ? 'GB' : 'TB' }`
    }
}

class adminView extends Component {
   
   constructor(props) {
        super(props)

        this.state = {
            data : Map({
                checked : null,
                
                musicFiles : null,
                
                singers : null,
                songs : null,
                albums : null,
                
            }),
            ImgCounter : -1,
        }
        
        
   }

   onAlbumImgSelect = (e , index) => {
       this.setState({
            data : this.state.data.setIn(['albums' , index , 'isThere'] , true)
                                  .setIn(['albums' , index , 'index'] , this.state.ImgCounter + 1)
                                  .setIn(['albums' , index , 'file'] , e.target.files[0]),
            ImgCounter : this.state.ImgCounter + 1
       })
   }

   onFileSelect = (e) => {
        const newMusicFiles = []
        const newChecked = []
        const newSingers = []
        const newSongs = []
        const newAlbums = []
        Array.prototype.push.apply(newMusicFiles , e.target.files)

        for(const file of newMusicFiles) {
            const splitFileName = file.name.substr(0 , file.name.lastIndexOf('.')).split('-')

            const singer = (splitFileName[0] === null || splitFileName[0] ===  '' || splitFileName[0] === undefined)? '' : splitFileName[0].trim()
            const song = (splitFileName[1] === null || splitFileName[1] ===  '' || splitFileName[1] === undefined)? '' : splitFileName[1].trim()
            const album = (splitFileName[2] === null || splitFileName[2] ===  '' || splitFileName[2] === undefined)? '' : splitFileName[2].trim()

            newChecked.push(false)
            newSingers.push(singer)
            newSongs.push(song)
            newAlbums.push(Map({
                name : album,
                isThere : false,
                index : -1,
                file : null
            }))
        }

        this.setState({data : this.state.data.set('musicFiles' , List(newMusicFiles))
                                .set('checked' , List(newChecked))
                                .set('singers' , List(newSingers))
                                .set('songs' , List(newSongs))
                                .set('albums' , List(newAlbums))
        })
    }
       

   onFileUpload = (e) => {
        console.dir(this.state.data.toJS())
        this.props.AdminActions.fetchMusicUpload(this.state.data.toJS())
   }

   render() {
        return (
            <div className={cn('adminview')}>
                <div className={cn('upload-wrap')}>
                    <input className={cn('upload-files')} type="file" onChange={this.onFileSelect} multiple />
                    <input className={cn('upload-button')} type="button" value="업로드" onClick={this.onFileUpload} />
                </div>
                <div className={cn('upload-info-wrap')}>
                    {
                        this.state.data.get('musicFiles') !== null && 
                        this.state.data.get('musicFiles').map(
                            (value , index) => {
                                return (
                                    <div className="upload-info" key={index}>
                                        <span>{index}</span>
                                        <input type="text" placeholder="가수" defaultValue={this.state.data.getIn(['singers' , index])} readOnly={this.state.data.getIn(['checked' , index])} 
                                        onChange={ (e) => { this.setState( { data : this.state.data.setIn(['singers' , index] , e.target.value) } ) } }/>
                                        
                                        <input type="text" placeholder="제목" defaultValue={this.state.data.getIn(['songs' , index])} readOnly={this.state.data.getIn(['checked' , index])} 
                                        onChange={ (e) => { this.setState( { data : this.state.data.setIn(['songs' , index] , e.target.value) } ) } }/>
                                        
                                        <input type="text" placeholder="앨범" defaultValue={this.state.data.getIn(['albums' , index, 'name'])} readOnly={this.state.data.getIn(['checked' , index])}
                                        onChange={ (e) => { this.setState( { data : this.state.data.setIn(['albums' , index , 'name'] , e.target.value) } ) } }/>

                                        
                                        <div className="album-img-wrap">
                                            <div className="album-img" style=
                                            {
                                                this.state.data.getIn(['albums' , index , 'isThere']) ?
                                                    {
                                                        backgroundImage: `url(${URL.createObjectURL(this.state.data.getIn(['albums' , index , 'file']))})` 
                                                    }
                                                    :
                                                    {}
                                                }>
                                                
                                            </div>
                                        </div>
                                        <input type="file" onChange={(e) => { this.onAlbumImgSelect(e , index) }} accept="image/*" />

                                        <span>{fileSizeChanger(value.size)}</span>

                                        <input type="button" value="저장/수정" onClick={(e) => { this.setState( { data : this.state.data.setIn(['checked' , index] , !this.state.data.getIn(['checked' , index])) } ) }} />
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
   } 
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions , dispatch)
    })
)(adminView)