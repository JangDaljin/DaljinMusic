import React, { Component } from 'react'

import { View , Text, StyleSheet , ScrollView, Image, TouchableOpacity } from 'react-native'
import { List } from 'immutable';


class MyMusicsView extends Component {


    render () {
        return(
            <ScrollView style={styles.container}>
                {
                    this.props.myMusicList.get('list').map(
                        (value , index) => (
                            <TouchableOpacity key={index} style={styles.content}>
                                <View style={styles.imageWrap}>
                                    <Image style={styles.image} source={{uri : value.getIn(['album' , 'albumImgUri'])}} />
                                </View>
                                <View style={styles.infoWrap}>
                                    <Text style={styles.info}>
                                        {value.getIn(['singer' , 'name'])}
                                    </Text>
                                    <Text style={styles.info}>
                                        {value.getIn(['song'])}
                                    </Text>
                                    <Text style={styles.info}>
                                        {value.getIn(['album' , 'name'])}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    )
                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    container : {
        flex : 1,
        padding : 5,
    },

    content : {
        flex : 1,
        flexDirection : 'row',
        marginBottom : 8,
        borderRadius : 5,
        borderWidth : 2,
        overflow : 'hidden',
    },

    imageWrap : {
        flex : 1,
    },

    infoWrap : {
        flex : 4,
        paddingLeft : 5,
    },

    image : {
        width : '100%',
        height : undefined,
        aspectRatio : 1,
    },

    info : {
        flex : 1,
        textAlignVertical : 'center', 
    }, 


})

export default MyMusicsView;