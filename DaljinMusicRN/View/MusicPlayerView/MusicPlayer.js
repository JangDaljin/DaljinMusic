import React , { Component } from 'react'
import { View, StyleSheet , TouchableOpacity, Image , Text , Modal} from 'react-native'

import { Map, List } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome5'

import ModalMusicplayer from './ModalMusicplayer'
import ModalPlaylist from './ModalPlaylist'


export default class MusicPlayerMini extends Component {

    state = {
        currentMusic : 2,

        playlist : List([
            Map({
                song : 'aaa',
                singer : {
                    name : 'aaa',
                },
                album : {
                    name : 'aaa',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                } 
            }),
            Map({
                song : 'bbb',
                singer : {
                    name : 'bbb',
                },
                album : {
                    name : 'bbb',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                } 
            }),
            Map({
                song : 'ccc',
                singer : {
                    name : 'ccc',
                },
                album : {
                    name : 'ccc',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                } 
            })
        ]),

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

    render () {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onShowMusicPlayer}>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={{uri : this.state.playlist.getIn([this.state.currentMusic , 'album' , 'albumImgUri'])}} />
                </View>
                <View style={styles.infoWrap}>
                    <Text style={styles.infoText}>
                        {this.state.playlist.getIn([this.state.currentMusic , 'song'])}-
                        {this.state.playlist.getIn([this.state.currentMusic ,'singer' , 'name'])}-
                        {this.state.playlist.getIn([this.state.currentMusic , 'album' , 'name'])}
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
                currentMusic={this.state.playlist.getIn([this.state.currentMusic])}
                onShowPlaylist={this.onShowPlaylist}
                />

                <ModalPlaylist 
                show={this.state.showPlaylist} 
                onClose={this.onClosePlayList}
                playlist={this.state.playlist}
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