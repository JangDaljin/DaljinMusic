import React , { Component } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View , ScrollView , Text} from 'react-native'
import { connect } from 'react-redux'
import * as MyMusicsActions from '../../Reducers/myMusics'
import { bindActionCreators } from 'redux'
import LoadingView from '../LoadingView'
import Icon from 'react-native-vector-icons/FontAwesome5'
class ModalMyMusics extends Component {

    render () {
        return (
            <Modal
            onShow={() => { this.props.MyMusicsActions.fetchGetMyMusicLists({ userId : this.props.userId }) }}
            visible={this.props.show}
            onRequestClose={() => { this.props.onClose() } }
            transparent={true}>
                {this.props.isLoading ?
                    <LoadingView />
                    :
                    <TouchableOpacity style={styles.container} onPress={() => { this.props.onClose() } }>

                        <View style={styles.modalBody}>
                            {this.props.myMusicLists.size !== 0 ?
                                <React.Fragment>
                                    <ScrollView style={styles.list} onPress={() => { this.prevent }}>
                                        {this.props.myMusicLists.map(
                                            (value , index) => (
                                                <TouchableOpacity key={index} style={styles.listItem}>
                                                    <Text>{value.get('listName')}</Text>
                                                </TouchableOpacity>
                                            )
                                        )
                                        }
                                    </ScrollView>
                                    <View style={styles.buttonsWrap}>
                                        <TouchableOpacity style={styles.button}>
                                            <Text>등록</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                                :
                                <View style={styles.nothingItem}>
                                    <Icon style={styles.nothingItemIcon} size={30} name={'exclamation'} solid />
                                    <Text style={styles.nothingItemText}>{'리스트 없음'}</Text>
                                </View>
                            }


                        </View>

                    </TouchableOpacity>
                }
            </Modal>
        )
    }

}
export default connect(
    (state) => ({
        userId : state.auth.userId,
        isLoading : state.myMusics.isLoading,
        myMusicLists : state.myMusics.myMusicLists,
    }),
    (dispatch) => ({
        MyMusicsActions : bindActionCreators(MyMusicsActions , dispatch)
    })
)(ModalMyMusics)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    modalBody : {
        width : '80%',
        height : '80%',
        borderWidth : 4,
        borderColor : '#CCC',
        backgroundColor : '#303030',
    },

    list : {
        flex : 4,
        paddingHorizontal : 5,
        paddingTop : 5,
    },

    listItem : {
        height : 50,
        backgroundColor : '#EEE',
        borderBottomColor : '#303030',
        borderBottomWidth : 5,
        justifyContent : 'center',
        paddingHorizontal : 10,
    },

    nothingItem : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    nothingItemIcon : {
        color : '#EEE',
        marginBottom : 10,
    },

    nothingItemText : {
        fontFamily : 'jua',
        color : '#EEE',
        fontSize : 16,
    },

    buttonsWrap : {
        height : 50,
        padding : 5,
    },

    button : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        
        backgroundColor : '#CCC',
    },

})