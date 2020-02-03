import React , { Component } from 'react'
import { ScrollView , View , Text , StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Map , List } from 'immutable'

import SearchContentView from './SearchContentView'

export default class SearchView extends Component {

    state = {

        text : {
            a : List(['a' , 'b' ,'c']).splice()
        },

        foundSong : List([
            Map({
                song : 'a',
                singer : {
                    name : 'a',
                },
                album : {
                    name : 'a',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
            Map({
                song : 'aa',
                singer : {
                    name : 'aa',
                },
                album : {
                    name : 'aa',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
            Map({
                song : 'aaa',
                singer : {
                    name : 'aaa',
                },
                album : {
                    name : 'aaa',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
        ]),
        foundSinger : List([
            Map({
                song : 'b',
                singer : {
                    name : 'b',
                },
                album : {
                    name : 'b',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
            Map({
                song : 'bb',
                singer : {
                    name : 'bb',
                },
                album : {
                    name : 'bbb',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
            Map({
                song : 'bbb',
                singer : {
                    name : 'bbb',
                },
                album : {
                    name : 'bbb',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
        ]),
        foundAlbum : List([
            Map({
                song : 'c',
                singer : {
                    name : 'c',
                },
                album : {
                    name : 'c',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
            Map({
                song : 'cc',
                singer : {
                    name : 'cc',
                },
                album : {
                    name : 'cc',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
            Map({
                song : 'ccc',
                singer : {
                    name : 'ccc',
                },
                album : {
                    name : 'ccc',
                    albumImgUri : 'https://facebook.github.io/react-native/img/tiny_logo.png'
                }
            }),
        ]),
        show : 'total'
    }

    onPressShowButton = (viewName) => {
        this.setState({show : viewName})
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <TextInput style={styles.searchText} />
                    <TouchableOpacity style={styles.searchButton}>
                        <Icon style={styles.searchButtonIcon} name={'search'} size={18} solid />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchMode}>
                    <TouchableOpacity style={[styles.searchModeButton , {borderLeftWidth : 1} , this.state.show === 'total' ? styles.selectedBackground : null]} onPress={() => { this.onPressShowButton('total') }}>
                        <Text style={[styles.searchModeButtonText , this.state.show === 'total' ? styles.selectedTextColor : null]}>통합검색</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.searchModeButton , this.state.show === 'song' ? styles.selectedBackground : null]} onPress={() => { this.onPressShowButton('song') }}>
                        <Text style={[styles.searchModeButtonText , this.state.show === 'song' ? styles.selectedTextColor : null]}>제목</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.searchModeButton , this.state.show === 'singer' ? styles.selectedBackground : null]} onPress={() => { this.onPressShowButton('singer') }}>
                        <Text style={[styles.searchModeButtonText , this.state.show === 'singer' ? styles.selectedTextColor : null]}>가수</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.searchModeButton , this.state.show === 'album' ? styles.selectedBackground : null]} onPress={() => { this.onPressShowButton('album') }}>
                        <Text style={[styles.searchModeButtonText , this.state.show === 'album' ? styles.selectedTextColor : null]}>앨범</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding : 5,}}>
                    <SearchContentView show={this.state.show} foundSong={this.state.foundSong} foundSinger={this.state.foundSinger} foundAlbum={this.state.foundAlbum}/>
                </ScrollView>
            </View>

        )
    }
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    search : {
        backgroundColor : '#303030',
        flexDirection : 'row',
        padding : 5,
        height : 40,
        
    },

    searchText : {
        flex : 1,
        backgroundColor : '#EEE',
        borderRadius : 10,
        paddingHorizontal : 5,
        
    },

    searchButton : {
        height : '100%',
        aspectRatio : 1,
        backgroundColor : '#EEE',
        marginLeft : 5,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,

    },

    searchButtonIcon : {
        color : '#303030',
    },

    searchMode : {
        height : 40,
        backgroundColor : '#303030',
        flexDirection : 'row',
    },

    searchModeButton : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderLeftWidth : 0,
        borderColor : '#555',
    },

    searchModeButtonText : {
        color : '#EEE',
    },

    selectedBackground : {
        backgroundColor : '#EEE',
    },

    selectedTextColor : {
        color : '#069',
    },
    
})