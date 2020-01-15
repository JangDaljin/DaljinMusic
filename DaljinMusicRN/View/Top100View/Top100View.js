import React, { Component } from 'react'

import { View , Text, StyleSheet } from 'react-native'


class Top100View extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Text>Top 100</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },


})

export default Top100View;