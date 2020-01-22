import React , { Component } from 'react'

import { commonStyles } from './commonStyles'
import { Map , List } from 'immutable'
import { View , Text , StyleSheet } from 'react-native'

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


class Top10View extends Component {

    
    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>#TOP 10</Text>

                <View style={styles.contentsWrap}>
                    {
                        testData.map(
                            (value , index) => (
                                <View style={styles.content}>
                                    <Text style={styles.rank}>
                                        {index+1}
                                    </Text>
                                    
                                    <Text style={styles.song}>
                                        {value.get('song')}
                                    </Text>
                                    <Text style={styles.singer}>
                                        {value.get('singer')}
                                    </Text>
                                    <Text style={styles.album}>
                                        {value.get('album')}
                                    </Text>
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
    },
    content : {
        flex : 1,
        flexDirection : 'row',
    },
    rank : {
        width : 30,
        textAlign : 'center',
    },
    song : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },
    singer : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },
    album : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },
})

export default Top10View