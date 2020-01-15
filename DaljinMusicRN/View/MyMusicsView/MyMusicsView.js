import React, { Component } from 'react'

import { View , Text, StyleSheet } from 'react-native'


class MyMusicsView extends Component {


    render () {
        return(
            <View style={styles.container}>
                <Text>
                    MyMusics
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container : {
        flex : 1,
    },


})

export default MyMusicsView;