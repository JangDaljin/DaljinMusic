import React, { Component } from 'react'

import { View , Text, StyleSheet } from 'react-native'


class MyMusics extends Component {


    render () {
        return (
            <View style={styles.container}>
                <Text>My Musics</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },


})

export default MyMusics;