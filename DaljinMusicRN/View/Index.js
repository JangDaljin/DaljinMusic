import React, { Component } from 'react'

import { View , Text, StyleSheet, Platform, StatusBar } from 'react-native'

import BottomTabNavigator from './BottomTabNavigator'
import MusicPlayer from './MusicPlayerView/MusicPlayer'
import ModalSignin from './AuthView/ModalSignin'
import Modal from './Modal/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../Reducers/auth'
class Index extends Component {


    render () {
        return (
            <View style={styles.container}>
                <Modal />
                <ModalSignin />
                {!this.props.isLoading &&
                    <React.Fragment>
                        <BottomTabNavigator />
                        <MusicPlayer />
                    </React.Fragment>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        ...Platform.select({
            ios : {
                paddingTop : 20
            },
            android : {
                paddingTop : StatusBar.currentHeight
            }
        })
    }
})

export default connect(
    (state) => ({
        isLoading : state.auth.isLoading,
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(AuthActions , dispatch)
    })
)(Index);