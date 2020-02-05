import React , { Component } from 'react'
import { View, StyleSheet , TouchableOpacity, Image , Text , Modal} from 'react-native'

import { Map, List } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome5'

import ModalMusicplayer from './ModalMusicplayer'
import ModalPlaylist from './ModalPlaylist'


export default class MusicPlayerMini extends Component {

    state = {
        currentPlayData : Map({
            musicIndex : 2,
            duration : 0,
        }),

        playOptions : Map({
            isLoop : false,
            isRandom : false,
            isPlaying : false,
        }),

        playlist : List([
            Map({
                song : 'aaa',
                singer : {
                    name : 'aaa',
                },
                album : {
                    name : 'aaa',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                },
                duration : 172,
            }),
            Map({
                song : 'bbb',
                singer : {
                    name : 'bbb',
                },
                album : {
                    name : 'bbb',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                } ,
                duration : 512,
            }),
            Map({
                song : 'qwer',
                singer : {
                    name : 'asdf',
                },
                album : {
                    name : 'zxcv',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                },
                duration : 212,
            })
        ]),
        checkedPlaylist : List(new Array(3).fill(false)),
        showMusicplayer : false,
        showPlaylist : false,
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

        this.setState({
            playlist : this.state.playlist.filter((value , index) => {
                if(this.state.checkedPlaylist.get(index)) {
                    currentMusicIndex > index ? currentMusicIndex-- : 
                    currentMusicIndex === index ? currentMusicIndex-- : null
                }
                return !this.state.checkedPlaylist.get(index)
            }),
            checkedPlaylist : this.state.checkedPlaylist.filter(value => !value),
            currentPlayData : this.state.currentPlayData.set('musicIndex' , currentMusicIndex)
        })
    }

    onPlay = (index) => {
        this.setState({currentMusic : this.state.currentPlayData.set('musicIndex' , index)})
    }

    


    render () {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onShowMusicPlayer}>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={{uri : this.state.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'album' , 'albumImgUri'])}} />
                </View>
                <View style={styles.infoWrap}>
                    <Text style={styles.infoText}>
                        {this.state.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'song'])}-
                        {this.state.playlist.getIn([this.state.currentPlayData.get('musicIndex') ,'singer' , 'name'])}-
                        {this.state.playlist.getIn([this.state.currentPlayData.get('musicIndex') , 'album' , 'name'])}
                    </Text>
                </View>
                <View style={styles.buttonsWrap}>
                    <TouchableOpacity style={styles.button}>
                        <Icon size={18} name={'backward'} solid />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon size={18} name={'pause'} solid />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Icon size={18} name={'forward'} solid />
                    </TouchableOpacity>
                </View>

                <ModalMusicplayer 
                show={this.state.showMusicplayer} 
                onClose={this.onCloseMusicPlayer}
                currentPlayData={this.state.currentPlayData}
                currentMusic={this.state.playlist.get(this.state.currentPlayData.get('musicIndex'))}
                playOptions={this.state.playOptions}
                onTogglePlayOptions={this.onTogglePlayOptions}
                onShowPlaylist={this.onShowPlaylist}
                />

                <ModalPlaylist 
                show={this.state.showPlaylist} 
                onClose={this.onClosePlayList}
                currentMusicIndex={this.state.currentPlayData.get('musicIndex')}
                playlist={this.state.playlist}
                checkedPlaylist={this.state.checkedPlaylist}
                onCheckedPlaylist={this.onCheckedPlaylist}
                onPlay={this.onPlay}
                onDeleteListItem={this.onDeleteListItem}
                />
                
            </TouchableOpacity>
        )
    }
}





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
        fontSize : 20,
        fontFamily : 'jua',
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