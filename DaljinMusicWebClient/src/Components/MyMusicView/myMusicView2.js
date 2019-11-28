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
            <React.Fragment>
            <div className={cn('mymusicview-left')}>
                <div className={cn('mymusicview-list-buttons')}>
                    <div><i className="fas fa-plus"></i></div>
                    <div><i className="fas fa-minus"></i></div>
                    <div><i className="fas fa-cog"></i></div>
                </div>

                {
                    this.props.myMusicLists.map(
                        (value , index) => (
                            <div className={cn('mymusicview-listname')} key={index}>
                                {value.get('listName')}
                            </div>
                        )
                    )
                }
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
            <div className={cn('mymusicview-center')}>
                {this.props.currentSelectedListIndex < this.props.myMusicLists.size && this.props.currentSelectedListIndex > -1 ?
                    <React.Fragment>
                    <div className={cn('selected-musiclist-name')}><p><i className="fas fa-stream"></i> { this.props.myMusicLists.getIn([this.props.currentSelectedListIndex , 'listName']) } </p></div>
                    {
                    this.props.myMusicLists.getIn([this.props.currentSelectedListIndex , 'list']).map(
                        (value , index) => (
                            <div key={index}>
                                {value.get('song')}
                            </div>
                        )
                    )
                    }
                    </React.Fragment>
                    :
                    <div className={cn('mymusic-musiclist-no-item')}>
                    <p><i className="fas fa-exclamation-circle fa-2x"></i></p>
                    <p> 자료가 존재하지 않습니다.</p>
                    </div>
                }
            </div>

            
            </React.Fragment>
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