import React, { Component , useCallback} from 'react'

import { useFocusEffect } from '@react-navigation/native'
import { createDrawerNavigator , DrawerContentScrollView ,  DrawerItem , DrawerItemList} from '@react-navigation/drawer'

import { List, Map } from 'immutable'
import MyMusicsView from './MyMusicsView'
import CustomDrawerComponent from './CustomDrawerComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MyMusicsActions from '../../Reducers/myMusics'
import LoadingView from '../LoadingView'
import { View, Text , ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Drawer = createDrawerNavigator()

function DataUpdater({onUpdate}) {
    useFocusEffect(
        useCallback(() => {
            onUpdate()
            
        return (() => {})
        } , [])
    )
    return null
}

class DrawerView extends Component {

    onUpdate = () => {
        this.props.MyMusicsActions.fetchGetMyMusicLists({userId : this.props.userId})
    }

    render () {
        return (
            <React.Fragment>
            <DataUpdater onUpdate={this.onUpdate} />
            {this.props.isLoading ?
                <LoadingView />
                :
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
                drawerContent={props => (
                    <DrawerContentScrollView {...props}>
                        <CustomDrawerComponent list={this.props.myMusicLists} {...props} />
                    </DrawerContentScrollView>
                )}
                >
                    {
                        this.props.myMusicLists.map(
                            (value , index) => (
                                <Drawer.Screen
                                key={value}
                                name={value.get('listName')}
                                component={MyMusicsView} />
                            )
                        )
                    }
                    <Drawer.Screen
                    name={"Nothing"}
                    component={NothingScreen} />
                </Drawer.Navigator>
            }
            </React.Fragment>
        )
    }
}

function NothingScreen ({navigation}) {
    return (
        <View style={{flex : 1 , alignItems : 'center' , justifyContent : 'center'}}>
            <Icon style={{ color : '#AAA' , marginBottom : 10}} name={'exclamation-triangle'} size={40} solid />
            <Text style={{ color : '#AAA' , fontFamily : 'jua' , fontSize : 22}}>리스트가 없습니다.</Text>
            <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
                <Text>메뉴창 열기</Text>
            </TouchableOpacity>
        </View>
    )
}

/*
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
*/


export default connect(
    (state) => ({
        isLoading : state.myMusics.isLoading,
        myMusicLists : state.myMusics.myMusicLists,
        userId : state.auth.userId,
    }),
    (dispatch) => ({
        MyMusicsActions : bindActionCreators(MyMusicsActions , dispatch)
    })
)(DrawerView)