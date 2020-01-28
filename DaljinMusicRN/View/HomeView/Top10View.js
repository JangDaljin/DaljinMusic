import React , { Component } from 'react'

import { commonStyles } from './commonStyles'
import { Map , List } from 'immutable'
import { View , Text , StyleSheet , TouchableOpacity , TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

class Top10View extends Component {

    onPressContent = (index) => {
        this.setState({testData : this.state.testData.updateIn([index , 'checked'] , value => !value)})
    }

    state = {
        testData : List([
            Map({
                song : 'a',
                singer : 'a',
                album : 'a',
                checked : false,    
            }),
            Map({
                song : 'b',
                singer : 'b',
                album : 'b',
                checked : true,
            }),
            Map({
                song : 'c',
                singer : 'c',
                album : 'c',
                checked : false,
            }),
        ])
    }
    
    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>#TOP 10</Text>


                <View style={styles.contentsWrap}>
                    {
                        this.state.testData.map(
                            (value , index) => (
                                <TouchableOpacity key={index} onPress={() => this.onPressContent(index) }>
                                    <View style={[styles.content , value.get('checked')? styles.checkedBackground : null]}>
                                        <Text style={[styles.rank , value.get('checked')? styles.checkedFontColor : null]}>
                                            {index+1}
                                        </Text>
                                        
                                        <Text style={[styles.song, value.get('checked')? styles.checkedFontColor : null]}>
                                            {value.get('song')}
                                        </Text>
                                        <Text style={[styles.singer , value.get('checked')? styles.checkedFontColor : null]}>
                                            {value.get('singer')}
                                        </Text>
                                        <Text style={[styles.album , value.get('checked')? styles.checkedFontColor : null]}>
                                            {value.get('album')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        )
                    }
                </View>
                <View style={styles.controller}>
                    <TouchableHighlight style={styles.controllerButton}>
                        <View style={styles.controllerButtonBody}>
                            <Icon name={'list'} size={16} solid />
                            <Text style={{marginLeft : 4 , fontFamily : 'jua' }}>재생</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={[styles.controllerButton , { marginLeft : 2 , marginRight : 2 }]}>
                        <View style={styles.controllerButtonBody}>
                            <Icon name={'plus'} size={16} solid />
                            <Text style={{marginLeft : 4 , fontFamily : 'jua' }}>재생</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.controllerButton}>
                        <View style={styles.controllerButtonBody}>
                            <Icon name={'play'} size={16} solid />
                            <Text style={{marginLeft : 4 , fontFamily : 'jua' }}>재생</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentsWrap : {
        flex : 1,
    },
    content : {
        flex : 1,
        flexDirection : 'row',
        marginBottom : 2,
        paddingTop : 4,
        paddingBottom : 4,
        borderWidth : 2,
    },
    rank : {
        width : 30,
        textAlign : 'center',
    },
    song : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },
    singer : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },
    album : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },

    checkedBackground : {
        backgroundColor : '#303030',
    },
    checkedFontColor : {
        color : '#EEE',
    },

    controller : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        flexWrap : 'wrap',
    },

    controllerButton : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 4,
        borderWidth : 2,
        borderRadius : 5,
    },

    controllerButtonBody : {
        flexDirection : 'row',
        alignItems : 'center',
    },




})

export default Top10View