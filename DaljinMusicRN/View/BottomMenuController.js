import React , { Component } from 'react'
import { View, Text, StyleSheet , TouchableOpacity , Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class BottomMenuController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomControllerAnimationValue : new Animated.Value(0),
            bottomControllerAnimationPosition : -50,
            bottomControllerAnimationOpacity : 0,
        }
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps.show !== this.props.show) {
            //보이기
            if(this.props.show) {
                this.setState({ 
                    bottomControllerAnimationValue : new Animated.Value(0),
                    
                    bottomControllerAnimationPosition : this.state.bottomControllerAnimationValue.interpolate({
                        inputRange : [0 , 1],
                        outputRange : [-50 , 0]
                    }) ,

                    bottomControllerAnimationOpacity : this.state.bottomControllerAnimationValue.interpolate({
                        inputRange : [0 , 1],
                        outputRange : [0 , 1],
                    }) 
                })
            }

            //감추기
            else {
                this.setState({ 
                    bottomControllerAnimationValue : new Animated.Value(0),
    
                    bottomControllerAnimationPosition : this.state.bottomControllerAnimationValue.interpolate({
                        inputRange : [0 , 1],
                        outputRange : [0 , -50]
                    }) ,
                    
                    bottomControllerAnimationOpacity : this.state.bottomControllerAnimationValue.interpolate({
                        inputRange : [0 , 1],
                        outputRange : [1 , 0],
                    }) 
                })
            }

            Animated.timing(this.state.bottomControllerAnimationValue , {
                toValue : 1,
                duration : 500,
                delay : 0,
            }).start()
        }
    }

    render () {
        return (
            <Animated.View style={[styles.bottomController , 
                    {
                        opacity : this.state.bottomControllerAnimationOpacity ,
                        bottom : this.state.bottomControllerAnimationPosition ,
                        height : this.props.height,
                    }
                ]}>
                <TouchableOpacity style={styles.bottomControllerButton}>
                    <View style={styles.bottomControllerButtonBody}>
                        <Icon style={styles.bottomControllerButtonIcon} name={'play'} size={16} solid />
                        <Text style={styles.bottomControllerButtonFont}>재생</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomControllerButton}>
                    <View style={styles.bottomControllerButtonBody}>
                        <Icon style={styles.bottomControllerButtonIcon} name={'plus'} size={16} solid />
                        <Text style={styles.bottomControllerButtonFont}>추가</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomControllerButton}>
                    <View style={styles.bottomControllerButtonBody}>
                        <Icon style={styles.bottomControllerButtonIcon} name={'list'} size={16} solid />
                        <Text style={styles.bottomControllerButtonFont}>목록에 추가</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    bottomController : {
        position : 'absolute',
        bottom : 100,
        width : '100%',
        backgroundColor : '#303030',
        flex : 1,
        flexDirection : 'row',
    },

    bottomControllerButton : {
        flex : 1,
        borderWidth : 1,
        borderColor : '#EEE',
    },

    bottomControllerButtonBody : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    },

    bottomControllerButtonIcon : {
        color : '#EEE',
    },

    bottomControllerButtonFont : {
        color : '#EEE',
        marginLeft : 6 , 
        fontFamily : 'jua',
    },
})