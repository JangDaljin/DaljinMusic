import React, { Component } from 'react'

import { View , Text, StyleSheet } from 'react-native'


class Signup extends Component {


    render () {
        return (
            <View style={styles.container}>
                <Text>Signup</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },


})

export default Signup;