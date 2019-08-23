import React , { Component } from 'react'
import {
    View,
    Text,
    Button
}
from 'react-native'




export default class Test extends Component {

    constructor(props) {
        super(props)
        pressButton = this.pressButton.bind(this)
        this.state = {
            text : "Hello DaljinMusicApp"
        }
    }


    render() {
        return (
            <View>
                <Text>{this.state.text}</Text>
                <Button 
                title="PRESS ME"
                onPress={pressButton}/>
            </View>
        )
    }

    pressButton () {
        const r = parseInt(Math.random() * 10 - 1)
        this.setState({ text : ""+r})
    }
    
}