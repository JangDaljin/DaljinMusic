import React , { Component } from 'react'
import { View , Text, StyleSheet, Image} from 'react-native'

import { commonStyles } from './commonStyles'
import { url } from '../commonFunctions'

class SuggestMusicsView extends Component {




    render () {
        return (
            <View style={commonStyles.container}>

                <Text style={commonStyles.title}>
                    #추천음악
                </Text>


                <View style={styles.contentsWrap}>
                    {
                        this.props.musics.map(
                            (value , index) => (
                                <View key={value} style={styles.content}>
                                    <View style={styles.imageWrap}>
                                        <Image style={styles.image} source={{ uri : url(value.getIn(['album' , 'albumImgUri']))}} />
                                    </View>
                                    <View style={styles.infoWrap}>
                                        <Text style={styles.info}>{value.getIn(['singer' , 'name'])}</Text>
                                        <Text style={styles.info}>{value.getIn(['song'])}</Text>
                                        <Text style={styles.info}>{value.getIn(['album' , 'name'])}</Text>
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
    },
    content : {
        flex : 1,
        flexDirection : 'row',
        borderWidth : 2,
        marginBottom : 5,
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
        paddingLeft : 5,
        paddingRight : 5,
        fontFamily : 'jua',
        textAlignVertical: 'center',
    }
})


export default SuggestMusicsView