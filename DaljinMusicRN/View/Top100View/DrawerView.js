import React, { Component } from 'react'

//import { createAppContainer } from 'react-navigation'
//import { createDrawerNavigator } from 'react-navigation-drawer'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Top100View from './Top100View'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { List , Map} from 'immutable'
import { ToastAndroid, View , Text } from 'react-native'



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

const Drawer = createDrawerNavigator()


class DrawerView extends Component {
    
    render () {
        return (
            <Drawer.Navigator 
            drawerStyle={{
                backgroundColor : '#303030'
            }}
            drawerContentOptions={{
                activeTintColor : '#069',
                activeBackgroundColor : '#EEE',
                inactiveTintColor : '#EEE',
                labelStyle : { fontFamily : 'jua' , fontSize : 20 }
            }}
            >
                {
                    propsList.map(
                        (value , index) => (
                            <Drawer.Screen
                            key={index}
                            name={value.get('mode')} 
                            component={Top100View} 
                            options={{ 
                                title : value.get('title'), 
                                drawerIcon : ({focused , color , size}) => (
                                    <Icon style={{ color : color }} size={size} name={value.get('icon')} solid />
                                ),
                            }} 
                            />
                        )
                    )
                }
            </Drawer.Navigator>
        )
    }
}

export default DrawerView


/*
const Drawer = createDrawerNavigator({
    ...propsList.reduce((acc , data , index) => {
        return acc.set(data.get('mode') , {
            screen : (props) => <Top100View {...props} title={data.get('title')} mode={data.get('mode')} />,
            navigationOptions : {
                title : data.get('title'),
                drawerIcon : ({tintColor}) => (
                    <FontAweSomeIcon style={{color : tintColor}} size={18} name={data.get('icon')} solid />
                ),
            }
        })
    } , Map()).toJS()
}, { ...require('../commonOptions').LeftDrawerOptions })


export default createAppContainer(Drawer)
*/
