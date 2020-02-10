import React , { Component } from 'react'
import { ScrollView , StyleSheet } from 'react-native'


import AuthComponent from './AuthComponent'

class SettingView extends Component {



    render () {
        return (
            <ScrollView style={styles.container}>
                <AuthComponent />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
})


export default SettingView