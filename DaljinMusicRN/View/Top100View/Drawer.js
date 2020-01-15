import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Top100View from './Top100View'

import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome5'

const Drawer = createDrawerNavigator({
    'month' : {
        screen : Top100View,
        params : { show : 'month'},
        navigationOptions : {
            title : '월간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'star'} solid />
            )
        }
    },
    'week' : {
        screen : Top100View,
        params : { show : 'week'},
        navigationOptions : {
            title : '주간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'moon'} solid />
            )
        }
    },
    'day' : {
        screen : Top100View,
        params : { show : 'day' },
        navigationOptions : {
            title : '일간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'sun'} solid />
            )
        }
    },
}, require('../commonOptions').LeftDrawerOptions)


export default createAppContainer(Drawer)