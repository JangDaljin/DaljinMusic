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
                <this.props.buttons />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    bottomController : {
        position : 'absolute',
        width : '100%',
        backgroundColor : '#303030',
        bottom : 0,
        flex : 1,
        flexDirection : 'row',
    },


})