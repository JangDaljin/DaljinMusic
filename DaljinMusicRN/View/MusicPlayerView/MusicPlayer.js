import React , { Component } from 'react'
import { View, StyleSheet , TouchableOpacity, Image , Text , Modal} from 'react-native'

import { Map, List } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome5'

import ModalMusicplayer from './ModalMusicplayer'
import ModalPlaylist from './ModalPlaylist'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MusicPlayerActions from '../../Reducers/musicPlayer'

import { url } from '../commonFunctions'

class MusicPlayerMini extends Component {

    state = {
        currentPlayData : Map({
            musicIndex : -1,
            duration : 0,
        }),

        playOptions : Map({
            isLoop : false,
            isRandom : false,
            isPlaying : false,
        }),

        checkedPlaylist : List(),
        showMusicplayer : false,
        showPlaylist : false,
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.isAuthenticated !== this.props.isAuthenticated) {
                this.initMusicPlayer()
            }

            if(prevProps.playlist !== this.props.playlist) {
                this.setState({
                    currentPlayData : this.state.currentPlayData.set('musicIndex' , -1).set('duration' , 0) ,
                    checkedPlaylist : this.state.checkedPlaylist.clear().concat(new Array(this.props.playlist).fill(false))
                })
            }
        }
    }

    initMusicPlayer () {
        this.props.MusicPlayerActions.fetchGetPlayList({
            userId : this.props.userId
        })
    }

    componentDidMount() {
        this.initMusicPlayer()
    }

    onShowPlaylist = () => {
        this.setState({showPlaylist : true})
    }

    onClosePlayList = () => {
        this.setState({showPlaylist : false})
    }

    onShowMusicPlayer = () => {
        this.setState({showMusicplayer : true})
    }

    onCloseMusicPlayer = () => {
        this.setState({showMusicplayer : false})
    }

    onTogglePlayOptions = (message) => {
        if(message === 'isPlaying' || message === 'isRandom' || message === 'isLoop') {
            this.setState({
                playOptions : this.state.playOptions.update(message , value => !value)
            })
        }
    }

    onCheckedPlaylist = (index) => {
        if(index === -1) {
            this.setState({checkedPlaylist : this.state.checkedPlaylist.map(value => !value)})
        }
        else {
            this.setState({checkedPlaylist : this.state.checkedPlaylist.update(index , value => !value)})
        }
    }

    onDeleteListItem = () => {
        let currentMusicIndex = this.state.currentPlayData.get('musicIndex')

        const removeIndexList = []
        this.props.playlist.forEach((value , index ) => {
            if(this.state.checkedPlaylist.get(index)) {
                currentMusicIndex > index ? currentMusicIndex-- : 
                currentMusicIndex === index ? currentMusicIndex-- : null
            }
            removeIndexList.push(index)
        })
        
        this.props.MusicPlayerActions.fetchPlayListItemRemove({
            userId : this.props.userId,
            removeList : removeIndexList,
        })

        this.setState({
            checkedPlaylist : this.state.checkedPlaylist.filter(value => !value),
            currentPlayData : this.state.currentPlayData.set('musicIndex' , currentMusicIndex)
        })
    }

    onPlay = (index) => {
        if(typeof index === 'undefined') {
            index = this.state.currentPlayData.musicIndex
        }
        else {
            this.setState({currentMusic : this.state.currentPlayData.set('musicIndex' , index)})
        }
        
        
        this.onTogglePlayOptions('isPlaying')
    }

    onStop = () => {

        this.onTogglePlayOptions('isPlaying')
    }


    componentWillUnmount() {
        
    }
    


    render () {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onShowMusicPlayer}>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={{uri : 
                        this.state.currentPlayData.get('musicIndex') ? 
                        null
                        :
                        url(this.props.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'album' , 'albumImgUri']))
                    }} />
                </View>
                <View style={styles.infoWrap}>
                    {
                        this.state.currentPlayData.get('musicIndex') === -1 ?
                        <Text style={styles.infoText}>
                            {
                                '재생중인 음악 없음'
                            }
                        </Text>
                        :
                        <React.Fragment>
                            <Text style={[styles.infoText , styles.infoSong]} numberOfLines={1} ellipsizeMode='tail'>
                            {
                                this.props.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'song'])
                            }
                            </Text>
                            <Text style={[styles.infoText , styles.infoSinger]} numberOfLines={1} ellipsizeMode='tail'>
                                {
                                    this.props.playlist.getIn([this.state.currentPlayData.get('musicIndex') ,'singer' , 'name'])
                                }
                            </Text>
                        </React.Fragment>
                    }
                </View>
                <View style={styles.buttonsWrap}>
                    <TouchableOpacity style={styles.button}>
                        <Icon size={18} name={'backward'} solid />
                    </TouchableOpacity>
                    {
                        this.state.playOptions.get('isPlaying')?
                        <TouchableOpacity style={styles.button} onPress={() => { this.onStop() }}>
                            <Icon size={18} name={'pause'} solid />
                        </TouchableOpacity> 
                        :
                        <TouchableOpacity style={styles.button} onPress={() => { this.onPlay() }}>
                            <Icon size={18} name={'play'} solid />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button}>
                        <Icon size={18} name={'forward'} solid />
                    </TouchableOpacity>
                </View>

                <ModalMusicplayer 
                show={this.state.showMusicplayer} 
                onClose={this.onCloseMusicPlayer}
                currentPlayData={this.state.currentPlayData}
                currentMusic={Map({
                    song : 'test',
                    singer : Map({
                        name : 'testsingername'
                    }),
                    album : Map({
                        name : 'testAlbumName',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    })
                })}
                //{this.props.playlist.get(this.state.currentPlayData.get('musicIndex'))}
                playOptions={this.state.playOptions}
                onTogglePlayOptions={this.onTogglePlayOptions}
                onShowPlaylist={this.onShowPlaylist}
                />

                <ModalPlaylist 
                show={this.state.showPlaylist} 
                onClose={this.onClosePlayList}
                currentMusicIndex={this.state.currentPlayData.get('musicIndex')}
                playlist={this.props.playlist}
                checkedPlaylist={this.state.checkedPlaylist}
                onCheckedPlaylist={this.onCheckedPlaylist}
                onPlay={this.onPlay}
                onDeleteListItem={this.onDeleteListItem}
                />
                
            </TouchableOpacity>
        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        
        playlist : state.musicPlayer.playList,
        randomPlaylist : state.musicPlayer.randomPlayList,

        isLoading : state.musicPlayer.isLoading,
    }),
    (dispatch) => ({
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch)
    })
)(MusicPlayerMini)




const styles = StyleSheet.create({
    container : {
        height : 50,
        padding : 5,
        backgroundColor : '#50BCDF55',
        borderWidth: 2,
        borderColor : '#AAA',
        flexDirection: 'row',
    },

    imageWrap : {
        height : '100%',
        aspectRatio : 1,
    },

    image : {
        width : '100%',
        height : '100%',
    },

    infoWrap : {
        flex : 6,
        paddingLeft : 5,
    },

    infoText : {
        flex : 1,
        textAlignVertical : 'center',
        fontFamily : 'jua',
    },

    infoSong : {
        fontSize : 18,
        color : '#303030'
    },

    infoSinger : {
        
        fontSize : 14,
        color : '#303030'
    },

    buttonsWrap : {
        flex : 4,
        flexDirection : 'row',
    },

    button : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },



})