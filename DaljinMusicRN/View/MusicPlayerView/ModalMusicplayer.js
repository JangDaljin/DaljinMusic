import React , { Component } from 'react'
import { View , Text , TouchableOpacity , Modal , StyleSheet , Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import ModalHeader from './ModalHeader'

import { mmss } from '../commonFunctions'
import { url } from '../commonFunctions'

export default class ModalMusicplayer extends Component {

    componentDidUpdate(prevProps , prevState) {


    }

    render () {
        return (
            <Modal animationType='slide' visible={this.props.show} onRequestClose={() => { this.props.onClose() }}>
                    <View style={modalStyle.container}>

                        <ModalHeader
                        title={this.props.currentPlayData.get('musicIndex') === -1 ?
                            '재생중인 음악 없음'
                            :
                            `${this.props.currentMusic.get('song')}-${this.props.currentMusic.getIn(['singer' , 'name'])}-${this.props.currentMusic.getIn(['album' , 'name'])}`
                        } 
                        onPressBackButton={this.props.onClose}
                        />

                        <View style={modalStyle.contentWrap}>
                            {this.props.currentPlayData.get('musicIndex') === -1 ?
                                <View style={modalStyle.image}>

                                </View>
                                :
                                <Image style={modalStyle.image} source={{uri : url(this.props.currentMusic.getIn(['album' , 'albumImgUri']))}}/>
                            }
                        </View>

                        <View style={modalStyle.controller}>
                            <View style={modalStyle.progressbarWrap}>
                                <Text style={modalStyle.time}>
                                    {mmss(this.props.currentPlayData.get('duration'))}
                                </Text>
                                <View style={modalStyle.progressbar}>

                                </View>
                                <Text style={modalStyle.time}>
                                    {this.props.currentPlayData.get('musicIndex') === -1 ?
                                        mmss(0)
                                        :
                                        mmss(this.props.currentMusic.get('duration'))
                                    }
                                </Text>
                            </View>
                            <View style={modalStyle.buttonsWrap}>
                                <TouchableOpacity onPress={() => { this.props.onTogglePlayOptions('isLoop') }}>
                                    <Icon style={[modalStyle.buttonTextColor , this.props.playOptions.get('isLoop') ? modalStyle.checkedButtonColor : null]} name={'sync-alt'} size={20} solid />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon style={modalStyle.buttonTextColor} name={'backward'} size={20} solid />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.onTogglePlayOptions('isPlaying') } }>
                                    {
                                        this.props.playOptions.get('isPlaying') ?
                                            <Icon style={modalStyle.buttonTextColor} name={'pause'} size={20} solid />
                                            :
                                            <Icon style={modalStyle.buttonTextColor} name={'play'} size={20} solid />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon style={modalStyle.buttonTextColor} name={'forward'} size={20} solid />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.onTogglePlayOptions('isRandom') }}>
                                    <Icon style={[modalStyle.buttonTextColor , this.props.playOptions.get('isRandom') ? modalStyle.checkedButtonColor : null]} name={'random'} size={20} solid />
                                </TouchableOpacity>
                            </View>
                            <View style={modalStyle.viewChangeButtonsWrap}>
                                <TouchableOpacity style={modalStyle.viewChangeButton} onPress={this.props.onShowPlaylist}>
                                    <Icon style={modalStyle.viewChangeButtonIcon} size={20} name={'align-justify'} solid />
                                    <Text style={modalStyle.viewChangeButtonText}>플레이리스트</Text>
                                </TouchableOpacity>
                                

                            </View>
                        </View>
                    </View>                      
                </Modal>
        )
    }
}

const modalStyle = StyleSheet.create({
    container : {
        flex : 1,
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
        width : '75%',
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