import React, { Component } from 'react'

import { ScrollView , Text, StyleSheet, Platform, StatusBar } from 'react-native'
import TodaysLive from './TodaysLive'
import SuggestMusicsView from './SuggestMusicsView'






class HomeView extends Component {

    render () {
        return (
            <ScrollView style={styles.container}>
                <TodaysLive />
                <SuggestMusicsView />
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