import React, { Component } from 'react'

import { View , Text, StyleSheet, TouchableOpacity, Image, ScrollView , Animated } from 'react-native'
import { List , Map} from 'immutable'

import Icon from 'react-native-vector-icons/FontAwesome5'

class Top100View extends Component {

    state = {
        testData : List([
            Map({
                song : 'a',
                singer : {
                    name : 'a'
                },
                album : {
                    name : 'a',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'b',
                singer : {
                    name : 'b'
                },
                album : {
                    name : 'b',
                    albumImgUri : '../../testImg/test2.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            }),
            Map({
                song : 'c',
                singer : {
                    name : 'c'
                },
                album : {
                    name : 'c',
                    albumImgUri : '../../testImg/test1.jpg'
                },
                checked : false,
            })
        ]),

        checkedCounter : 0,
        bottomControllerAnimationValue : new Animated.Value(0),
        bottomControllerAnimationPosition : -50,
        bottomControllerAnimationOpacity : 0,
    }

    onPressContent = (index) => {
        let checkedCounter = this.state.checkedCounter
        if(!this.state.testData.getIn([index , 'checked'])) {
            if(checkedCounter === 0) {
                this.setState({ 
                    bottomControllerAnimationValue : new Animated.Value(0),
                    
                    bottomControllerAnimationPosition : this.state.bottomControllerAnimationValue.interpolate({
                        inputRange : [0 , 1],
                        outputRange : [-50 , 0]
                    }) ,

                    bottomControllerAnimationOpacity : this.state.bottomControllerAnimationValue.interpolate({
                        inputRange : [0 , 1],
                        outputRange : [0 , 1],
                    }) 
                })

                Animated.timing(this.state.bottomControllerAnimationValue , {
                    toValue : 1,
                    duration : 500,
                    delay : 0,
                }).start()
            }
            checkedCounter++
        }
        else {
            this.setState({ 
                bottomControllerAnimationValue : new Animated.Value(0),

                bottomControllerAnimationPosition : this.state.bottomControllerAnimationValue.interpolate({
                    inputRange : [0 , 1],
                    outputRange : [0 , -50]
                }) ,
                
                bottomControllerAnimationOpacity : this.state.bottomControllerAnimationValue.interpolate({
                    inputRange : [0 , 1],
                    outputRange : [1 , 0],
                }) 
            })

            Animated.timing(this.state.bottomControllerAnimationValue , {
                toValue : 1,
                duration : 500,
                delay : 0,
            }).start()
            checkedCounter--
        }
        this.setState({ testData : this.state.testData.updateIn([index , 'checked'] , value => !value) , checkedCounter : checkedCounter})
    }

    render () {
        return (
            <View style={styles.container}>
                
                <ScrollView style={styles.contentsContainer}>
                    {
                        this.state.testData.map(
                            (value , index) => (
                                <TouchableOpacity key={index} 
                                style={styles.contentWrap}
                                onPress={() => { this.onPressContent(index) }}>

                                    <View style={[styles.contentBody , this.state.testData.getIn([index , 'checked']) ? styles.checkedBackgroundColor : null]}>
                                        <Text style={[styles.rank , this.state.testData.getIn([index , 'checked']) ? styles.checkedFontColor : null]}>
                                            {index + 1}
                                        </Text>
                                        <View style={styles.imageWrap}>
                                            <Image style={styles.image} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} />
                                        </View>
                                        <View style={styles.infoWrap}>
                                            <Text style={[styles.infoText , this.state.testData.getIn([index , 'checked']) ? styles.checkedFontColor : null]}>
                                                {value.getIn(['singer' , 'name'])}
                                            </Text>
                                            <Text style={[styles.infoText , this.state.testData.getIn([index , 'checked']) ? styles.checkedFontColor : null]}>
                                                {value.getIn(['song'])}
                                            </Text>
                                            <Text style={[styles.infoText , this.state.testData.getIn([index , 'checked']) ? styles.checkedFontColor : null]}>
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
                {this.state.checkedCounter > 0 &&
                <Animated.View style={[styles.bottomController , 
                        {
                            opacity : this.state.bottomControllerAnimationOpacity ,
                            bottom : this.state.bottomControllerAnimationPosition ,
                        }
                    ]}>
                    <TouchableOpacity style={styles.bottomControllerButton}>
                        <View style={styles.bottomControllerButtonBody}>
                            <Icon style={styles.bottomControllerButtonFontColor} name={'play'} size={16} solid />
                            <Text style={[{marginLeft : 6 , fontFamily : 'jua' } , styles.bottomControllerButtonFontColor]}>재생</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomControllerButton}>
                        <View style={styles.bottomControllerButtonBody}>
                            <Icon style={styles.bottomControllerButtonFontColor} name={'plus'} size={16} solid />
                            <Text style={[{marginLeft : 6 , fontFamily : 'jua' } , styles.bottomControllerButtonFontColor]}>추가</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomControllerButton}>
                        <View style={styles.bottomControllerButtonBody}>
                            <Icon style={styles.bottomControllerButtonFontColor} name={'list'} size={16} solid />
                            <Text style={[{marginLeft : 6 , fontFamily : 'jua' } , styles.bottomControllerButtonFontColor]}>목록에 추가</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                }
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

    bottomController : {
        position : 'absolute',
        bottom : 0,
        width : '100%',
        height : 50,
        backgroundColor : '#303030',
        flex : 1,
        flexDirection : 'row',
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

    bottomControllerButtonFontColor : {
        color : '#EEE',
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

    rank : {
        flex : 1.5,
        textAlignVertical : 'center',
        textAlign : 'center',
        fontSize : 24,
        fontFamily : 'jua',
    },

    imageWrap : {
        flex : 2,
    },

    image : {
        width : '100%',
        height : undefined,
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