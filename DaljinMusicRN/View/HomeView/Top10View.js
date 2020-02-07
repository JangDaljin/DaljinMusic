import React , { Component } from 'react'

import { commonStyles } from './commonStyles'
import { Map , List } from 'immutable'
import { View , Text , StyleSheet , TouchableOpacity , TouchableHighlight, ToastAndroid } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

class Top10View extends Component {

    state = {
        checkedMusics : List(new Array(10).fill(false))
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.musics !== this.props.musics) {
                this.setState({
                    checkedMusics : this.state.checkedMusics.map((value) => false)
                })
            }
        }
    }

    onPressContent = (index) => {
        this.setState({ checkedMusics : this.state.checkedMusics.update(index , value => !value) })
    }


    
    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>#TOP 10</Text>


                <View style={styles.contentsWrap}>
                    {
                        this.props.musics.map(
                            (value , index) => (
                                <TouchableOpacity key={index} style={[styles.content , this.state.checkedMusics.get(index)? styles.checkedBackground : null]} onPress={() => this.onPressContent(index) }>
                                    <Text style={[styles.rank , styles.contentTextStyle , {borderLeftWidth : 2 , borderRightWidth : 2}, this.state.checkedMusics.get(index)? styles.checkedFontColor : null]}>
                                        {index+1}
                                    </Text>
                                    
                                    <Text style={[styles.infoText, styles.contentTextStyle , this.state.checkedMusics.get(index)? styles.checkedFontColor : null]} numberOfLines={1} ellipsizeMode='tail'>
                                        {value.get('song')}
                                    </Text>
                                    <Text style={[styles.infoText , styles.contentTextStyle , this.state.checkedMusics.get(index) ? styles.checkedFontColor : null]} numberOfLines={1} ellipsizeMode='tail'>
                                        {value.getIn(['singer' , 'name'])}
                                    </Text>
                                    <Text style={[styles.infoText , styles.contentTextStyle , this.state.checkedMusics.get(index) ? styles.checkedFontColor : null]} numberOfLines={1} ellipsizeMode='tail'>
                                        {value.getIn(['album' , 'name'])}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )
                    }
                </View>
                <View style={styles.controller}>
                    <TouchableOpacity style={styles.controllerButton}>
                        <View style={styles.controllerButtonBody}>
                            
                        <Icon style={styles.controllerButtonTextColor} name={'play'} size={16} solid />
                            <Text style={[styles.controllerButtonTextColor , styles.controllerButtonText]}>재생</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.controllerButton , { marginLeft : 2 , marginRight : 2 }]}>
                        <View style={styles.controllerButtonBody}>
                            <Icon style={styles.controllerButtonTextColor} name={'plus'} size={16} solid />
                            <Text style={[styles.controllerButtonTextColor , styles.controllerButtonText]}>추가</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controllerButton}>
                        <View style={styles.controllerButtonBody}>
                            <Icon style={styles.controllerButtonTextColor} name={'list'} size={16} solid />
                            <Text style={[styles.controllerButtonTextColor , styles.controllerButtonText]}>내 리스트에 추가</Text>
                        </View>
                    </TouchableOpacity>
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
        marginBottom : 4,
    },
    rank : {
        width : 30,
        textAlign : 'center',
    },

    infoText : {
        flex : 1,
        paddingLeft : 3,
        paddingRight : 3,
    },

    contentTextStyle : {
        paddingTop : 4,
        paddingBottom : 4,
        fontSize : 12,
        textAlignVertical : 'center',
        borderWidth : 2,
        borderLeftWidth : 0,
        fontFamily : 'jua',
    },

    checkedBackground : {
        backgroundColor : '#303030',
    },

    checkedFontColor : {
        color : '#EEE',
        borderColor : '#AAA',
    },

    controller : {
        flex : 1,
        flexDirection : 'row',
    },

    controllerButton : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 4,
        borderWidth : 2,
        borderRadius : 5,
        backgroundColor : '#303030',
        borderColor : '#AAA',
    },

    controllerButtonBody : {
        flexDirection : 'row',
        alignItems : 'center',
    },

    controllerButtonText : {
        
        marginLeft : 4,
        marginRight : 4,
        fontFamily : 'jua',
    },

    controllerButtonTextColor : {
        color : '#EEE',
    },




})

export default Top10View