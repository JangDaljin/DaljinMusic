import React , { Component } from 'react'
import { View , ScrollView , Text , StyleSheet, TextInput, TouchableOpacity, Modal, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../Reducers/auth'
import * as ModalActions from '../../Reducers/modal'

import LoadingView from '../LoadingView'

class ModalSignin  extends Component {

    onShow = () => {
        this.props.AuthActions.fetchIsLogged()
    }

    state = {
        userId : '',
        userPw : '',
    }

    onChangeUserId = (text) => {
        this.setState({userId : text})
    }

    onChangeUserPw = (text) => {
        this.setState({userPw : text})
    }

    onPressLoginButton = () => {
        this.props.AuthActions.fetchLogin({userId : this.state.userId , userPw : this.state.userPw})
    }

    componentDidUpdate (prevProps , prevState) {
        if(prevProps !== this.props) {
            if(this.props.isAuthenticated) {
                this.onClose()
            }
        }
    }

    onClose = () => {
        this.props.AuthActions.hideModal()
    }

    render () {
        return (
            <Modal visible={this.props.modalShow} animationType='slide' onRequestClose={ () => { this.onClose() }} onShow={this.onShow}>
                {this.props.isLoading ?
                    <LoadingView />
                    :
                    <View style={styles.container}>

                        <View style={styles.signinContainer}>
                                
                            <View style={styles.loginDataWrap}>
                                <View style={[styles.dataWrap, {marginBottom : 5}]}>
                                    <TextInput style={styles.plainTextInput} placeholder="아이디" placeholderTextColor={'#303030'} onChangeText={this.onChangeUserId} returnKeyType='next' onSubmitEditing={() => { this.userPw.focus() }}/>
                                </View>

                                <View style={styles.dataWrap}>
                                    <TextInput ref={ref => { this.userPw = ref }} secureTextEntry={true} style={styles.plainTextInput} placeholder="비밀번호" placeholderTextColor={'#303030'} onChangeText={this.onChangeUserPw} returnKeyType='done' onSubmitEditing={this.onPressLoginButton} />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.loginButton} onPress={this.onPressLoginButton}>
                                <Icon style={{color : '#303030' , textAlignVertical : 'center' , textAlign : 'center'}} size={26} name={'lock'} solid />
                            </TouchableOpacity>

                        </View>

                        <View style={styles.bottomButtonsContainer}>
                            <TouchableOpacity style={styles.bottomButton}>
                            <Icon style={{color : '#EEE' , marginRight : 3}} size={16} name={'user'} solid />
                                <Text style={{color : '#EEE'}}>
                                    아이디 찾기
                                </Text>    
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButton}>
                                <Icon style={{color : '#EEE' , marginRight : 3}} size={16} name={'key'} solid />
                                <Text style={{color : '#EEE'}}>
                                    비밀번호 찾기
                                </Text>    
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButton} onPress={() => { this.props.ModalActions.modalSignupShow() }}>
                                <Icon style={{color : '#EEE' , marginRight : 3}} size={16} name={'user-plus'} solid />
                                <Text style={{color : '#EEE'}}>
                                    회원가입
                                </Text>     
                            </TouchableOpacity>
                        </View>

                    </View>
                }
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#303030',
        paddingHorizontal : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },

    signinContainer : {
        flexDirection : 'row',
        marginBottom : 20,
        height : 80,
    },

    loginDataWrap : {
        flex : 1,
        marginRight : 5,
    },

    dataWrap : {
        flex : 1,
        flexDirection : 'row',
    },

    plainTextInput : {
        flex : 1,
        paddingHorizontal : 10,
        borderWidth : 2,
        borderRadius : 10,
        backgroundColor : '#EEE',
        borderColor : '#AAA',
    },

    loginButton : {
        borderWidth : 2,
        borderRadius : 10,
        height : '100%',
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderColor : '#AAA',
        backgroundColor : '#EEE',
    },

    bottomButtonsContainer : {
        flexDirection : 'row'
    },

    bottomButton : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },
})

export default connect(
    (state) => ({
        modalShow : state.auth.modalShow,
        isAuthenticated : state.auth.isAuthenticated,
        isLoading : state.auth.isLoading,
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(AuthActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch),
    })
)(ModalSignin)