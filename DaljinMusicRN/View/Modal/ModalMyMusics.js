import React , { Component } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View , ScrollView , Text} from 'react-native'
import { connect } from 'react-redux'
import * as MyMusicsActions from '../../Reducers/myMusics'
import { bindActionCreators } from 'redux'
import LoadingView from '../LoadingView'
import Icon from 'react-native-vector-icons/FontAwesome5'
class ModalMyMusics extends Component {

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(!prevProps.isLoading && this.props.isLoading) {
                this.setState({
                    checkedIndex : -1,
                })
            }
        }
    }

    state = {
        checkedIndex :  -1,
    }

    onCheck = (index) => {
        let checkedIndex
        if(this.state.checkedIndex === index) {
            checkedIndex = -1
        }
        else {
            checkedIndex = index
        }
        this.setState({
            checkedIndex : checkedIndex
        })
    }

    onClickAdd = () => {
        this.props.MyMusicsActions.fetchAddMusicInList({
            userId : this.props.userId,
            listId : this.props.myMusicLists.getIn([this.state.checkedIndex , '_id']),
            musicId : this.props.selectedMusicIds.toJS()
        })
        this.props.onClose()
    }

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
                                                <TouchableOpacity key={index} style={[styles.listItem , this.state.checkedIndex ===  index ?  styles.checkedListItem : styles.uncheckedListItem]} onPress={() => { this.onCheck(index) }}>
                                                    <Text style={{fontFamily : 'jua'}}>{value.get('listName')}</Text>
                                                </TouchableOpacity>
                                            )
                                        )
                                        }
                                    </ScrollView>
                                    <View style={styles.buttonsWrap}>
                                        <TouchableOpacity style={styles.button} onPress={() => { this.onClickAdd() }}>
                                            <Text style={{fontFamily : 'jua'}}>등록</Text>
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
        justifyContent : 'center',
        borderWidth : 4,
        paddingHorizontal : 10,
    },

    uncheckedListItem : {
        borderColor : '#303030',
    },

    checkedListItem : {
        borderColor : '#069'
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