import React, { Component } from 'react'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Top100View from './Top100View'

import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome5'
import { List , Map} from 'immutable'


const propsList = List([
    Map({
        mode : 'total',
        title : '전체',
        icon : 'tree',
    }),
    Map({
        mode : 'month',
        title : '월간',
        icon : 'star',
    }),
    Map({
        mode : 'week',
        title : '주간',
        icon : 'moon',
    }),
    Map({
        mode : 'day',
        title : '일일',
        icon : 'sun',
    }),
])
const Drawer = createDrawerNavigator({
    ...propsList.reduce((acc , data , index) => {
        return acc.set(data.get('mode') , {
            screen : (props) => <Top100View {...props} title={data.get('title')} mode={data.get('mode')} />,
            navigationOptions : {
                title : data.get('title'),
                drawerIcon : ({tintColor}) => (
                    <FontAweSomeIcon style={{color : tintColor}} size={18} name={data.get('icon')} solid />
                )
            }
        })
    } , Map()).toJS()
}, { ...require('../commonOptions').LeftDrawerOptions })

/*
const Drawer = createDrawerNavigator({
    'total' : {
        screen : (props) => <Top100View {...props} title={'전체'} mode={'total'} />,

        navigationOptions : {
            title : '전체',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'tree'} solid />
            )
        }
    },
    'month' : {
        screen : (props) => <Top100View {...props} title={'월간'} />,

        navigationOptions : {
            title : '월간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'star'} solid />
            )
        }
    },
    'week' : {
        screen : (props) => <Top100View {...props} title={'주간'}/>,
        navigationOptions : {
            title : '주간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'moon'} solid />
            )
        }
    },
    'day' : {
        screen : (props) => <Top100View {...props} title={'일일'}/>,
        navigationOptions : {
            title : '일일',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'sun'} solid />
            )
        }
    },
}, { ...require('../commonOptions').LeftDrawerOptions })
*/


export default createAppContainer(Drawer)
