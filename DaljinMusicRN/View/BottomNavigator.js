import React, { Component } from 'react'

import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'


import Setting from './Setting'

import Icon from 'react-native-vector-icons/FontAwesome5'

import HomeView from './HomeView/HomeView'
import MyMusicsView from './MyMusicsView/Drawer'
import Top100View from './Top100View/Drawer'
import SearchView from './SearchView/SearchView'

const TabNavigator = createBottomTabNavigator(
    {
    'Home' : HomeView,
    'Top100' : Top100View,
    'MyMusics' : MyMusicsView,
    'Search' : SearchView,
    },
    {
        defaultNavigationOptions : ({ navigation }) => ({
            tabBarIcon : ({focused , horizontal , tintColor }) => {
                const { routeName } = navigation.state
                let IconComponent = Icon
                let iconName
                let iconType
                let iconSize = 20
                let iconStyle = {
                    color : '#EEE',
                }
                if(routeName === 'Home') {
                    iconName = 'home'
                    iconType = 'solid'    
                }
                else if(routeName === 'Top100') {
                    iconName = 'trophy'
                    iconType = 'solid'
                }
                else if(routeName === 'MyMusics') {
                    iconName = 'folder-open'
                    iconType = 'solid'
                }
                else if(routeName === 'Search') {
                    iconName = 'search'
                    iconType = 'solid'
                }
                if(focused) {
                    iconStyle.color = '#069'
                }
                return <IconComponent style={iconStyle} name={iconName} size={iconSize} {...iconType} />
            },
            tabBarOptions : {
                activeTintColor : '#069',
                activeBackgroundColor : '#EEE',
                inactiveTintColor : '#EEE',
                showLabel : false,
                style : {
                    backgroundColor : "#303030",
                },
                tabStyle : {

                }
            },
        })
    }
)

export default createAppContainer(TabNavigator);