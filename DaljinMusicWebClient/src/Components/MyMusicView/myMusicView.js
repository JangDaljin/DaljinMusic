import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicAction from '../../ReduxModules/myMusic'

import MyMusicViewListNames from './ListNames/listNames'
import MyMusicViewButtons from './Buttons/buttons'
import MyMusicViewList from './MyMusicViewList/myMusicViewList'

import classNames from 'classnames/bind'
import styles from './myMusicView.css'
import Modal from './Modal/modal'
const cn = classNames.bind(styles)

class MyMusicViewBody extends Component {

    constructor(props) {
        super(props)
        props.MyMusicActions.fetchMyMusic({userId : this.props.userId})
        this.state = {
            modalShow : false,
            mode : 0
        }
    }

    doToggleModal = () => {
        this.setState({ modalShow : !this.state.modalShow})
    }

    doChangeModal = (_mode) => {
        this.doToggleModal()
        this.setState({ mode : _mode})
    }

    doCheck = (item) => {
        this.props.MyMusicActions.toggleChecked(item)
    }

    render () {
        return (
            <div className={cn('mymusic')}>

                <div className={cn('mymusic-left')}>
                    <MyMusicViewListNames listNames={this.props.myMusicList.map((value) => (value.listName))} />
                </div>

                <div className={cn('mymusic-center')}>
                    <MyMusicViewList musicList={ this.props.myMusicList[this.props.curSelectList] } onCheck={this.doCheck} />
                </div>

                <div className={cn('mymusic-right')}>
                    <MyMusicViewButtons onToggleModal={this.doToggleModal} onChangeModal={this.doChangeModal} />
                </div>

                <div className={cn('mymusic-modal' , {'mymusic-modal-hidden' : !this.state.modalShow})}>
                    <Modal mode={this.state.mode} />
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicList : state.myMusic.myMusicList.slice(0 , state.myMusic.myMusicList.length),
        curSelectList : state.myMusic.curSelectList,
        id : state.auth.userId
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(MyMusicViewBody)