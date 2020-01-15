import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'


const LoadingView = ({ show }) => (
    show ?
    <ActivityIndicator size='large' color='#0AC' style={styles.indicator} />
    :
    null
)

const styles = StyleSheet.create({
    indicator : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        backgroundColor : '#30303055'
    }
})

export default LoadingView