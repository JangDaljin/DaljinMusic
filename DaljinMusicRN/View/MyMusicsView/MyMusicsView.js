import React, { Component } from 'react'

import { View , Text, StyleSheet , ScrollView, Image, TouchableOpacity } from 'react-native'
import { List } from 'immutable'

import BottomMenuController from '../BottomMenuController'
class MyMusicsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedList : List(new Array(props.myMusicList.get('list').size).fill(false)),
            checkCounter : 0,
            bottomMenuShow : false,
        }
    }


    onPressContent = (index) => {
        let checkCounter = this.state.checkCounter
        let bottomMenuShow = this.state.bottomMenuShow

        if(this.state.checkedList.get(index)) {
            checkCounter--
        }
        else {
            checkCounter++
        }

        if(checkCounter === 0) {
            bottomMenuShow = false    
        }
        else {
            bottomMenuShow = true
        }


        this.setState({
            checkedList : this.state.checkedList.update(index , value => !value),
            checkCounter : checkCounter,
            bottomMenuShow : bottomMenuShow,
        })
    }


    render () {
        return(
            <View style={{flex : 1}}>
                <View style={{height : 50 , backgroundColor : '#303030'}}>
                    <Text>
                        
                    </Text>
                    <View>

                    </View>
                </View>
                
                <ScrollView style={styles.scroll}>

                    <View style={styles.container}>
                    {
                        this.props.myMusicList.get('list').map(
                            (value , index) => (
                                    <TouchableOpacity key={index} style={[styles.content , this.state.checkedList.get(index) ? styles.checkedContent : null]} onPress={() => { this.onPressContent(index) }}>
                                        <View style={styles.imageWrap}>
                                            <Image style={styles.image} source={{uri : value.getIn(['album' , 'albumImgUri'])}} />
                                        </View>
                                        <View style={styles.infoWrap}>
                                            <Text style={styles.info} numberOfLines={2}>
                                                {value.getIn(['singer' , 'name'])}-
                                                {value.getIn(['song'])}-
                                                {value.getIn(['album' , 'name'])}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                            )
                        )
                    }
                    </View>

                    <View style={{height : 50}}>

                    </View>

                </ScrollView>

                <BottomMenuController height={50} show={this.state.bottomMenuShow} />
            </View>
        )
    }
}


const styles = StyleSheet.create({

    scroll : {
        flex : 1,
        padding : 5,
    },

    container : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'flex-start',
    },

    content : {
        width : 125,
        padding : 5,
        margin : 4,
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    checkedContent : {
        borderWidth : 4,
        borderStyle : 'solid',
        borderColor : '#0AC',
        borderRadius : 8,
    },

    checkedItem : {
        borderWidth : 4,
        borderColor : '#069',
    },

    imageWrap : {
        width : '70%',
    },

    image : {
        width : '100%',
        height : undefined,
        aspectRatio : 1,
    },

    infoWrap : {
        flex : 1,
        alignSelf : 'center',
    }

})

export default MyMusicsView;