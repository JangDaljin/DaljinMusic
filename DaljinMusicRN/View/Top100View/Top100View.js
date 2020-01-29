import React, { Component } from 'react'

import { View , Text, StyleSheet, TouchableOpacity, Image, ScrollView , Animated } from 'react-native'
import { List , Map} from 'immutable'

import BottomMenuController from '../BottomMenuController'
class Top100View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkList : List(new Array(props.list.size).fill(false)),
            checkCounter : 0,
            bottomMenuShow : false,
        }
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

    render () {
        return (
            <View style={styles.container}>
                
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
                <BottomMenuController height={50} show={this.state.bottomMenuShow} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
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

export default Top100View;