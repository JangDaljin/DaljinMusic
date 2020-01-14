import React, { Component } from 'react'

import { View , Text, StyleSheet, Platform, StatusBar } from 'react-native'


class Home extends Component {


    render () {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
        ...Platform.select({
            android : {
                paddingTop : StatusBar.currentHeight,
            }
            ,
            ios : {
                paddingTop : 20
            }
        })
    },


})

export default Home;