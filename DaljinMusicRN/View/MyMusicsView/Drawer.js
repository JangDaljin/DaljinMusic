import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { List, Map } from 'immutable'
import MyMusicsView from './MyMusicsView'

const TestListNames = 
    new List([
        new Map({
            ListName : 'One',
        }),
        new Map({
            ListName : 'Two',
        }),
        new Map({
            ListName : 'Three'
        })
    ])




const Drawer = createDrawerNavigator({
    ...TestListNames.reduce((acc , data , index) => {
        return acc.set(data.get('ListName') , {
            screen : MyMusicsView,
            params : { 'ListName' : data.get('ListName')},
            navigationOptions : {
                title : `${data.get('ListName')}(${10})`,
            }
        })
    } , Map()).toJS()
} , require('../commonOptions').LeftDrawerOptions)


export default createAppContainer(Drawer)