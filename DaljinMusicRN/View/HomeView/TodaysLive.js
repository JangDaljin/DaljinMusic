import React , { Component } from 'react'
import { View, Text , StyleSheet, Image , Dimensions , ToastAndroid } from 'react-native'
import { commonStyles } from './commonStyles'

import { url } from '../commonFunctions'
const win = Dimensions.get('window')

class TodaysLive extends Component {

    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    #오늘의 라이브
                </Text>
                <View style={styles.contentsContainer}>
                    <View style={styles.imageWrap}>
                        <Image style={styles.image} source={{uri : url(this.props.music.getIn(['album' , 'albumImgUri']))}} />
                    </View>
                    <View style={styles.infoWrap}>
                        <View style={styles.infoTextWrap}>  
                            <Text style={styles.infoFixedText}>가수</Text>
                            <Text style={styles.infoInFixedText}>{this.props.music.getIn(['singer' , 'name'])}</Text>
                        </View>

                        <View style={styles.infoTextWrap}>
                            <Text style={styles.infoFixedText}>제목</Text>
                            <Text style={styles.infoInFixedText}>{this.props.music.getIn(['song'])}</Text>
                        </View>

                        <View style={styles.infoTextWrap}>
                            <Text style={styles.infoFixedText}>앨범</Text>
                            <Text style={styles.infoInFixedText}>{this.props.music.getIn(['album' , 'name'])}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentsContainer : {
        flex : 1,
        
        borderWidth : 2,
        borderRadius : 10,
        overflow : 'hidden',
        paddingBottom : 3,
        
    },

    imageWrap : {
        width : '100%',
        aspectRatio : 1,
    },

    image : {
        width : '100%',
        height : '100%',
    },

    infoWrap : {
        width : '100%',
        flexDirection : 'row',
        borderTopWidth : 2,
        paddingTop : 5,
        paddingLeft : 5,
        paddingRight : 5,
    },

    infoTextWrap : {
        flex : 1,
        flexDirection : 'row',
    },

    infoFixedText : {
        fontFamily : 'jua',
        borderWidth : 2,
        textAlign : 'center',
        textAlignVertical : 'center',
        width : 30,
        borderRadius : 5,
    },
    infoInFixedText : {
        flex : 1,
        fontFamily : 'jua',
        paddingLeft : 5,
        paddingRight : 5,
        textAlignVertical : 'center',
    }
    
})



export default TodaysLive