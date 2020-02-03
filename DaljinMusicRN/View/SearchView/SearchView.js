import React , { Component } from 'react'
import { ScrollView , View , Text , StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Map , List } from 'immutable'

import SearchContentView from './SearchContentView'
import BottomMenuController from '../BottomMenuController'

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
        checkedFoundSong : List(new Array(3).fill(false)),
        checkedFoundSongCounter : 0,
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
        checkedFoundSinger : List(new Array(3).fill(false)),
        checkedFoundSingerCounter : 0,
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
        checkedFoundAlbum : List(new Array(3).fill(false)),
        checkedFoundAlbumCounter : 0,

        show : 'total',
        bottomMenuControllerShow : true,
    }

    componentDidUpdate(prevProps , prevState) {
        if( prevState.show !== this.state.show ||
            prevState.checkedFoundSongCounter !== this.state.checkedFoundSongCounter ||
            prevState.checkedFoundSingerCounter !== this.state.checkedFoundSingerCounter ||
            prevState.checkedFoundAlbumCounter !== this.state.checkedFoundAlbumCounter) {

                let bottomMenuControllerShow = false
                if(this.state.show === 'total' && 
                (
                    this.state.checkedFoundSongCounter > 0 ||
                    this.state.checkedFoundSingerCounter > 0 ||
                    this.state.checkedFoundAlbumCounter > 0
                )) 
                {
                    bottomMenuControllerShow = true
                }
                else if(this.state.show === 'song' && this.state.checkedFoundSongCounter > 0) {
                    bottomMenuControllerShow = true
                }
                else if(this.state.show === 'singer' && this.state.checkedFoundSingerCounter > 0) {
                    bottomMenuControllerShow = true
                }
                else if(this.state.show === 'album' && this.state.checkedFoundAlbumCounter > 0) {
                    bottomMenuControllerShow = true
                }
                else {
                    bottomMenuControllerShow = false
                }
                this.setState({bottomMenuControllerShow : bottomMenuControllerShow})

        }
    }

    onPressShowButton = (viewName) => {
        this.setState({show : viewName})
    }

    bottomMenuControllerButtons = ({}) => (
        <View style={{flex : 1, flexDirection : 'row'}}>
            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'play'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>재생</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'plus'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>재생목록에 추가</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={bottomMenuControllerStyles.bottomControllerButton}>
                <View style={bottomMenuControllerStyles.bottomControllerButtonBody}>
                    <Icon style={bottomMenuControllerStyles.bottomControllerButtonIcon} name={'list'} size={16} solid />
                    <Text style={bottomMenuControllerStyles.bottomControllerButtonFont}>내음악에 추가</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    onCheckedItem = (index , checkedList , checkedCounter) => {
        this.setState({[checkedList] : checkedList.update(index , value => !value) , [checkedCounter] : checkedCounter++})
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
                        <Text style={[styles.searchModeButtonText , this.state.show === 'song' ? styles.selectedTextColor : null]}>제목({this.state.foundSong.size})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.searchModeButton , this.state.show === 'singer' ? styles.selectedBackground : null]} onPress={() => { this.onPressShowButton('singer') }}>
                        <Text style={[styles.searchModeButtonText , this.state.show === 'singer' ? styles.selectedTextColor : null]}>가수({this.state.foundSinger.size})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.searchModeButton , this.state.show === 'album' ? styles.selectedBackground : null]} onPress={() => { this.onPressShowButton('album') }}>
                        <Text style={[styles.searchModeButtonText , this.state.show === 'album' ? styles.selectedTextColor : null]}>앨범({this.state.foundAlbum.size})</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding : 5,}}>
                    <SearchContentView 
                    show={this.state.show} 
                    onChangeShow={pageName => { this.setState({show : pageName}) }}

                    foundSong={this.state.foundSong}
                    checkedFoundSong={this.state.checkedFoundSong}
                    onCheckedFoundSong={index => {
                        const check = this.state.checkedFoundSong.get(index)
                        let count = this.state.checkedFoundSongCounter
                        check ? count-- : count++
                        this.setState({
                            checkedFoundSong : this.state.checkedFoundSong.set(index , !check),
                            checkedFoundSongCounter : count
                        })
                    }}

                    foundSinger={this.state.foundSinger}
                    checkedFoundSinger={this.state.checkedFoundSinger}
                    onCheckedFoundSinger={index => {
                        const check = this.state.checkedFoundSinger.get(index)
                        let count = this.state.checkedFoundSingerCounter
                        check ? count++ : count--
                        this.setState({
                            checkedFoundSinger : this.state.checkedFoundSinger.set(index , !check),
                            checkedFoundSingerCounter : count
                        })
                    }}


                    foundAlbum={this.state.foundAlbum}
                    checkedFoundAlbum={this.state.checkedFoundAlbum}
                    onCheckedFoundAlbum={index => {
                        const check = this.state.checkedFoundAlbum.get(index)
                        let count = this.state.checkedFoundAlbumCounter
                        check ? count-- : count++
                        this.setState({
                            checkedFoundAlbum : this.state.checkedFoundAlbum.set(index , !check),
                            checkedFoundAlbumCounter : count
                        })
                    }}

                    />

                    <View style={{height : 50}}>
                    </View>
                </ScrollView>

                <BottomMenuController height={50} show={this.state.bottomMenuControllerShow} buttons={this.bottomMenuControllerButtons} />
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

const bottomMenuControllerStyles = {
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
}