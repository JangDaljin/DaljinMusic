import React , { Component } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text , TouchableOpacity , StyleSheet , Modal , ScrollView, TextInput, Alert} from 'react-native'

export default class CustomDrawerComponent extends Component {


    state = {
        focusedScreenIndex : 0,
        
        showAddListModal : false,
        showListNameChangeModal : false,
    }


    //===========================모달 버튼===============================//
    //*******************************************************************/
    //추가 버튼 작동
    onPressAddListButton = () => {
        this.setState({ showAddListModal : true })
    }

    onReturnKeyPressAddList = (e) => {
        //e.nativeEvent.text
    }
    //*******************************************************************/

    //*******************************************************************/
    //삭제 버튼 작동
    onPressDeleteButton = () => {
        Alert.alert(
            '삭제',
            '정말 삭제하시겠습니까?',
            [
                {text : '아니오' , style : 'cancel'},
                {text : '네' , onPress : () => {  }},
            ],
            {
                cancelable : true,
            }
        )
    }
    //*******************************************************************/

    //*******************************************************************/
    //이름변경 버튼 작동
    onPressListNameChangeButton = () => {
        this.setState({ showListNameChangeModal : true })
    }

    onReturnKeyPressChangeListName = (e) => {
        //e.nativeEvent.text
    }
    //*******************************************************************/
    //==========================모달 버튼 끝=============================//

    onPressModalClose = () => {
        this.setState({ 
            showAddListModal : false,
            showListNameChangeModal : false ,
        })
    }


    onPressMenu = (index , listName) => {
        this.setState({focusedScreenIndex : index})
        this.props.navigation.navigate(listName)
    }




    render () {
        return (
            <View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => { this.onPressAddListButton() }}>
                        <Icon style={styles.buttonIcon} size={18} name={'plus'} solid />
                        <Text style={styles.buttonText}>추가</Text>

                        <Modal transparent={true} animationType='fade' visible={this.state.showAddListModal}>
                            <View style={modalStyles.outterModalcontainer}>
                                <View style={modalStyles.innerModalContainer}>
                                    <View style={modalStyles.modalHeader}>
                                        <Text style={modalStyles.modalHeaderTitle}>새 리스트 추가</Text>
                                        <TouchableOpacity style={modalStyles.modalHeaderButton} onPress={() => { this.onPressModalClose()}}>
                                            <Text style={modalStyles.modalHeaderButtonTextColor}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput style={{backgroundColor : '#303030' , paddingHorizontal : 5, color : '#EEE'}} autoFocus={true} 
                                    placeholder='새 리스트 이름' 
                                    onSubmitEditing={this.onReturnKeyPressAddList} 
                                    returnKeyType='done'
                                    />
                                </View>
                            </View>
                        </Modal>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {this.onPressDeleteButton()}}>
                        <Icon style={styles.buttonIcon} size={18} name={'trash'} solid />
                        <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { this.onPressListNameChangeButton() }}>
                        <Icon style={styles.buttonIcon} size={18} name={'pencil-alt'} solid />
                        <Text style={styles.buttonText}>이름변경</Text>

                        <Modal transparent={true} animationType='fade' visible={this.state.showListNameChangeModal}>
                            <View style={modalStyles.outterModalcontainer}>
                                <View style={modalStyles.innerModalContainer}>
                                    <View style={modalStyles.modalHeader}>
                                        <Text style={modalStyles.modalHeaderTitle}>이름변경</Text>
                                        <TouchableOpacity style={modalStyles.modalHeaderButton} onPress={() => { this.onPressModalClose()}}>
                                            <Text style={modalStyles.modalHeaderButtonTextColor}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput style={{backgroundColor : '#303030' , color : '#EEE' , paddingHorizontal : 5,}} autoFocus={true} 
                                    placeholder={this.props.list.getIn([this.state.focusedScreenIndex , 'listName'])} 
                                    onSubmitEditing={this.onReturnKeyPressChangeListName} 
                                    returnKeyType='done'
                                    />
                                </View>
                            </View>
                        </Modal>

                    </TouchableOpacity>
                </View>
                
                <View style={styles.listContainer}>
                {
                    this.props.list.map(
                        (value , index) => (
                            <TouchableOpacity key={index} style={[styles.menus , this.state.focusedScreenIndex === index ? styles.focusBackground : null]} onPress={()=>{ this.onPressMenu(index , value.get('listName')) }}>
                                <Text style={[styles.menusText , this.state.focusedScreenIndex === index ? styles.focusText : null]}>{value.get('listName')}({value.get('list').size})</Text>
                            </TouchableOpacity>
                        )
                    )
                }
                </View>
            </View>
        )
    }

}
    
const modalStyles = StyleSheet.create({
    outterModalcontainer : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    innerModalContainer : {backgroundColor : '#EEE' , width : '80%' , padding : 5},
    modalHeader : {flexDirection : 'row' , marginBottom : 2},
    modalHeaderTitle : {color : '#303030' , flex : 1 },
    modalHeaderButton : {backgroundColor : '#303030' , alignItems : 'center' , justifyContent : 'center' , width : 20 , aspectRatio : 1},
    modalHeaderButtonTextColor : { color : '#EEE'}


})

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    buttonsContainer : {
        height : 40,
        flexDirection : 'row',
    },

    button : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : '#EEE',
    },

    buttonIcon : {
        color : '#EEE',
    },

    buttonText : {
        marginLeft : 4,
        color : '#EEE',
    },

    listContainer : {
        
    },

    menus : {
        height : 50,
        justifyContent : 'center',
        paddingHorizontal : 10,
        alignItems : 'center',
        borderBottomWidth : 1,
        borderColor : '#EEE',
        marginBottom : 1,

    },

    menusText : {
        color : '#EEE',
    },

    focusBackground : {
        backgroundColor : '#EEE',
    },

    focusText : {
        color : '#303030',
    }
})