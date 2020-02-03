import React , { Component } from 'react'
import { View, StyleSheet , TouchableOpacity, Image , Text , Modal} from 'react-native'

import { Map } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class MusicPlayerMini extends Component {

    state = {
        currentMusic : Map({
            song : 'ccc',
            singer : {
                name : 'ccc',
            },
            album : {
                name : 'ccc',
                albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
            }
        }),

        musicPlayerShow : false,
        showPlaylist : false,
        isPlaying : false,
        isLoop : false,
        isRandom : false,
    }

    render () {
        return (
            <TouchableOpacity style={styles.container} onPress={() => { this.setState({ musicPlayerShow : true})}}>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={{uri : this.state.currentMusic.getIn(['album' , 'albumImgUri'])}} />
                </View>
                <View style={styles.infoWrap}>
                    <Text style={styles.infoText}>{this.state.currentMusic.get('song')}-{this.state.currentMusic.getIn(['singer' , 'name'])}-{this.state.currentMusic.getIn(['album' , 'name'])}</Text>
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


                <Modal animationType='slide' visible={this.state.musicPlayerShow} onRequestClose={() => { this.setState({musicPlayerShow : false})}}>
                    <View style={modalStyle.container}>
                        <View style={modalStyle.header}>
                            <TouchableOpacity style={modalStyle.backButton} onPress={() => { this.setState({musicPlayerShow : false})}}>
                                <Icon style={{color : '#EEE'}} size={24} name={'angle-left'} solid />
                            </TouchableOpacity>
                            <Text style={modalStyle.headerTitle}>
                                {this.state.currentMusic.getIn(['song'])}-
                                {this.state.currentMusic.getIn(['singer' , 'name'])}-
                                {this.state.currentMusic.getIn(['album' , 'name'])}
                            </Text>
                        </View>
                        <View style={modalStyle.contentWrap}>
                            <Image style={modalStyle.image} source={{uri : this.state.currentMusic.getIn(['album' , 'albumImgUri'])}}/>
                        </View>

                        <View style={modalStyle.controller}>
                            <View style={modalStyle.progressbarWrap}>
                                <Text style={modalStyle.time}>00:00</Text>
                                <View style={modalStyle.progressbar}>

                                </View>
                                <Text style={modalStyle.time}>33:33</Text>
                            </View>
                            <View style={modalStyle.buttonsWrap}>
                                <TouchableOpacity onPress={() => { this.setState({isLoop : !this.state.isLoop}) }}>
                                    <Icon style={[modalStyle.buttonTextColor , this.state.isLoop ? modalStyle.checkedButtonColor : null]} name={'sync-alt'} size={20} solid />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon style={modalStyle.buttonTextColor} name={'backward'} size={20} solid />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ isPlaying : !this.state.isPlaying }) }}>
                                    {
                                        this.state.isPlaying ?
                                            <Icon style={modalStyle.buttonTextColor} name={'pause'} size={20} solid />
                                            :
                                            <Icon style={modalStyle.buttonTextColor} name={'play'} size={20} solid />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon style={modalStyle.buttonTextColor} name={'forward'} size={20} solid />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({isRandom : !this.state.isRandom}) }}>
                                    <Icon style={[modalStyle.buttonTextColor , this.state.isRandom ? modalStyle.checkedButtonColor : null]} name={'random'} size={20} solid />
                                </TouchableOpacity>
                            </View>
                            <View style={modalStyle.viewChangeButtonsWrap}>
                                <TouchableOpacity style={modalStyle.viewChangeButton} onPress={() => {this.setState({showPlaylist : true})}}>
                                    <Icon style={modalStyle.viewChangeButtonIcon} size={20} name={'align-justify'} solid />
                                    <Text style={modalStyle.viewChangeButtonText}>플레이리스트</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>


            </TouchableOpacity>
        )
    }
}

const modalStyle = StyleSheet.create({
    container : {
        flex : 1,
    },

    header : {
        justifyContent : 'center',
        height : 50,
        backgroundColor : '#303030',
        flexDirection : 'row',
    },

    headerTitle : {
        flex : 1,
        color : '#EEE',
        textAlignVertical : 'center',
        fontSize : 26,
        fontFamily : 'jua',
    },

    backButton : {
        height : '100%',
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    contentWrap : {
        width : '100%',
        flex : 3,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#30303055',
        borderColor : '#CCC',
        borderTopWidth : 2,
        borderBottomWidth : 2,
    },

    image : {
        width : '80%',
        aspectRatio : 1,
    },

    controller : {
        flex : 1,
        backgroundColor : '#303030',
    },

    progressbarWrap : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : 2,
        borderColor : '#AAA',
    },

    progressbar : {
        flex : 1,
        borderColor : '#AAA',
        borderWidth : 1,
        borderRadius : 10,
        height : 8,
        backgroundColor : '#EEE',
    },

    time : {
        width : 70,
        textAlign : 'center',
        textAlignVertical : 'center',
        color : '#EEE',
        fontFamily : 'jua',
        fontSize : 16,
    },

    buttonsWrap : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
    },

    buttonTextColor : {
        color : '#EEE',
    },

    checkedButtonColor : {
        color : '#FFFF5A'
    },

    viewChangeButtonsWrap : {
        flex : 1,
        flexDirection : 'row',
    },

    viewChangeButton : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : '#AAA',
        flexDirection : 'row',
        borderRadius : 10,
    },

    viewChangeButtonText : {
        fontSize : 20,
        color : '#EEE',
        paddingLeft : 10,
        fontFamily : 'jua',
    },

    viewChangeButtonIcon : {
        color : '#EEE',
    }
})

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