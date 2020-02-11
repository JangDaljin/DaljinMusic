import React, { Component } from 'react'

//import { createAppContainer } from 'react-navigation'
//import { createBottomTabNavigator } from 'react-navigation-tabs'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import HomeView from './HomeView/HomeView'
import MyMusicsView from './MyMusicsView/DrawerView'
import Top100View from './Top100View/DrawerView'
import SearchView from './SearchView/SearchView'
import SettingView from './SettingView/SettingView'
import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator()

const ScreenMap = new Map([
    ['Home' , {
        screen : HomeView ,
        icon : 
        { 
            name : 'home' , type : 'solid'
        }
    }],
    ['Top100' , {
        screen : Top100View ,
        icon : 
        { 
            name : 'trophy', type : 'solid'
        }
    }],
    ['MyMusics' , {
        screen : MyMusicsView ,
        icon : 
        { 
            name : 'folder-open' , type : 'solid'
        }
    }],
    ['Search' , {
        screen : SearchView ,
        icon : 
        { 
            name : 'search' , type : 'solid'
        }
    }],
    ['Setting' , {
        screen : SettingView ,
        icon : 
        { 
            name : 'cog' , type : 'solid'
        }
    }],
    ['TestScreen' , {
        screen : TestScreen,
        icon :
        {
            name : 'cog' , type : 'solid',
        }
    }]

])

function TestScreen ()  {
    return (
        <View style={{flex : 1}}>
            <Text>testscreen</Text>
        </View>
    )
}

class BottomTabNavigator extends Component {

    render () {
        return (
            <NavigationContainer>
                <Tab.Navigator 
                screenOptions={({route}) => ({
                    tabBarIcon : ({focused , color , size}) => {
                        const iconSize = 20
                        let iconStyle = { color : focused ? '#069' : '#EEE' } 
                        return <Icon style={iconStyle} size={iconSize} name={ScreenMap.get(route.name).icon.name} {...ScreenMap.get(route.name).icon.type} />
                    },
                })}
                tabBarOptions={{
                    activeTintColor : '#069',
                    activeBackgroundColor : '#EEE',
                    inactiveTintColor : '#EEE',
                    showLabel : false,
                    style : {
                        backgroundColor : "#303030",
                    },
                }}>
                    <Tab.Screen name='Home' component={ScreenMap.get('Home').screen} />
                    <Tab.Screen name='Top100' component={ScreenMap.get('Top100').screen} />
                    <Tab.Screen name='MyMusics' component={ScreenMap.get('MyMusics').screen} />
                    <Tab.Screen name='Search' component={ScreenMap.get('Search').screen} />
                    <Tab.Screen name='Setting' component={ScreenMap.get('Setting').screen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }

}

export default BottomTabNavigator