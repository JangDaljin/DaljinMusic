import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import styles from './playList.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)


class PlayList extends Component {

    componentDidUpdate(prevProps , prevState) {
        if(prevProps.authMonitor && !this.props.authMonitor) {
            if(this.props.isAuthenticated) {
                this.props.MusicPlayerActions.fetchGetPlayList({'userId' : this.props.userId})
            }
            else {
                this.props.MusicPlayerActions.clearPlayList()   
            }
        }
    }

    render () {
        return (
            <div className={cn('playinglist' , { 'playinglist-show' : this.props.show } , { 'playinglist-notshow' : !this.props.show })}>

                <div className="menu">
                    <div className="button-wrap" onClick={ e => { this.props.MusicPlayerActions.changeChecked() } }>
                        <i className="far fa-check-square"></i><span> 전체선택</span>   
                    </div>
                    <div className="button-wrap" onClick={ 
                        e => { 
                            this.props.MusicPlayerActions.fetchPlayListItemRemove(
                                {
                                    'userId' : this.props.userId ,
                                    'removeList' : this.props.playList.filter(value => value.get('checked')).toJS().map((value , index) => index)}) 
                        }}>
                        <i className="fas fa-trash"></i><span> 선택삭제</span>   
                    </div>
                </div>

                    <div className="list">
                    {
                        this.props.playList.map(
                            (value , index) => (        
                                <div className='list-item' key={index}>
                                    {value.get('checked') ?
                                        <span className="far fa-check-circle checkbox" onClick={(e) => this.props.MusicPlayerActions.changeChecked(index) }></span>
                                        :
                                        <span className="far fa-circle checkbox" onClick={(e) => this.props.MusicPlayerActions.changeChecked(index) }></span>
                                    }
                                    

                                    <span className="list-item-name" onClick={
                                        (e) => {
                                            this.props.MusicPlayerActions.fetchPlayMusic({'_id' : this.props.playList.getIn([index , '_id'])});
                                        }
                                    }>{`${value.getIn(['singer' , 'name'])} - ${value.get('song')} - ${value.getIn(['album' , 'name'])}`}</span>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        authMonitor : state.auth.monitor,
        isAuthenticated : state.auth.isAuthenticated,
        playList : state.musicPlayer.playList
    }),
    (dispatch) => ({
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch)
    })
)(PlayList)