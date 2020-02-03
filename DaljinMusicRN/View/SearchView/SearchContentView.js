import React , { Component } from 'react'
import { View , Text , StyleSheet , Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { List } from 'immutable'



export default class SearchContentView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            checkedFoundSinger : List(new Array(props.foundSinger.size).fill(false)),
            checkedFoundSong : List(new Array(props.foundSong.size).fill(false)),
            checkedFoundAlbum : List(new Array(props.foundAlbum.size).fill(false)),
        }
    }

    totalContent = (text , foundItem , onPress) => (
        <View style={{marginBottom : 10}}>
            <View style={styles.totalTitleWrap}>
                <View style={[styles.totalTitleLineLeft , styles.totalTitleLine]}></View>
                <Text style={styles.totalTitleText}>
                    {text}
                </Text>
                <View style={[styles.totalTitleLineRight , styles.totalTitleLine]}></View>
            </View>
            {
                this.listContent(foundItem.splice(5 , foundItem.size) , onPress)
            }
            <TouchableOpacity style={{alignItems : 'center' , justifyContent : 'center', backgroundColor : '#303030' , height : 30 , flexDirection : 'row'}}>
                <Icon style={{color : '#EEE'}} name={'caret-down'} size={22} solid />
                <Text style={{color : '#EEE' , paddingLeft : 5}}>더보기</Text>
            </TouchableOpacity>
        </View>
    )

    listContent = (foundItem , onPress) => (
        <View>
            {
                foundItem.map(
                    (value , index) => (
                        <TouchableOpacity key={index} style={styles.contentWrap} onPress={() => { onPress(index) }}>
                            <View style={styles.imageWrap}>
                                <Image style={styles.image} source={{ uri : value.getIn(['album' , 'albumImgUri'])}} />
                            </View>
                            <View style={styles.infoWrap}>
                                <Text style={styles.infoText}>{value.getIn(['song'])}</Text>
                                <Text style={styles.infoText}>{value.getIn(['singer' , 'name'])}</Text>
                                <Text style={styles.infoText}>{value.getIn(['album' , 'name'])}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                )
            }
        </View>
    )


    render () {
        return (
            new Map([
                ['total' , (
                    <View>
                        {this.totalContent('제목별' , this.props.foundSong , index => { this.setState({checkedFoundSong : this.state.checkedFoundSong.update(index , value => !value)})})}
                        {this.totalContent('가수별' , this.props.foundSinger ,index => { this.setState({checkedFoundSinger : this.state.checkedFoundSinger.update(index , value => !value)})})}
                        {this.totalContent('앨범별' , this.props.foundAlbum , index => { this.setState({checkedFoundAlbum : this.state.checkedFoundAlbum.update(index , value => !value)})})}
                    </View>
                )],
                ['song' , (
                    <View>
                        {
                            this.listContent(this.props.foundSong)
                        }
                    </View>
                )],
                ['singer' , (
                    <View>
                        {
                            this.listContent(this.props.foundSinger)
                        }
                    </View>
                )],
                ['album' , (
                    <View>
                        {
                            this.listContent(this.props.foundAlbum)
                        }
                    </View>
                )]
            ]).get(this.props.show)
        )
    }
}

const styles = StyleSheet.create({
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
})