import React , { Component } from 'react'

import { commonStyles } from './commonStyles'

import { Map , List } from 'immutable'
import { StyleSheet , View , Text, Image } from 'react-native'

const testData = List([
    Map({
        song : 'a',
        singer : 'a',
        album : 'a',
    }),
    Map({
        song : 'b',
        singer : 'b',
        album : 'b',
    }),
    Map({
        song : 'c',
        singer : 'c',
        album : 'c',
    }),
])

class HotAndNewMusicsView extends Component {

    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>#HOT AND NEW</Text>

                <View style={styles.contentsWrap}>
                    {
                        testData.map(
                            (value , index) => (
                                <View key={index} style={styles.content}>
                                    <View style={styles.imageWrap}>
                                        <Image style={styles.image} source={require('../../testImg/test2.jpg')} />
                                    </View>
                                    <View style={styles.infoWrap}>
                                        <Text style={styles.info}>
                                            {value.get('singer')}
                                        </Text>
                                        <Text style={styles.info}>
                                            {value.get('song')}
                                        </Text>
                                        <Text style={styles.info}>
                                            {value.get('album')}
                                        </Text>
                                    </View>

                                </View>
                            )
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentsWrap : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
    },
    content : {
        flexDirection : 'row',
        width : '100%',
        borderWidth : 2,
        margin : 2,
        borderRadius : 10,
        overflow : 'hidden',
    },
    imageWrap : {
        flex : 1,
    },
    image : {
        width : '100%',
        height : undefined,
        aspectRatio : 1,
    },
    infoWrap : {
        flex : 4,
    },
    info : {
        flex : 1,
        textAlignVertical : 'center',
        paddingLeft : 5,
        fontFamily : 'jua',
    },
})


export default HotAndNewMusicsView