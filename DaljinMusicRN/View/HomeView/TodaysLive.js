import React , { Component } from 'react'
import { View, Text , StyleSheet, Image , Dimensions } from 'react-native'

const { width , height } = Dimensions.get('window')

class TodaysLive extends Component {


    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    #오늘의 라이브
                </Text>
                <Image style={styles.image} source={require('../../testImg/test1.jpg')} resizeMode='contain' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column'
    },
    title : {
        alignSelf : 'center',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : 'blue',
        borderStyle : 'solid',
    },
    image : {
        height : 200,
        width : width,
    }
})



export default TodaysLive