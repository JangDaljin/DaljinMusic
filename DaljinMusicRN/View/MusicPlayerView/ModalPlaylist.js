import React , { Component } from 'react'
import { View , Text , Modal , TouchableOpacity , StyleSheet, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ModalHeader from './ModalHeader'

const mmss = (t) => {
    const m = Math.floor(parseInt(t) / 60)
    const s = t % 60
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s )
}

export default class ModalPlaylist extends Component {

    render () {
        return (
            <Modal visible={this.props.show} onRequestClose={() => { this.props.onClose() } } animationType='slide'>
                <View style={styles.container}>
                    <ModalHeader title={'플레이리스트'} onPressBackButton={this.props.onClose} />
                
                    <ScrollView style={styles.listWrap}>
                        {
                            this.props.playlist.map(
                                (value , index) => (
                                    <TouchableOpacity key={index} style={[styles.listItem , this.props.checkedPlaylist.get(index) ? styles.checkedBackgroundColor : null]} onPress={ () => { this.props.onCheckedPlaylist(index) }}>
                                        {
                                            this.props.currentMusicIndex === index ?
                                            <Icon style={[styles.playingInfo , this.props.checkedPlaylist.get(index) ? styles.checkedTextColor : null]} size={15} name={'play'} solid />
                                            :
                                            <Icon style={[styles.playingInfo , this.props.checkedPlaylist.get(index) ? styles.checkedTextColor : null]} size={15} name={'music'} solid />
                                        }
                                        

                                        <View style={styles.listItemInfoWrap}>
                                            <Text style={[styles.listItemInfo , this.props.checkedPlaylist.get(index) ? styles.checkedTextColor : null]}>
                                                {value.getIn(['singer' , 'name'])}-
                                                {value.get('song')}-
                                                {value.getIn(['album' , 'name'])}
                                            </Text>
                                            <Text style={[styles.listItemTime , this.props.checkedPlaylist.get(index) ? styles.checkedTextColor : null]}>
                                                {mmss(value.get('duration'))}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            )
                        }
                    </ScrollView>
                    <View style={styles.buttonsWrap}>
                        <TouchableOpacity style={[styles.controllButton , {borderRightWidth : 1}]}>
                            <Icon style={styles.controllButtonText} size={20} name={'check-circle'} regular />
                            <Text style={[styles.controllButtonText , { paddingLeft : 5 }]}>전체선택</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.controllButton , {borderLeftWidth : 1}]}>
                            <Icon style={styles.controllButtonText} size={20} name={'eraser'} solid />
                            <Text style={[styles.controllButtonText , {paddingLeft : 5 }]}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    header : {
        justifyContent : 'center',
        height : 50,
        backgroundColor : '#303030',
        flexDirection : 'row',
    },

    backButton : {
        height : '100%',
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    headerTitle : {
        flex : 1,
        color : '#EEE',
        textAlignVertical : 'center',
        fontSize : 22,
        fontFamily : 'jua',
    },

    listWrap : {
        flex : 1,
        padding : 10,
    },

    listItem : {
        flex : 1,
        flexDirection : 'row',
        height : 35,
        borderWidth : 2,
        borderColor : '#303030',
        paddingHorizontal : 5,
        marginBottom : 5,
        borderRadius : 10,
    },

    playingInfo : {
        height : '100%',
        aspectRatio : 1,
        textAlign : 'center',
        textAlignVertical : 'center',
    },

    listItemInfoWrap : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        paddingLeft : 5,
    },

    listItemInfo : {
        flex : 1,
        fontFamily : 'jua',
    },

    listItemTime : {
        textAlign : 'center',
        textAlignVertical : 'center',
        fontFamily : 'jua',
    },

    buttonsWrap : {
        flexDirection : 'row',
        height : 50,
    },

    controllButton : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',

        backgroundColor : '#303030',
        borderWidth : 2,
        borderColor : '#AAA',
    },
    
    controllButtonText : {
        textAlign : 'center',
        textAlignVertical : 'center',
        fontFamily : 'jua',
        fontSize : 16,
        color : '#EEE',
    },

    checkedBackgroundColor : {
        backgroundColor : '#303030',
        borderColor : '#AAA',
    },

    checkedTextColor : {
        color : '#EEE',
    }
})