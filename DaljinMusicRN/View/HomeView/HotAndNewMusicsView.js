import React , { Component } from 'react'
import { StyleSheet , View , Text, Image } from 'react-native'


import { commonStyles } from './commonStyles'
import { url } from '../commonFunctions'


class HotAndNewMusicsView extends Component {

    render () {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>#
                    <Text style={styles.hotTextColor}>HOT</Text>
                    &nbsp;
                    <Text style={styles.bothTextColor}>AND</Text>
                    &nbsp;
                    <Text style={styles.newTextColor}>NEW</Text>
                </Text>

                <View style={styles.contentsWrap}>
                    {
                        this.props.musics.map(
                            (value , index) => (
                                <View key={index} style={styles.content}>
                                    <View style={styles.imageWrap}>
                                        <Image style={styles.image} source={{ uri : url(value.getIn(['music', 'album' , 'albumImgUri']))}} />
                                    </View>
                                    <View style={styles.infoWrap}>
                                        <Text style={styles.info}>
                                            {value.getIn(['music' , 'singer' , 'name'])}
                                        </Text>
                                        <Text style={styles.info}>
                                            {value.getIn(['music' , 'song'])}
                                        </Text>
                                        <Text style={styles.info}>
                                            {value.getIn(['music' , 'album' , 'name'])}
                                        </Text>
                                    </View>
                                    <View style={styles.hotAndNewWrap}>
                                        {value.get('hot') &&
                                            <Text style={[styles.hotTextColor , styles.hotAndNew]}>HOT</Text>
                                        }
                                        {value.get('new') &&
                                            <Text style={[styles.newTextColor , styles.hotAndNew]}>NEW</Text>
                                        }
                                    </View>
                                </View>
                            )
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentsWrap : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
    },
    content : {
        flexDirection : 'row',
        width : '100%',
        borderWidth : 2,
        margin : 2,
        borderRadius : 10,
        overflow : 'hidden',
    },
    imageWrap : {
        flex : 1,
    },
    image : {
        width : '100%',
        height : undefined,
        aspectRatio : 1,
    },
    infoWrap : {
        flex : 4,
    },
    info : {
        flex : 1,
        textAlignVertical : 'center',
        paddingLeft : 5,
        fontFamily : 'jua',
    },

    hotAndNewWrap : {
        alignItems : 'center',
        justifyContent : 'center',
        paddingHorizontal : 5,
        width : 50,
        borderLeftWidth : 2,
    },

    hotAndNew : {
        fontSize : 18,
        fontFamily : 'jua',
    },

    hotTextColor : {
        color : '#FF5A5A'
    },

    newTextColor : {
        color : '#069'
    },

    bothTextColor : {
        color : '#9887B9'
    }
})


export default HotAndNewMusicsView