import React, { Component } from 'react'

import { View , Text, StyleSheet, Modal , TextInput, TouchableHighlight, TouchableOpacity, ToastAndroid, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../Reducers/auth'

class ModalSignup extends Component {


    state = {
        userId : '',
        userPw : '',
        userPwConfirm : '',
        userNickName : '',

        verifyUserId : false,
        verifyUserPw : false,
        verifyUserPwConfirm : false,
        verifyUserNickName : false,

    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.verifyIdLoading && !this.props.verifyIdLoading) {
                this.setState({verifyUserId : this.props.verifyId})
            }

            if(prevProps.signupLoading && !this.props.signupLoading) {
                if(this.props.signup) {
                    this.props.onClose()
                }
                else {
                    //실패
                }                
            }
        }
    }

    onVerifyUserId = () => {
        this.props.AuthActions.fetchVerifyId({userId : this.state.userId})
    }

    onVerifyUserPw = () => {
        let result
        const regex = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()\-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;
        if(regex.test(this.state.userPw)) {
            result = true
        }
        else {
            result = false
        }
        this.setState({verifyUserPw : result})
    }
    
    onVerifyUserPwConfirm = (e) => {
        let result
        if(this.state.userPw === this.state.userPwConfirm) {
            result = true
        }
        else {
            result = false
        }
        this.setState({verifyUserPwConfirm : result})
    }

    onVerifyUserNickName = (e) => {
        let result
        const regex = /^(?=.*\w{0,8})(?=.*[가-힣]{0,8}).{2,8}$/;
        if(regex.test(this.state.userNickName)) {
            result = true
        }
        else {
            result = false
        }
        this.setState({verifyUserNickName : result})
    }

    onPressSubmit = () => {
        //변경 방지
        this.userId.blur()
        this.userPw.blur()
        this.userPwConfirm.blur()
        this.userNickName.blur()

        //재확인
        this.onVerifyUserId()
        this.onVerifyUserPw()
        this.onVerifyUserPwConfirm()
        this.onVerifyUserNickName()

        setTimeout(() => {
            if(this.state.verifyUserId && this.state.verifyUserPw && this.state.verifyUserPwConfirm && this.state.verifyUserNickName) {
                this.props.AuthActions.fetchSignup({
                    userId : this.state.userId,
                    userPw : this.state.userPw,
                    userName : this.state.userNickName,
                })
            }
            else {
                //실패
            }
        } ,  1500)

    }

    render () {
        return (
            <Modal 
            animationType='slide'
            visible={this.props.show} 
            onRequestClose={() => { this.props.onClose() }}>
                
                <View style={styles.container}>

                    <View style={styles.table}>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitleText}>아이디</Text>
                            <TextInput style={styles.tableRowInput} ref={ref => { this.userId = ref }} onChangeText={(text) => { this.setState({ userId : text , verifyUserId : false}) }}/>
                            <TouchableOpacity style={{aspectRatio : 1 , borderColor : '#CCC' , borderWidth : 2, backgroundColor : '#303030' , borderRadius : 10}}
                            onPress={() => { this.onVerifyUserId() }} >
                                <Icon style={{ flex : 1 , textAlign : 'center' , textAlignVertical : 'center' , color : '#EEE'}} name={'search'} size={16} solid />
                            </TouchableOpacity>
                        </View>
                        
                        {!this.state.verifyUserId &&
                        <View style={styles.tableErrorRow}>
                            <Text style={styles.errorText}>
                                <Icon style={styles.errorIcon} name={'check'} size={18} solid />
                                아이디 확인이 필요합니다.
                            </Text>
                        </View>
                        }

                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitleText}>비밀번호</Text>
                            <TextInput style={styles.tableRowInput}
                            onBlur={() => {this.onVerifyUserPw()}}
                            secureTextEntry={true}
                            ref={ref => { this.userPw = ref }} 
                            onChangeText={(text) => { this.setState({ userPw : text}) }} />
                        </View>
                        {!this.state.verifyUserPw &&
                        <View style={styles.tableErrorRow}>
                            
                            <Text style={styles.errorText}>
                            <Icon style={styles.errorIcon} name={'check'} size={18} solid />
                                영어, 숫자, 특수문자 조합 8자리 이상
                            </Text>
                        </View>
                        }   


                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitleText}>비밀번호 확인</Text>
                            <TextInput style={styles.tableRowInput} 
                            onBlur={() => {this.onVerifyUserPwConfirm()}}
                            secureTextEntry={true}
                            ref={ref => { this.userPwConfirm = ref }} 
                            onChangeText={(text) => { this.setState({ userPwConfirm : text}) }} />
                        </View>
                        
                        {!this.state.verifyUserPwConfirm &&
                        <View style={styles.tableErrorRow}>
                            <Text style={styles.errorText}>
                            <Icon style={styles.errorIcon} name={'check'} size={18} solid />
                                비밀번호가 다릅니다.
                            </Text>
                        </View>
                        }


                        
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitleText}>닉네임</Text>
                            <TextInput style={styles.tableRowInput} 
                            onBlur={() => {this.onVerifyUserNickName()}}
                            ref={ref => { this.userNickName = ref }} 
                            onChangeText={(text) => { this.setState({ userNickName : text}) }} />
                        </View>
                        {!this.state.verifyUserNickName &&
                        <View style={styles.tableErrorRow}>
                            <Text style={styles.errorText}>
                            <Icon style={styles.errorIcon} name={'check'} size={18} solid />
                                사용 불가능한 닉네임입니다.
                            </Text>
                        </View>
                        }

                            <TouchableOpacity style={styles.button} onPress={() => { this.onPressSubmit() }}>
                                <Text style={styles.buttonTextColor}>확인</Text>
                            </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#303030',
    },

    table : {
        width : '80%',
        backgroundColor : '#EEE',
        borderColor : '#CCC',
        borderWidth : 5,
        borderRadius : 10,
        padding : 10,
    },

    tableRow : {
        borderWidth : 4,
        flexDirection :'row',
        marginBottom : 5,
        marginTop : 5,
        borderRadius : 5,
        borderColor : '#303030',
    },

    tableErrorRow : {
        marginBottom : 5,
    },

    tableRowTitleText : {
        width : 100,
        textAlign : 'center',
        textAlignVertical : 'center',
        fontFamily : 'jua',
        fontSize : 16,
        borderRightWidth : 4,
        borderColor : '#303030',
    },

    tableRowInput : {
        flex : 1,
        paddingHorizontal : 5,
    },

    errorText : {
        fontFamily : 'jua',
    },

    errorIcon : {
        color : '#FF5533',
    },

    button : {
        height : 50,
        borderWidth : 4,
        borderColor : '#AAA',
        backgroundColor : '#303030',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
    },

    buttonTextColor : {
        color : '#EEE',
        fontSize : 16,
        fontFamily : 'jua',       
    },


})

export default connect(
    (state) => ({
        signupLoading : state.auth.signupLoading,
        signup : state.auth.signup,

        verifyId : state.auth.verifyId,
        verifyIdLoading : state.auth.verifyIdLoading,
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(AuthActions , dispatch)
    })
)(ModalSignup);