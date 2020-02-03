import React , { Component } from 'react'
import { View , Text , Modal , TouchableOpacity , StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ModalHeader from './ModalHeader'

export default class ModalPlaylist extends Component {
    

    render () {
        return (
            <Modal visible={this.props.show} onRequestClose={() => { this.props.onClose() } } animationType='slide'>
                <View style={styles.container}>
                    <ModalHeader title={'플레이리스트'} onPressBackButton={this.props.onClose} />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    header : {
        justifyContent : 'center',
        height : 50,
        backgroundColor : '#303030',
        flexDirection : 'row',
    },

    backButton : {
        height : '100%',
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    headerTitle : {
        flex : 1,
        color : '#EEE',
        textAlignVertical : 'center',
        fontSize : 22,
        fontFamily : 'jua',
    },
})