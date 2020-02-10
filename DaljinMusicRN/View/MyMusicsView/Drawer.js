import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { List, Map } from 'immutable'
import MyMusicsView from './MyMusicsView'
import CustomDrawerComponent from './CustomDrawerComponent'

const testList = 
    List([
        Map({
            listName : 'One',
            list : List([
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
        }),
        Map({
            listName : 'Two',
            list : List([
                Map({
                    song : 'b',
                    singer : {
                        name : 'b',
                    },
                    album : {
                        name : 'b',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    }
                }),
                Map({
                    song : 'bb',
                    singer : {
                        name : 'bb',
                    },
                    album : {
                        name : 'bbb',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    }
                }),
                Map({
                    song : 'bbb',
                    singer : {
                        name : 'bbb',
                    },
                    album : {
                        name : 'bbb',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    }
                }),
            ])
        }),
        Map({
            listName : 'Three',
            list : List([
                Map({
                    song : 'c',
                    singer : {
                        name : 'c',
                    },
                    album : {
                        name : 'c',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    }
                }),
                Map({
                    song : 'cc',
                    singer : {
                        name : 'cc',
                    },
                    album : {
                        name : 'cc',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    }
                }),
                Map({
                    song : 'ccc',
                    singer : {
                        name : 'ccc',
                    },
                    album : {
                        name : 'ccc',
                        albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                    }
                }),
            ])
        })
    ])

const Drawer = createDrawerNavigator({
    ...testList.reduce((acc , data , index) => {
        return acc.set(data.get('listName') , {
            screen : (props) => <MyMusicsView {...props} myMusicList={data} />,
            navigationOptions : {
                title : `${data.get('listName')}(${10})`,
                
            }
        })
    } , Map()).toJS()
} , {
    ...require('../commonOptions').LeftDrawerOptions,
    contentComponent : (props) => <CustomDrawerComponent {...props} list={testList}/>
})


export default createAppContainer(Drawer)