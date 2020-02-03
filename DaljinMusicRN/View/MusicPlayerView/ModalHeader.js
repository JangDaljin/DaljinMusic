import React , { Component } from 'react'
import { View , Text , TouchableOpacity , StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class ModalHeader extends Component {

    render () {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={this.props.onPressBackButton}>
                    <Icon style={{color : '#EEE'}} size={24} name={'angle-left'} solid />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    header : {
        justifyContent : 'center',
        height : 50,
        backgroundColor : '#303030',
        flexDirection : 'row',
    },

    headerTitle : {
        flex : 1,
        color : '#EEE',
        textAlignVertical : 'center',
        fontSize : 22,
        fontFamily : 'jua',
    },

    backButton : {
        height : '100%',
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
})