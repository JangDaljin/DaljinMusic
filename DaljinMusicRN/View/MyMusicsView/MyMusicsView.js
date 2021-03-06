import React, { Component } from 'react'

import { View , Text, StyleSheet , ScrollView, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native'
import { List } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BottomMenuController from '../BottomMenuController'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as MyMusicsActions from '../../Reducers/myMusics'
import * as MusicPlayerActions from '../../Reducers/musicPlayer'
import * as ModalActions from '../../Reducers/modal'

import { useRoute } from '@react-navigation/native'
import LoadingView from '../LoadingView'
import { url } from '../commonFunctions'

class MyMusicsView extends Component {

    constructor(props) {
        super(props);

        const myMusicListIndex = props.myMusicLists.findIndex(value => value.get('listName') === props.route.name)

        this.state = {
            myMusicListIndex : myMusicListIndex,
            checkedList : List(new Array(props.myMusicLists.getIn([myMusicListIndex , 'list']).size).fill(false)),
            checkCounter : 0,
            bottomMenuShow : false,
            popupMenuShow : false,
        }
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.myMusicLists === this.props.myMusicLists) {
                const myMusicListIndex = this.props.myMusicLists.findIndex(value => value.get('listName') === props.route.name)
                this.setState({
                    myMusicListIndex : myMusicListIndex,
                    checkedList : List(new Array(this.props.myMusicLists.getIn([myMusicListIndex , 'list']).size).fill(false)),
                    checkCounter : 0,
                    bottomMenuShow : false,
                    popupMenuShow : false,
                })
            }
        }
    }

    onPressContent = (index) => {

        let checkCounter = this.state.checkCounter
        let bottomMenuShow = this.state.bottomMenuShow

        if(this.state.checkedList.get(index)) {
            checkCounter--
        }
        else {
            checkCounter++
        }

        if(checkCounter === 0) {
            bottomMenuShow = false    
        }
        else {
            bottomMenuShow = true
        }


        this.setState({
            checkedList : this.state.checkedList.update(index , value => !value),
            checkCounter : checkCounter,
            bottomMenuShow : bottomMenuShow,
        })
    }

    popupMenuShow = () => {
        this.setState({
            popupMenuShow : true
        })
    }

    popupMenuHide = () => {
        this.setState({
            popupMenuShow : false
        })
    }

    onPressTitleHeaderButton = () => {
        this.props.navigation.openDrawer()
    }

    onPressAllSelect = () => {
        let checkCounter = 0
        let bottomMenuShow = false
        const checkedList = this.state.checkedList.map(value => {
            if(!value) {
                checkCounter++
            }
            return !value
        })
        if(checkCounter !== 0) {
            bottomMenuShow = true
        }
        this.setState({
            checkedList : checkedList,
            checkCounter : checkCounter,
            bottomMenuShow : bottomMenuShow,
        })
        this.popupMenuHide()
    }


    onPlay = () => {
        this.props.MusicPlayerActions.remotePlay({
            userId : this.props.userId,
            addList : this.props.myMusicLists.getIn([this.state.myMusicListIndex  , 'list'])
                .filter(
                    (value , index) => (
                        this.state.checkedList.get(index)
                    )
                )
                .map(
                    value => (
                        value.get('_id')
                    )
                )
                .toJS()
        })
    }

    onAddItemInPlaylist = () => {
        this.props.MusicPlayerActions.fetchPlayListItemAdd({
            userId : this.props.userId,
            addList : this.props.myMusicLists.getIn([this.state.myMusicListIndex  , 'list'])
                .filter(
                    (value , index) => (
                        this.state.checkedList.get(index)
                    )
                )
                .map(
                    value => (
                        value.get('_id')
                    )
                )
                .toJS()
        })
    }

    onDeleteMusicInList = () => {
        const indexes = this.state.checkedList.map(
            (value , index) => {
                if(value) {
                    return index
                } 
                else {
                    return null
                }
            }
        ).filter(value => value !== null)
        
        this.props.MyMusicsActions.fetchRemoveMusicInList({
            userId : this.props.userId,
            listId : this.props.myMusicLists.getIn([this.state.myMusicListIndex , '_id']),
            indexes : indexes.toJS()
        })
        
    }



    bottomMenuControllerButtons = ({}) => (
        <View style={{flex : 1, flexDirection : 'row'}}>
            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton} onPress={() => { this.onPlay() }}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'play'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>재생</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton} onPress={() => { this.onAddItemInPlaylist() }}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'plus'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>재생목록에 추가</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton} onPress={() => { this.onDeleteMusicInList() }}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'trash'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>삭제</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    modalMenus = ({}) => (
        <TouchableOpacity style={styles.modalContainer} onPress={() => {this.popupMenuHide()}}>
            <TouchableOpacity style={styles.modalItem} onPress={() => { this.onPressAllSelect() }}>
                <Icon style={[styles.modalItemFont , styles.modalItemIcon]}size={16} name={'check'} solid />
                <Text style={[styles.modalItemFont , styles.modalItemText]}>전체선택</Text>
            </TouchableOpacity>

            {/*
            <TouchableOpacity style={styles.modalItem}>
                <Icon style={[styles.modalItemFont , styles.modalItemIcon]} size={16} name={'trash'} solid />
                <Text style={[styles.modalItemFont , styles.modalItemText]}>삭제</Text>
            </TouchableOpacity>
            */}

        </TouchableOpacity>
    )

    render () {
        return(
            this.props.isLoading?
            <LoadingView />
            :
            <View style={{flex : 1}}>
                <View style={styles.titleHeader}>
                    <TouchableOpacity style={styles.titleHeaderLeftButton} onPress={() => {this.onPressTitleHeaderButton()}}>
                        <Icon style={styles.titleHeaderLeftButtonTextColor} size={18} name={'stream'} solid />
                    </TouchableOpacity>
                    <Text style={styles.titleHeaderText}>{this.props.myMusicLists.getIn([this.state.myMusicListIndex , 'listName'])}</Text>
                    <TouchableOpacity style={styles.titleHeaderRightButton} onPress={() => {this.popupMenuShow()}}>
                        <Icon style={styles.titleHeaderRightButtonTextColor} size={18} name={'ellipsis-v'} solid /> 
                    </TouchableOpacity>



                    <Modal transparent={true} visible={this.state.popupMenuShow}>
                        <this.modalMenus />
                    </Modal>

                </View>
                
                <ScrollView style={styles.scroll}>

                    <View style={styles.container}>
                    {
                        this.props.myMusicLists.getIn([this.state.myMusicListIndex  , 'list']).map(
                            (value , index) => (
                                    <TouchableOpacity key={`${value}${index}`} style={[styles.content , this.state.checkedList.get(index) ? styles.checkedContent : null]} onPress={() => { this.onPressContent(index) }}>
                                        <View style={styles.imageWrap}>
                                            <Image style={styles.image} source={{uri : url(value.getIn(['album' , 'albumImgUri']))}} />
                                        </View>
                                        <View style={styles.infoWrap}>
                                            <Text style={styles.info} numberOfLines={2}>
                                                {value.getIn(['singer' , 'name'])}-
                                                {value.getIn(['song'])}-
                                                {value.getIn(['album' , 'name'])}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                            )
                        )
                    }
                    </View>

                    <View style={{height : 50}}>

                    </View>

                </ScrollView>

                <BottomMenuController height={50} show={this.state.bottomMenuShow} buttons={this.bottomMenuControllerButtons} />
            </View>
            
        )
    }
}


const styles = StyleSheet.create({

    scroll : {
        flex : 1,
        padding : 5,
    },

    container : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'flex-start',
    },

    titleHeader : {
        flexDirection : 'row' ,
        height : 50 ,
        backgroundColor : '#303030' ,
        alignItems: 'center',
    },

    titleHeaderText : {
        flex : 1,
        fontSize : 20,
        color : '#EEE',
        fontFamily : 'jua',
        paddingHorizontal : 10,
    },

    titleHeaderLeftButton : {
        height : '100%',
        aspectRatio : 1,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 4,
        borderColor : '#CCC',
        backgroundColor : '#EEE',
    },

    titleHeaderRightButton : { 
        height : '100%' ,
        aspectRatio : 1 ,
        justifyContent : 'center',
        alignItems : 'center'
    },
    
    titleHeaderLeftButtonTextColor : {
        color : '#303030'
    },

    titleHeaderRightButtonTextColor : {
        color : '#EEE'
    },

    content : {
        width : 125,
        padding : 5,
        margin : 4,
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    checkedContent : {
        borderWidth : 4,
        borderStyle : 'solid',
        borderColor : '#0AC',
        borderRadius : 8,
    },

    checkedItem : {
        borderWidth : 4,
        borderColor : '#069',
    },

    imageWrap : {
        width : '70%',
    },

    image : {
        width : '100%',
        height : undefined,
        aspectRatio : 1,
    },

    infoWrap : {
        flex : 1,
        alignSelf : 'center',
    },

    modalContainer : {
        flex : 1,
        paddingTop : 50,
        alignItems : 'flex-end',
        justifyContent : 'flex-start',
    },

    modalItem : {
        flexDirection : 'row',
        width : 100,
        height : 30,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#EEE',
        borderLeftWidth : 1,
        borderRightWidth : 1,
        borderBottomWidth : 1,
        borderColor : '#CCC',
    },

    modalItemFont : {
        color : '#303030',
        fontFamily : 'jua',
    },

    modalItemText : {
        flex : 1,
        marginLeft : 4,
        textAlignVertical : 'center',
    },

    modalItemIcon : {
        height : '100%',
        aspectRatio : 1,
        textAlignVertical : 'center',
        textAlign : 'center',
    }



})

const bottomMenuControllerStyles = {
    bottomControllerButton : {
        flex : 1,
        borderWidth : 1,
        borderColor : '#EEE',
    },

    bottomControllerButtonBody : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    },

    bottomControllerButtonIcon : {
        color : '#EEE',
    },

    bottomControllerButtonFont : {
        color : '#EEE',
        marginLeft : 6 , 
        fontFamily : 'jua',
    },
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        isLoading : state.myMusics.isLoading,
        myMusicLists : state.myMusics.myMusicLists,
    }),
    (dispatch) => ({
        MyMusicsActions : bindActionCreators(MyMusicsActions , dispatch),
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch),
    })
)(function(props) {
    const route = useRoute()
    return <MyMusicsView {...props} route={route} />
});