import React , { Component } from 'react'
import { View , Text , Modal , TouchableOpacity , StyleSheet, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ModalHeader from './ModalHeader'

import { mmss } from '../commonFunctions'

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
                                    <View key={`${value}${index}`} style={styles.listItem}>
                                        <TouchableOpacity style={styles.checkedButton} onPress={ () => { this.props.onCheckedPlaylist(index) } }>
                                        {
                                            this.props.checkedPlaylist.get(index) ?
                                            <Icon style={styles.checkedIcon} size={24} name={'check-circle'} regular />
                                            :
                                            <Icon style={styles.checkedIcon} size={24} name={'circle'} regular />
                                        }
                                        </TouchableOpacity>    

                                        <TouchableOpacity style={[styles.listInfoButton , this.props.checkedPlaylist.get(index) ? styles.checkedBackgroundColor : null , this.props.currentMusicIndex === index ? styles.playingMusicBorder : null]} 
                                        onPress={ () => { this.props.onPlay(index) }}>
                                        {
                                            this.props.currentMusicIndex === index &&
                                            <Icon style={[styles.playingIcon , styles.playingMusicTextColor]} size={15} name={'play'} solid />

                                        }
                                            

                                            <View style={styles.listInfo}>
                                                <Text style={[styles.listInfoText , this.props.checkedPlaylist.get(index) ? styles.checkedTextColor : null , this.props.currentMusicIndex === index ? styles.playingMusicTextColor : null]}>
                                                    {value.getIn(['singer' , 'name'])}-
                                                    {value.get('song')}-
                                                    {value.getIn(['album' , 'name'])}
                                                </Text>
                                                <Text style={[styles.listInfoTime , this.props.checkedPlaylist.get(index) ? styles.checkedTextColor : null , this.props.currentMusicIndex === index ? styles.playingMusicTextColor : null]}>
                                                    {mmss(value.get('duration'))}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    
                                    </View>
                                )
                            )
                        }
                    </ScrollView>
                    <View style={styles.buttonsWrap}>
                        <TouchableOpacity style={[styles.controllButton , {borderRightWidth : 1}]} onPress={ () => { this.props.onCheckedPlaylist(-1) }}>
                            <Icon style={styles.controllButtonText} size={20} name={'check-circle'} regular />
                            <Text style={[styles.controllButtonText , { paddingLeft : 5 }]}>전체선택</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.controllButton , {borderLeftWidth : 1}]} onPress={ () => { this.props.onDeleteListItem() }}>
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
        padding : 10,
    },

    listItem : {
        flex : 1,
        flexDirection : 'row',
        height : 40,
        marginBottom : 5,
    },

    checkedButton : {
        height : '100%',
    },

    checkedIcon : {
        height : '100%',
        aspectRatio : 1,
        textAlign : 'center',
        textAlignVertical : 'center',
    },

    listInfoButton : {
        flex : 1,
        flexDirection : 'row',
        borderWidth : 2,
        borderRadius : 10,
        
        paddingHorizontal : 10,
    },

    listInfo : {
        flex : 1,
        flexDirection : 'row',
    },

    listInfoText : {
        flex : 1,
        textAlignVertical : 'center',
        fontFamily : 'jua',
        fontSize : 16,
    },
    
    listInfoTime : {
        textAlignVertical : 'center',
        textAlign : 'center',
        fontSize : 16,
        fontFamily : 'jua',
        width : 50,
    },

    playingIcon : {
        textAlign : 'center',
        textAlignVertical : 'center',
        marginRight : 5,
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
    },

    playingMusicBorder : {
        borderColor : '#069',
    },

    playingMusicTextColor : {
        color : '#0AC'
    },
})