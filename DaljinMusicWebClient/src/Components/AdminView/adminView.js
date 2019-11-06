import React , { Component } from 'react'
import { Map , List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as adminActions from '../../ReduxModules/admin'
import * as searchActions from '../../ReduxModules/search'
import classNames from 'classnames/bind'
import styles from './adminView.css'
const cn = classNames.bind(styles)

const SEARCH_MODE = {
    SONG : 0,
    SINGER : 1,
    ALBUM : 2,
}

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
            searchbox : Map({
                mode : -1,
                top : 0,
                left : 0,
                visibility : 'visible',
                width : 0,
                index : -1,
            }),
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
            newSingers.push(Map({
                name : singer,
                _id : '',
            }))
            newSongs.push(Map({
                name : song
            }))
            newAlbums.push(Map({
                name : album,
                _id : '',
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
            this.props.AdminActions.fetchMusicUpload(this.state.data.toJS())
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevState !== this.state) {
            //console.dir(this.state.data.toJS())
        }
    }

    render() {
        return (
            <React.Fragment>
            <div className={cn('adminview')}>
                <div className={cn('upload-wrap')}>
                    <input className={cn('upload-files')} type="file" onChange={this.onFileSelect} accept="audio/*" multiple />
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

                                        <div className="music-info">
                                            <input id={`searchsinger${index}`} type="text" placeholder="가수" value={this.state.data.getIn(['singers' , index , 'name'])} readOnly={this.state.data.getIn(['checked' , index])} 
                                            onChange={ (e) => { this.setState( { data : this.state.data.setIn(['singers' , index , 'name'] , e.target.value) } ) } }
                                            onKeyDown={ (e) => { 
                                                if(e.key === 'Enter') { 
                                                    const rect = document.getElementById(`searchsinger${index}`).getBoundingClientRect()
                                                    this.setState({ searchbox : this.state.searchbox.set('mode' , SEARCH_MODE.SINGER).set('index' , `${index}`).set('width' , rect.width).set('left' , rect.left).set('top' , rect.bottom).set('visibility' , 'visible')})
                                                    this.props.SearchActions.fetchSearchSinger(
                                                        { 'search' : this.state.data.getIn(['singers' , index , 'name']) }
                                                    )
                                                }} }
                                            />
                                            
                                            <input id={`searchsong${index}`} type="text" placeholder="제목" value={this.state.data.getIn(['songs' , index, 'name'])} readOnly={this.state.data.getIn(['checked' , index])} 
                                            onChange={ (e) => { this.setState( { data : this.state.data.setIn(['songs' , index , 'name'] , e.target.value) } ) } }
                                            onKeyDown={ (e) => { 
                                                if(e.key === 'Enter') { 
                                                    const rect = document.getElementById(`searchsong${index}`).getBoundingClientRect()
                                                    this.setState({ searchbox : this.state.searchbox.set('mode' , SEARCH_MODE.SONG).set('index' , `${index}`).set('width' , rect.width).set('left' , rect.left).set('top' , rect.bottom).set('visibility' , 'visible')})
                                                    this.props.SearchActions.fetchSearchSong({ 'search' : this.state.data.getIn(['songs' , index , 'name'])}) 
                                                } } }
                                                />

                                            <input id={`searchalbum${index}`} type="text" placeholder="앨범" value={this.state.data.getIn(['albums' , index, 'name'])} readOnly={this.state.data.getIn(['checked' , index])}
                                            onChange={ (e) => { this.setState( { data : this.state.data.setIn(['albums' , index , 'name'] , e.target.value) } ) } }
                                            onKeyDown={ (e) => { 
                                                if(e.key === 'Enter') { 
                                                    const rect = document.getElementById(`searchalbum${index}`).getBoundingClientRect()
                                                    this.setState({ searchbox : this.state.searchbox.set('mode' , SEARCH_MODE.ALBUM).set('index' , `${index}`).set('width' , rect.width).set('left' , rect.left).set('top' , rect.bottom).set('visibility' , 'visible')})
                                                    this.props.SearchActions.fetchSearchAlbum({'search' : this.state.data.getIn(['albums' , index , 'name'])}) 
                                                } } }
                                            />
                                        </div>
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

            <div className="searchbox" style={
                {
                    top : this.state.searchbox.get('top'),
                    left : this.state.searchbox.get('left'),
                    visibility : this.state.searchbox.get('visibility'),
                    width : this.state.searchbox.get('width'),
                }
            }>
                {
                    this.props.foundList.map(
                        (value , index) => (
                            <div key={index} onClick={(e) => {
                                e.preventDefault()
                                let newData = null
                                switch(this.state.searchbox.get('mode')) {
                                    case SEARCH_MODE.SONG : 
                                    newData = this.state.data.setIn(['songs' , this.state.searchbox.get('index') , 'name'] , value.name)
                                                                .setIn(['songs' , this.state.searchbox.get('index') , '_id'] , value._id)
                                    break;
                                    
                                    case SEARCH_MODE.SINGER :
                                    newData = this.state.data.setIn(['singers' , this.state.searchbox.get('index') , 'name'] , value.name)
                                                                .setIn(['singers' , this.state.searchbox.get('index') , '_id'] , value._id)
                                    break;

                                    case SEARCH_MODE.ALBUM :
                                    newData = this.state.data.setIn(['albums' , this.state.searchbox.get('index') , 'name'] , value.name)
                                                                .setIn(['albums' , this.state.searchbox.get('index') , '_id'] , value._id)
                                    break;

                                    default :
                                    break;
                                }
                                this.setState({ data : newData , searchbox : this.state.searchbox.set('visibility' , 'hidden')})
                            }}>
                                {`${value.name}(${value._id})`}
                            </div>
                        )
                    )
                }
            </div>
            </React.Fragment>
        )
    } 
}

export default connect(
    (state) => ({
        foundList : state.search.foundList.toJS(),
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(adminActions , dispatch),
        SearchActions : bindActionCreators(searchActions , dispatch)
    })
)(adminView)