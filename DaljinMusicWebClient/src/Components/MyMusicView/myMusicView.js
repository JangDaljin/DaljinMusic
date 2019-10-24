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
            mode : 0,
            modeParam : null
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

    doChangeModal = (_mode , _modeParam = null) => {
        console.dir(_modeParam)
        this.doToggleModal()
        this.setState({ mode : _mode , modeParam : _modeParam})
    }

    doCheck = (item) => {
        this.props.MyMusicActions.toggleChecked(item)
    }

    render () {
        return (
            <div className={cn('mymusic')}>

                <div className={cn('mymusic-left')}>
                    <MyMusicViewListNames list={this.props.myMusicLists.map((value) => ({ listName : value.listName , _id : value._id , selected : value.selected}))} onChangeModal={this.doChangeModal} />
                </div>

                <div className={cn('mymusic-center')}>
                    {
                        this.props.myMusicLists.length > 0 ?
                        <MyMusicViewList musicListName={ this.props.myMusicLists[this.props.curSelectList].listName }
                                         musicList={ this.props.myMusicLists[this.props.curSelectList].list } onCheck={this.doCheck} />
                                         :
                        <MyMusicViewList musicListName={ '' }
                                         musicList={ [] } onCheck={this.doCheck} />
                    }
                </div>

                <div className={cn('mymusic-right')}>
                    <MyMusicViewButtons onChangeModal={this.doChangeModal} />
                </div>

                <div className={cn('mymusic-modal' , {'mymusic-modal-hidden' : !this.state.modalShow})}>
                    <Modal mode={this.state.mode} modeParam={this.state.modeParam} onToggleModal={this.doToggleModal} />
                </div>

            </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists.slice(0, state.myMusic.myMusicLists.length),
        curSelectList : state.myMusic.curSelectList,
        userId : state.auth.userId
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(withRouter(MyMusicViewBody))