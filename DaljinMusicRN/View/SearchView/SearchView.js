import React , { Component } from 'react'
import { ScrollView , View , Text , StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'




export default class SearchView extends Component {


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
                    <TouchableOpacity style={[styles.searchModeButton , {borderLeftWidth : 1}]}>
                        <Text style={styles.searchModeButtonText}>통합검색</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchModeButton}>
                        <Text style={styles.searchModeButtonText}>제목</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchModeButton }>
                        <Text style={styles.searchModeButtonText}>가수</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchModeButton}>
                        <Text style={styles.searchModeButtonText}>앨범</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <Text>SearchView</Text>
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
    
})