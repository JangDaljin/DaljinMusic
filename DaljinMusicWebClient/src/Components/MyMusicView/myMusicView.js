import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
        this.state = {
            modalShow : false,
            mode : 0
        }
    }

    componentDidMount() {
        if(this.props.userId === '' || this.props.userId === 'undefined') {
            window.alert('로그인을 먼저 해주세요')
            this.props.history.push('/auth')
        }
        else {
            this.props.MyMusicActions.fetchMyMusic({userId : this.props.userId})
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
                    <MyMusicViewListNames listNames={this.props.myMusicLists.map((value) => (value.listName))} />
                </div>

                <div className={cn('mymusic-center')}>
                    <MyMusicViewList musicList={ this.props.myMusicLists[this.props.curSelectList] } onCheck={this.doCheck} />
                </div>

                <div className={cn('mymusic-right')}>
                    <MyMusicViewButtons onChangeModal={this.doChangeModal} />
                </div>

                <div className={cn('mymusic-modal' , {'mymusic-modal-hidden' : !this.state.modalShow})}>
                    <Modal mode={this.state.mode} onToggleModal={this.doToggleModal}/>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists.slice(0 , state.myMusic.myMusicLists.length),
        curSelectList : state.myMusic.curSelectList,
        userId : state.auth.userId
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(withRouter(MyMusicViewBody))