import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'


const LoadingView = ({}) => (
    <ActivityIndicator size='large' color='#0AC' style={styles.indicator} />
)

const styles = StyleSheet.create({
    indicator : {
        flex : 1,
    }
})

export default LoadingView