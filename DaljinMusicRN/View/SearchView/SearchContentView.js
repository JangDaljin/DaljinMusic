import React , { Component } from 'react'
import { View , Text , StyleSheet , Image, TouchableOpacity, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { url } from '../commonFunctions'


export default class SearchContentView extends Component {

    totalContent = (text , foundItem , checkedList , onPress , onChangeShow) => (
        foundItem.size > 0 &&
        <View style={{marginBottom : 10}}>
            <View style={styles.totalTitleWrap}>
                <View style={[styles.totalTitleLineLeft , styles.totalTitleLine]}></View>
                <Text style={styles.totalTitleText}>
                    {text}
                </Text>
                <View style={[styles.totalTitleLineRight , styles.totalTitleLine]}></View>
            </View>
            {
                this.listContent(foundItem.splice(3 , foundItem.size) , checkedList , onPress)
            }
            {foundItem.size > 3 &&
                <TouchableOpacity style={{alignItems : 'center' , justifyContent : 'center', backgroundColor : '#303030' , height : 30 , flexDirection : 'row'}} onPress={() => { onChangeShow() }}>
                    <Icon style={{color : '#EEE'}} name={'caret-down'} size={22} solid />
                    <Text style={{color : '#EEE' , paddingLeft : 5}}>더보기</Text>
                </TouchableOpacity>
            }
        </View>
    )

    listContent = (foundItem , checkedList , onPress) => (
        <View style={styles.contentsContainer}>
            {
                foundItem.map(
                    (value , index) => (
                        <TouchableOpacity key={index} style={[styles.contentWrap , checkedList.get(index) ? styles.checkedBackground : null]} onPress={() => { onPress(index) }}>
                            <View style={styles.imageWrap}>
                                <Image style={styles.image} source={{ uri : url(value.getIn(['album' , 'albumImgUri']))}} />
                            </View>
                            <View style={styles.infoWrap}>
                                <Text style={[styles.infoText , checkedList.get(index) ? styles.checkedTextColor : null]}>{value.getIn(['song'])}</Text>
                                <Text style={[styles.infoText , checkedList.get(index) ? styles.checkedTextColor : null]}>{value.getIn(['singer' , 'name'])}</Text>
                                <Text style={[styles.infoText , checkedList.get(index) ? styles.checkedTextColor : null]}>{value.getIn(['album' , 'name'])}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                )
            }
        </View>
    )

    NothingContent = () => (
        <View style={{flex : 1 , alignItems : 'center' , justifyContent : 'center'}}>
            <Icon style={{color : '#AAA'}} name={'eye-slash'} size={28} solid />
            <Text style={{color : '#AAA' , fontFamily : 'jua' , fontSize : 20}}>검색 결과 없음</Text>
        </View>
    )

    BottomPadding = (height) => (
        <View style={{height : 50}}>
        </View>
    )
    
    render () {
        return (
            new Map([
                ['total' , (
                    <ScrollView key={1} style={styles.contentsContainer}>
                        {this.totalContent('제목 검색 결과' , this.props.foundSong , this.props.checkedFoundSong , this.props.onCheckedFoundSong , () => {this.props.onChangeShow('song')} )}
                        {this.totalContent('가수 검색 결과' , this.props.foundSinger , this.props.checkedFoundSinger , this.props.onCheckedFoundSinger , () => {this.props.onChangeShow('singer')} )}
                        {this.totalContent('앨범 검색 결과' , this.props.foundAlbum , this.props.checkedFoundAlbum , this.props.onCheckedFoundAlbum , () => {this.props.onChangeShow('album')} )}
                        <this.BottomPadding />
                    </ScrollView>
                )],
                ['song' , (
                    this.props.foundSong.size === 0 ?
                    <this.NothingContent />
                    :
                    <ScrollView key={1} style={styles.contentsContainer}>
                        {
                            this.listContent(this.props.foundSong , this.props.checkedFoundSong , this.props.onCheckedFoundSong)
                        }
                        <this.BottomPadding />
                    </ScrollView>
                )],
                ['singer' , (
                    this.props.foundSinger.size === 0 ?
                    <this.NothingContent />
                    :
                    <ScrollView key={1} style={styles.contentsContainer}>
                        {
                            this.listContent(this.props.foundSinger , this.props.checkedFoundSinger , this.props.onCheckedFoundSinger)
                        }
                        <this.BottomPadding />
                    </ScrollView>
                )],
                ['album' , (
                    this.props.foundAlbum.size === 0 ?
                    <this.NothingContent />
                    :
                    <ScrollView key={1} style={styles.contentsContainer}>
                        {
                            this.listContent(this.props.foundAlbum , this.props.checkedFoundAlbum , this.props.onCheckedFoundAlbum)
                        }
                        <this.BottomPadding />
                    </ScrollView>
                )]
            ]).get(this.props.show)
        )
    }
}

const styles = StyleSheet.create({
    contentsContainer : {
        flex : 1,
        padding : 5,
    },

    totalTitleWrap : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 5,
    },
    totalTitleText : {
        color : '#303030',
        paddingHorizontal : 5,
        fontSize : 16,
        fontWeight : 'bold',
    },
    totalTitleLineLeft : {
        flex : 1,
    },
    totalTitleLineRight : {
        flex : 9,
    },
    totalTitleLine : {
        borderBottomWidth : 3,
        borderColor : '#AAA',
        height : 0,
    },

    contentWrap : {
        flex : 1,
        flexDirection : 'row',
        marginBottom : 5,
        borderWidth : 2,
        borderColor : 'transparent'
    },


    imageWrap : {
        flex : 2,    
    },

    image : {
        width : '100%',
        aspectRatio : 1,
    },

    infoWrap : {
        flex : 8,
        paddingHorizontal : 5,
    },

    infoText : {
        flex : 1,
        textAlignVertical : 'center',
    },

    HighLightText : {
        fontWeight : '600',
        color : '#069',
    },

    checkedBackground : {
        backgroundColor : '#CCC',
        borderColor : '#AAA'
    },
    
    checkedTextColor : {
        color : '#303030',
    }
})