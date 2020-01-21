import React , { Component } from 'react'
import { View , Text, StyleSheet} from 'react-native'

import { commonStyles } from './commonStyles'


class SuggestMusicsView extends Component {


    render () {
        return (
            <View style={commonStyles.container}>

                <Text style={commonStyles.title}>
                    #추천음악
                </Text>

                <View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    


})


export default SuggestMusicsView