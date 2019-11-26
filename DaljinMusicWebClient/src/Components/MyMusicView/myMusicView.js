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

    componentDidUpdate(prevProps , prevState) {
        console.log('didupdate')
        if(prevProps.authMonitor && !this.props.authMonitor) {
            this.initState()
        }
    }

    componentDidMount () {
        if(!this.props.authMonitor) {
            this.initState()
        }
    }

    initState = () => {
        if(this.props.isAuthenticated) {
            this.props.MyMusicActions.fetchGetMyMusicLists({userId : this.props.userId})
        }
        else {
            this.props.history.push('/auth')
        }
    }


    doToggleModal = () => {
        this.setState({ modalShow : !this.state.modalShow})
    }

    doChangeModal = (_mode , _modeParam = null) => {
        this.doToggleModal()
        this.setState({ mode : _mode , modeParam : _modeParam})
    }

    doCheck = (item) => {
        this.props.MyMusicActions.toggleChecked(item)
    }

    render () {
        return (
            <div className={cn('mymusic')}>
                    {this.props.isAuthenticated &&
                        <React.Fragment>
                            <div className={cn('mymusic-left')}>
                                <MyMusicViewListNames onChangeModal={this.doChangeModal} />
                            </div>

                            <div className={cn('mymusic-center')}>
                                {
                                    this.props.myMusicLists.size > 0 && this.props.currentSelectedListIndex !== -1 &&
                                    <MyMusicViewList onCheck={this.doCheck} />
                                }
                            </div>

                            <div className={cn('mymusic-right')}>
                                <MyMusicViewButtons onChangeModal={this.doChangeModal} />
                            </div>

                            <div className={cn('mymusic-modal-wrap' , {'mymusic-modal-wrap-hidden' : !this.state.modalShow})}>
                                <Modal mode={this.state.mode} modeParam={this.state.modeParam} onToggleModal={this.doToggleModal} />
                            </div>
                        </React.Fragment>
                    }
            </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists,
        currentSelectedListIndex : state.myMusic.currentSelectedListIndex,
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        authMonitor : state.auth.monitor,
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(withRouter(MyMusicViewBody))