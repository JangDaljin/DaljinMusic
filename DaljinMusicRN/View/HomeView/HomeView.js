import React, { Component } from 'react'

import { ScrollView , Text, StyleSheet, Platform, StatusBar } from 'react-native'
import TodaysLive from './TodaysLive'






class HomeView extends Component {

    render () {
        return (
            <ScrollView style={styles.container}>
                <TodaysLive />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },


})

export default HomeView;