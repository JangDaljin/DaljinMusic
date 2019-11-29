import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as myMusicAction from '../../ReduxModules/myMusic'

import classNames from 'classnames/bind'
import style from './myMusicView2.css'
const cn = classNames.bind(style)

class MyMusicView2 extends Component {

    componentDidUpdate(prevProps , prevState) {
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

    render() {
        return (
            <div className={cn('mymusicview')}>
            <div className={cn('mymusicview-left')}>
                <div className={cn('mymusicview-list-buttons')}>
                    <div><i className="fas fa-plus"></i></div>
                    <div><i className="fas fa-pencil-alt"></i></div>
                    <div><i className="fas fa-cog"></i></div>
                </div>

                {
                    this.props.myMusicLists.map(
                        (value , index) => (
                            <div className={cn('mymusicview-listname')} key={index} onClick={(e) => { this.props.MyMusicActions.selectList({selectedListIndex : index}) }}>
                                <div className={cn('listname-left')}>
                                    {value.get('listName')}
                                </div>
                                <div className={cn('listname-right')}>
                                    {this.props.myMusicLists.getIn([index , 'checked'])?
                                        <i className="far fa-check-circle" onClick={(e) => { this.props.MyMusicActions.checkList(index) }}></i>
                                        :
                                        <i className="far fa-circle" onClick={(e) => { this.props.MyMusicActions.checkList(index) }}></i>
                                    }
                                </div>
                            </div>
                        )
                    )
                }

                <div className={cn('left-navi')}>
                    <i className='fas fa-angle-right fa-2x'></i>
                </div>
            </div>

            <div className={cn('mymusicview-right')}>
                <div className={cn('right-buttons')}>
                    <p><i className={cn('fas fa-play')}></i>&nbsp;재생</p>
                </div> 

                <div className={cn('right-buttons')}>
                    <p><i className={cn('fas fa-eraser')}>&nbsp;</i>삭제</p>
                </div>

                <div className={cn('right-buttons')}>
                    <p><i className={cn('fas fa-stream')}></i>&nbsp;가져오기</p>
                </div> 

                <div className={cn('right-buttons')}>
                    <p><i className={cn('fas fa-cloud-download-alt')}></i>&nbsp;다운로드</p>
                </div>
            </div>
            
            <div className={cn('mymusicview-center')} ref={ref => this.center = ref}>
                <div className={cn('mymusicview-center-contents-wrap')}>
                    {this.props.currentSelectedListIndex < this.props.myMusicLists.size && this.props.currentSelectedListIndex > -1 ?
                        <React.Fragment>
                        <div className={cn('selected-musiclist-name')}><p><i className="fas fa-stream"></i> { this.props.myMusicLists.getIn([this.props.currentSelectedListIndex , 'listName']) } </p></div>
                        <div className={cn('selected-musiclist')}>
                        {
                            this.props.myMusicLists.getIn([this.props.currentSelectedListIndex , 'list']).map(
                                (value , index) => (
                                    <div key={index}>
                                        {value.get('song')}
                                    </div>
                                )
                            )
                        }
                        </div>
                        </React.Fragment>
                        :
                        <div className={cn('musiclist-no-item')}>
                        <p><i className="fas fa-exclamation-circle fa-2x"></i></p>
                        <p> 자료가 존재하지 않습니다.</p>
                        </div>
                    }
                </div>
               
            </div>
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
)(withRouter(MyMusicView2))