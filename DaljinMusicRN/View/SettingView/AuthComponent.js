import React , { Component } from 'react'
import { View , Text , TouchableOpacity , StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../../Reducers/auth'
import Icon from 'react-native-vector-icons/FontAwesome5'

class AuthComponent extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Icon style={[styles.userIcon ,  { color : this.props.isAuthenticated ? '#00ff00' : '#cd3c3c' }]} name={'user'} size={18} solid />
                <Text style={styles.plainText}>
                    {this.props.isAuthenticated ?
                        `${this.props.userName}님 환영합니다.`
                        :
                        '로그인이 필요합니다.'
                    }
                </Text>
                
                {this.props.isAuthenticated?
                    <TouchableOpacity style={styles.authButton} onPress={ () => { this.props.AuthActions.fetchLogout() }}>
                        <Icon style={styles.authButtonIcon} name={'lock-open'} size={20} solid />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.authButton} onPress={() => { this.props.AuthActions.showModal() }}>
                        <Icon style={styles.authButtonIcon} name={'lock'} size={20} solid />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container : {
        height : 50,
        padding : 5,
        backgroundColor : '#303030',
        flex : 1,
        flexDirection :'row',
    },

    userIcon : {
        height : '100%',
        aspectRatio : 1,
        
        
        textAlign : 'center',
        textAlignVertical : 'center',
    },

    plainText : {
        fontSize : 16,
        fontFamily : 'jua',
        color : '#EEE',
        textAlignVertical : 'center',
        flex : 1,
    },

    authButton : {
        borderWidth : 2,
        borderColor : '#AAA',
        borderRadius : 10,
    },

    authButtonIcon : {
        color : '#EEE',
        height : '100%',
        aspectRatio : 1,
        textAlignVertical : 'center',
        textAlign : 'center',
    },


})

export default connect(
    (state) => ({
        modalShow : state.auth.modalShow,
        isAuthenticated : state.auth.isAuthenticated,
        userName : state.auth.userName,
        userId : state.auth.userId,
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(AuthActions , dispatch)
    })
)(AuthComponent)