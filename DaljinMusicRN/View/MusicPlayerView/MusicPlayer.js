import React , { Component } from 'react'
import { View, StyleSheet , TouchableOpacity, Image , Text , Modal, ToastAndroid} from 'react-native'

import { Map, List, setIn } from 'immutable'
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
        }),

        
        isPlaying : false,

        checkedPlaylist : List(),
        showMusicplayer : false,
        showPlaylist : false,

        musicTimer : null,
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.isAuthenticated !== this.props.isAuthenticated) {
                this.initMusicPlayer()
            }

            if(prevProps.playlist !== this.props.playlist) {
                this.setState({
                    checkedPlaylist : this.state.checkedPlaylist.clear().concat(new Array(this.props.playlist.size).fill(false))
                })
            }

            if(prevProps.remote !== this.props.remote) {
                const receive = this.props.remote.get('receive')
                const operationCode = this.props.remote.get('operationCode')
                const operand = this.props.remote.get('operand')
                const OP_CODE = MusicPlayerActions.REMOTE_OP_CODE
                if(receive) {
                    switch(operationCode) {
                        case OP_CODE.PLAY :
                            this.setState({
                                currentPlayData : this.state.currentPlayData.set('musicIndex' , operand)
                            })
                            
                            this.onPlay()
                        break;
                    }


                    //종료
                    this.props.MusicPlayerActions.remoteReceived()
                }
            }
        }

        if(prevState !== this.state) {
            if(prevState.currentPlayData.get('musicIndex') !== this.state.currentPlayData.get('musicIndex')) {
                if(this.state.currentPlayData.get('musicIndex') === -1) {
                    this.timerClear()
                }
                else {
                    //음악재생
                    this.timerInit()
                }
            }
        }
    }

    timerClear = () => {
        clearInterval(this.state.musicTimer)
        this.setState({
            isPlaying : false,
            currentPlayData : this.state.currentPlayData.set('duration' , 0),
            musicTimer : null,
        })
    }

    timerInit = () => {
        this.setState({
            isPlaying : true,
            currentPlayData : this.state.currentPlayData.set('duration' , 0),
            musicTimer : setInterval(
                () => {
                    if(this.state.isPlaying) {
                        this.setState({currentPlayData : this.state.currentPlayData.update('duration' , value => value + 0.1) })
                    }
                    if(this.state.currentPlayData.get('duration') >= this.props.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'duration'])) {
                        //음악 종료
                        this.onNext()
                    }
                },
                100
            )
        })
    }


    componentDidMount() {
        this.initMusicPlayer()
    }

    initMusicPlayer () {
        this.props.MusicPlayerActions.fetchGetPlayList({
            userId : this.props.userId
        })
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
        if(message === 'isRandom' || message === 'isLoop') {
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
        this.props.playlist
        .filter((value , index) => (
            this.state.checkedPlaylist.get(index)
        ))
        .forEach((value , index ) => {
            if(this.state.checkedPlaylist.get(index)) {
                currentMusicIndex >= index ? currentMusicIndex-- : 
                null
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

    onPlay = () => {
        if(this.props.playlist.size === 0) {
            return
        }

        let playMusicIndex = this.state.currentPlayData.get('musicIndex')

        //처음 음악 재생
        if(playMusicIndex < 0) {
            //랜덤 재생
            if(this.state.playOptions.get('isRandom')) {
                playMusicIndex = this.props.playlist.getIn([0 , 'randomIndex'])
            }
            //일반재생
            else {
                playMusicIndex = 0
            }
        }

        this.setState({
            currentPlayData : this.state.currentPlayData.set('musicIndex' , playMusicIndex),
            isPlaying : true
        })
    }

    onPause = () => {
        this.setState({isPlaying : false})
    }

    onStop = () => {
        this.setState({isPlaying : false})
    }

    onNext = () => {
        this.timerClear()

        if(this.props.playlist.size === 0) {
            return
        }

        let nextMusicIndex
        if(this.state.playOptions.get('isRandom')) {
            let randomIndex
            
            if(this.state.currentPlayData.get('musicIndex') === -1) {
                randomIndex = this.props.randomPlaylist.getIn([0 , 'index'])
            }
            else {
                randomIndex = this.props.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'randomIndex']) + 1
            }

            if(randomIndex >= this.props.playlist.size) {
                if(this.state.playOptions.get('isLoop')) {
                    randomIndex = this.props.randomPlaylist.getIn([
                        0 ,
                        'index'
                    ])
                }
                else {
                    randomIndex = -1
                }
            }

            nextMusicIndex = randomIndex
        }
        else {
            nextMusicIndex = this.state.currentPlayData.get('musicIndex') + 1
            if(nextMusicIndex >= this.props.playlist.size) {
                if(this.state.playOptions.get('isLoop')) {
                    nextMusicIndex = 0
                }
                else {
                    nextMusicIndex = -1
                }
            }
        }


        this.setState({
            currentPlayData : this.state.currentPlayData.set('musicIndex' , nextMusicIndex),
        })
    }

    onPrev = () => {
        
        this.timerClear()
        let prevMusicIndex
        if(this.state.playOptions.get('isRandom')) {

            let tempIndex = this.props.playlist.getIn([
                this.state.currentPlayData.get('musicIndex') ,
                'randomIndex'
            ]) - 1

            if(tempIndex < 0) {
                if(this.state.playOptions.get('isLoop')) {
                    tempIndex = this.props.playlist.size - 1
                }
                else {
                    tempIndex = -1
                }
            }

            prevMusicIndex = this.props.randomPlaylist.getIn([
                tempIndex ,
                'index'
            ])
        }
        else {
            prevMusicIndex = this.state.currentPlayData.get('musicIndex') - 1
        }

        if(prevMusicIndex < 0) {
            if(this.state.playOptions.get('isLoop')) {
                if(this.state.playOptions.get('isRandom')) {
                    prevMusicIndex = this.props.randomPlaylist.get([this.props.randomPlaylist.size -1] , 'index')
                }
                prevMusicIndex = this.props.playlist.size
            }
            else {
                prevMusicIndex = -1
            }
        }   
        this.setState({
            currentPlayData : this.state.currentPlayData.set('musicIndex' , prevMusicIndex)
        })
    }


    componentWillUnmount() {
        
    }
    


    render () {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onShowMusicPlayer}>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={{uri : 
                        this.state.currentPlayData.get('musicIndex') === -1? 
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
                        <Icon size={18} name={'backward'} solid onPRess={() => { this.onPrev() }} />
                    </TouchableOpacity>
                    {
                        this.state.isPlaying ?
                        <TouchableOpacity style={styles.button} onPress={() => { this.onPause() }}>
                            <Icon size={18} name={'pause'} solid />
                        </TouchableOpacity> 
                        :
                        <TouchableOpacity style={styles.button} onPress={() => { this.onPlay() }}>
                            <Icon size={18} name={'play'} solid />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button} onPress={() => { this.onNext() }}>
                        <Icon size={18} name={'forward'} solid />
                    </TouchableOpacity>
                </View>

                <ModalMusicplayer 
                show={this.state.showMusicplayer} 
                onClose={this.onCloseMusicPlayer}
                currentPlayData={this.state.currentPlayData}
                currentMusic={this.props.playlist.size === 0 ? null : this.props.playlist.get(this.state.currentPlayData.get('musicIndex'))}
                playOptions={this.state.playOptions}
                onTogglePlayOptions={this.onTogglePlayOptions}
                isPlaying={this.state.isPlaying}
                onPlay={this.onPlay}
                onPause={this.onPause}
                onNext={this.onNext}
                onPrev={this.onPrev}
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

        remote : state.musicPlayer.remote,

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