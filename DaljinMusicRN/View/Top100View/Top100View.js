import React, { Component } from 'react'

import { View , Text, StyleSheet, TouchableOpacity, Image, ScrollView , Animated } from 'react-native'
import { List , Map} from 'immutable'
import { withNavigationFocus } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BottomMenuController from '../BottomMenuController'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Top100MusicsActions from '../../Reducers/top100Musics'

import LoadingView from '../LoadingView'

class Top100View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkList : List(new Array(props.list.size).fill(false)),
            checkCounter : 0,
            bottomMenuShow : false,
        }
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(!prevProps.isFocused && this.props.isFocused) {
                this.dataUpdate()
            }
        }
    }

    componentDidMount() {
        this.dataUpdate()
    }

    dataUpdate = () => {
        this.props.Top100MusicsActions.fetchTop100Musics({from : 1 , to : 100 , init : true , mode : this.props.mode})
    }

    onPressTitleHeaderButton = () => {
        this.props.navigation.openDrawer()
    }


    onPressContent = (index) => {
        let checkCounter = this.state.checkCounter
        let bottomMenuShow = this.state.bottomMenuShow
        
        
        if(this.state.checkList.get(index)) {
            checkCounter--
        }
        else {
            checkCounter++
        }

        if(checkCounter > 0) {
            bottomMenuShow = true
        }
        else {
            bottomMenuShow = false
        }

        this.setState({
            checkList : this.state.checkList.update(index , value => !value),
            checkCounter : checkCounter,
            bottomMenuShow : bottomMenuShow,
        })
    }

    bottomMenuControllerButtons = ({}) => (
        <View style={bottomMenuControllerStyles.bottomControllerButtonsWrap}>
            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'play'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>재생</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'plus'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>재생목록에 추가</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'list'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>내음악에 추가</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    render () {
        return (
            <View style={styles.container}>
                {this.props.isLoading ?
                    <LoadingView />
                    :
                    <React.Fragment>
                    <View style={styles.titleHeader}>
                        <TouchableOpacity style={styles.titleHeaderButton} onPress={() => {this.onPressTitleHeaderButton()}}>
                            <Icon style={styles.titleHeaderButtonTextColor} size={18} name={'stream'} solid />
                        </TouchableOpacity>
                        <Text style={styles.titleHeaderText}>{this.props.title}</Text>
                    </View>

                    <ScrollView style={styles.contentsContainer}>
                        {
                            this.props.list.map(
                                (value , index) => (
                                    <TouchableOpacity key={index} 
                                    style={styles.contentWrap}
                                    onPress={() => { this.onPressContent(index) }}>

                                        <View style={[styles.contentBody , this.state.checkList.get(index) ? styles.checkedBackgroundColor : null]}>
                                            <View style={styles.rankWrap}>
                                                <Text style={[styles.rank , this.state.checkList.get(index) ? styles.checkedFontColor : null]}>
                                                    {index + 1}
                                                </Text>
                                            </View>
                                            <View style={styles.imageWrap}>
                                                <Image style={styles.image} source={{uri: value.getIn(['album' , 'albumImgUri'])}} />
                                            </View>
                                            <View style={styles.infoWrap}>
                                                <Text style={[styles.infoText , this.state.checkList.get(index) ? styles.checkedFontColor : null]}>
                                                    {value.getIn(['singer' , 'name'])}
                                                </Text>
                                                <Text style={[styles.infoText , this.state.checkList.get(index) ? styles.checkedFontColor : null]}>
                                                    {value.getIn(['song'])}
                                                </Text>
                                                <Text style={[styles.infoText , this.state.checkList.get(index) ? styles.checkedFontColor : null]}>
                                                    {value.getIn(['album' , 'name'])}
                                                </Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                )
                            )
                        }
                        <View style={{height : 50 , width : '100%'}}>

                        </View>
                    </ScrollView>
                    <BottomMenuController height={50} show={this.state.bottomMenuShow} buttons={this.bottomMenuControllerButtons}/>
                    </React.Fragment>
                }
            </View>
        )
    }
}




const styles = StyleSheet.create({

    container : {
        flex : 1,
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

    titleHeaderButton : { 
        height : '100%' ,
        aspectRatio : 1 ,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#EEE',
        borderColor : '#CCC',
        borderWidth : 4,
    },

    titleHeaderButtonTextColor : {
        color : '#303030',
    },



    contentsContainer : {
        flex : 1,
        padding :5,
    },

    contentWrap : {
        marginBottom : 4,
    },

    contentBody : {
        flex : 1,
        flexDirection : 'row',
        borderWidth : 2,
        borderRadius : 5,
        overflow : 'hidden',
    },

    rankWrap : {
        flex : 1.5,
        alignItems : 'center',
        justifyContent : 'center',
    },

    rank : {
        fontSize : 24,
        fontFamily : 'jua',
    },

    imageWrap : {
        flex : 2,
    },

    image : {
        width : '100%',
        height : '100%',
        aspectRatio : 1,
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

    checkedBackgroundColor : {
        backgroundColor : '#303030',
        borderColor : '#CCC'
    },

    checkedFontColor : {
        color : '#EEE',
    },

})



const bottomMenuControllerStyles = {
    bottomControllerButtonsWrap : {
        flex : 1, flexDirection : 'row'
    },

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
        musics : state.top100Musics.musics,
        isLoading : state.top100Musics.isLoading,
    }),
    (dispatch) => ({
        Top100MusicsActions : bindActionCreators(Top100MusicsActions , dispatch)
    })
)(withNavigationFocus(Top100View));