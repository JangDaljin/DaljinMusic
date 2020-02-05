import React , { Component } from 'react'
import { View, Text , StyleSheet, Image , Dimensions , ToastAndroid } from 'react-native'
import { commonStyles } from './commonStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodaysLiveActions from '../../Reducers/todaysLive'
const win = Dimensions.get('window')

class TodaysLive extends Component {

    componentDidMount() {
        ToastAndroid.show('component Did Mount' , ToastAndroid.SHORT)
        this.props.TodaysLiveActions.fetchTodaysLive()
    }

    state = {
        imageWidth : 0,
        imageHeight : 0,
    }

    getImageSize = (e) => {
        const containerWidth = e.nativeEvent.layout.width

        Image.getSize('https://facebook.github.io/react-native/img/tiny_logo.png' , (width , height) => {

            const ratio = height / width
            let imageWidth = 0
            let imageHeight = 0

            if(win.width < win.height) {
                imageWidth = containerWidth 
                imageHeight = containerWidth * ratio
            }

            else {
                let pre_Height = win.height

                imageWidth = pre_Height
                imageHeight = pre_Height * ratio
            }

            this.setState({
                imageWidth : imageWidth,
                imageHeight : imageHeight,
            })
        })
    }

    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>
                    #오늘의 라이브
                </Text>
                <View style={styles.contentsContainer}>
                    <View style={styles.imageWrap} onLayout={this.getImageSize}>
                        <Image style={[styles.image , {width : this.state.imageWidth , height : this.state.imageHeight}]} source={{uri : 'https://facebook.github.io/react-native/img/tiny_logo.png'}} />
                    </View>
                    <View style={styles.infoWrap}>
                        <View style={styles.infoTextWrap}>  
                            <Text style={styles.infoFixedText}>가수</Text>
                            <Text style={styles.infoInFixedText}>zxcv</Text>
                        </View>

                        <View style={styles.infoTextWrap}>
                            <Text style={styles.infoFixedText}>제목</Text>
                            <Text style={styles.infoInFixedText}>qwer</Text>
                        </View>

                        <View style={styles.infoTextWrap}>
                            <Text style={styles.infoFixedText}>앨범</Text>
                            <Text style={styles.infoInFixedText}>asdf</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentsContainer : {
        flex : 1,
        
        borderWidth : 2,
        borderRadius : 10,
        overflow : 'hidden',
        paddingBottom : 3,
        
    },

    imageWrap : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    infoWrap : {
        width : '100%',
        flexDirection : 'row',
        borderTopWidth : 2,
        paddingTop : 5,
        paddingLeft : 5,
        paddingRight : 5,
    },

    infoTextWrap : {
        flex : 1,
        flexDirection : 'row',
    },

    infoFixedText : {
        fontFamily : 'jua',
        borderWidth : 2,
        textAlign : 'center',
        textAlignVertical : 'center',
        width : 30,
        borderRadius : 5,
    },
    infoInFixedText : {
        flex : 1,
        fontFamily : 'jua',
        paddingLeft : 5,
        paddingRight : 5,
        textAlignVertical : 'center',
    }
    
})



export default connect(
    (state) => ({
        todaysLiveMusic : state.todaysLive.music,
    }),
    (dispatch) => ({
        TodaysLiveActions : bindActionCreators(TodaysLiveActions , dispatch),
    })
)(TodaysLive)