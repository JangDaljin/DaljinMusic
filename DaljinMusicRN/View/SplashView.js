import React , { Component } from 'react'
import { View, StyleSheet , Image , Text , Dimensions} from 'react-native'

class SplashView extends Component {



    render () {
        return (

            <View style={styles.container}>

                <View style={styles.logoImageWrap}>
                    <Image style={styles.logoImage} source={require('../testImg/daljin_logo_horizon.png')} />
                </View>

                <View style={styles.messageWrap}>
                    <Text style={styles.message}>
                        {
                            this.props.message
                        }
                    </Text>
                </View>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#303030',
    },

    logoImageWrap : {
        flex : 9,
        alignItems : 'center',
        justifyContent : 'center',
    },

    logoImage : {
        width : 200,
        height : 50,
    },

    messageWrap : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    message : {
        color : '#EEE',
    }
})

export default SplashView