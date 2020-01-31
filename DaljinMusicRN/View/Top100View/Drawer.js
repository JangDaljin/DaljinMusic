import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { List , Map } from 'immutable'
import Top100View from './Top100View'

import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome5'


const testList = List([
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'aa',
        singer : {
            name : 'aa',
        },
        album : {
            name : 'aa',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'aaa',
        singer : {
            name : 'aaa',
        },
        album : {
            name : 'aaaaaaaaaasdfasdfaaaaaaaaaSa',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
    Map({
        song : 'a',
        singer : {
            name : 'a',
        },
        album : {
            name : 'a',
            albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
        }
    }),
])

const Drawer = createDrawerNavigator({
    'month' : {
        screen : (props) => <Top100View {...props} list={testList} title={'월간'} />,
        navigationOptions : {
            title : '월간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'star'} solid />
            )
        }
    },
    'week' : {
        screen : (props) => <Top100View {...props} list={testList} title={'주간'}/>,
        navigationOptions : {
            title : '주간',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'moon'} solid />
            )
        }
    },
    'day' : {
        screen : (props) => <Top100View {...props} list={testList} title={'일일'}/>,
        navigationOptions : {
            title : '일일',
            drawerIcon : ({tintColor}) => (
                <FontAweSomeIcon style={{color : tintColor}} size={18} name={'sun'} solid />
            )
        }
    },
}, { ...require('../commonOptions').LeftDrawerOptions })


export default createAppContainer(Drawer)