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
        if(prevProps.idCheckTrying !== this.props.idCheckTrying) {
            this.initState();
        }
    }

    componentDidMount() {
        this.initState();
    }

    initState = () => {
        //세션확인이 완료되면
        if(!this.props.idCheckTrying) {
            //로그인 되어있으면 음악리스트 요청
            if(this.props.isAuthenticated) {
                this.props.MyMusicActions.fetchGetMyMusicLists({userId : this.props.userId})
            }
            //로그인 안되어있으면 로그인 창으로 이동
            else {
                this.props.history.push('/auth')
            }
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
                                <MyMusicViewListNames list={this.props.myMusicLists.map((value) => ({ listName : value.listName , _id : value._id , selected : value.selected}))} onChangeModal={this.doChangeModal} />
                            </div>

                            <div className={cn('mymusic-center')}>
                                {
                                    this.props.myMusicLists.length > 0 && this.props.curSelectList !== -1 &&
                                    <MyMusicViewList musicListName={ this.props.myMusicLists[this.props.curSelectList].listName }
                                                    musicList={ this.props.myMusicLists[this.props.curSelectList].list } onCheck={this.doCheck} />
                                }
                            </div>

                            <div className={cn('mymusic-right')}>
                                <MyMusicViewButtons onChangeModal={this.doChangeModal} />
                            </div>

                            <div className={cn('mymusic-modal' , {'mymusic-modal-hidden' : !this.state.modalShow})}>
                                <Modal mode={this.state.mode} modeParam={this.state.modeParam} listNames={this.props.myMusicLists.map((value) => ({ listName : value.listName , _id : value._id , selected : value.selected}))} onToggleModal={this.doToggleModal} />
                            </div>
                        </React.Fragment>
                    }
            </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists.toJS(),
        curSelectList : state.myMusic.curSelectList,
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        idCheckTrying : state.auth.idCheckTrying,
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(withRouter(MyMusicViewBody))