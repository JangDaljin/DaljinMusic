import React , { Component } from 'react'
import { View, Text , StyleSheet, Image , Dimensions } from 'react-native'
import { commonStyles } from './commonStyles'


const { width , height } = Dimensions.get('window')

class TodaysLive extends Component {


    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    #오늘의 라이브
                </Text>
                <View style={styles.infoContainer}>
                    <Image style={styles.image} source={require('../../testImg/test1.jpg')} />
                    <View style={styles.info}>
                        <Text style={styles.infoFixedText}>가수</Text>
                        <Text style={styles.infoInFixedText}>zxcv</Text>
                        <Text style={styles.infoFixedText}>제목</Text>
                        <Text style={styles.infoInFixedText}>qwer</Text>
                        <Text style={styles.infoFixedText}>앨범</Text>
                        <Text style={styles.infoInFixedText}>asdf</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    infoContainer : {
        borderWidth : 2,
        borderRadius : 10,
        overflow : 'hidden',
        paddingBottom : 3,
    },
    image : width > height ? 
        {
            width : height,
            height : undefined,
            aspectRatio : 1,
    }
        :
        {
            width : '100%',
            height : undefined,
            aspectRatio : 1,
    }
    ,
    info : {
        flex : 1,
        flexDirection : 'row',
        borderTopWidth : 2,
        paddingTop : 5,
        paddingLeft : 5,
        paddingRight : 5,
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