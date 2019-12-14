import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List } from 'immutable'
import * as Top100Actions from '../../../ReduxModules/top100'
import * as MyMusicActions from '../../../ReduxModules/myMusic'
import * as MusicPlayerActions from '../../../ReduxModules/musicPlayer'
import * as ModalActions from '../../../ReduxModules/modal'

import { withRouter } from 'react-router-dom'

import Loading from '../../LoadingView/loading'

import classNames from 'classnames/bind'
import styles from './TopTenMusic.css'
const cn = classNames.bind(styles)
const MAX_RANK = 10

class TopTenMusic extends Component {

    state = {
        selected : List(Array(MAX_RANK).fill(false)),
    }

    componentDidMount() {
        this.props.Top100Actions.fetchTop100({'from' : 1  , 'to' : 10 , 'init' : true})
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps.myMusicListsLoading && !this.props.myMusicListsLoading) {
            const body = []
            for(let i = 0 ; i < this.props.myMusicLists.size ; i++) {
                body.push(
                <div key={body.length} onClick={(e) => { 
                    const addMusicIds = []
                    for(let i = 0 ; i < MAX_RANK; i++) {
                        if(this.state.selected.get(i)) {
                            addMusicIds.push(this.props.items.getIn([i , '_id']))
                        }
                    }

                    this.props.MyMusicActions.fetchAddMusicInList({ 'userId' : this.props.userId ,'listId' : this.props.myMusicLists.getIn([i , '_id']) , 'musicId' : addMusicIds })
                    this.props.ModalActions.modalClose()
                }}>
                        {this.props.myMusicLists.getIn([i , 'listName'])}
                </div>)
            }
            this.props.ModalActions.modalSetContents({'body' : body})
        }
    }

    addMusicPlayer = (index) => {
        const addList = [];
        
        this.state.selected.forEach((value , index) => {
            if(value) {
                addList.push(this.props.items.getIn([index , '_id']))
            }
        })
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : addList })
        this.setState({ selected : this.state.selected.map(value => { value = false; return value }) , showBottom : false})
    }

    playSelected = () => {
        this.addMusicPlayer()

        //서버에서 응답 받을때까지 대기하고 재생
        const interval = setInterval(() => {
            if(!this.props.musicPlayerMonitor) {
                this.props.MusicPlayerActions.onRemote({'play' : true})
                clearInterval(interval)
            }
        } , 1000)
        
    }

    playAll = () => {
        this.setState({ 'selected' : this.state.selected.map(value => { value = true; return value })})
        setTimeout(() => { this.playSelected() } , 1000)
    }

    onClickAddList = (index) => {
        const title = '새 음악 추가'
        const body = []
        
        body.push(<Loading key={body.length} />)
        this.props.ModalActions.modalSetContents({'title' : title, 'body' : body })
        this.props.ModalActions.modalOpen()

        this.props.MyMusicActions.fetchGetMyMusicLists({userId : this.props.userId})
    }

    onClickListItem = (index) => {
        this.setState({ 'selected' : this.state.selected.update(index , value => !value)})
    }

    render () {
        return (
            <div className={cn('toptenmusic')}>

                <div className={cn('toptenmusic-title')}>
                    <p><i className="fas fa-fire" style={{color:'#F42'}}></i>&nbsp;실시간 차트&nbsp;<i className="fas fa-fire" style={{color:'#F42'}}></i></p>
                </div>

                <div className={cn('toptenmusic-list')}>
                        {
                            this.props.items.map(
                                (value , index) => (
                                    <div className={cn('toptenmusic-list-item' , {'toptenmusic-list-item-selected' : this.state.selected.get(index) } , { 'toptenmusic-list-item-unselected' : !this.state.selected.get(index)})} key={index} onClick={(e) => this.onClickListItem(index)}>
                                        <div className={cn('toptenmusic-list-rank' , `rank${value.get('rank')}`)}>
                                            <p>{(index > 2)? `${index+1}` : <i className="fas fa-medal"></i> }</p>
                                        </div>
                                        <div className={cn('toptenmusic-list-song')}>
                                            <p>{value.get('song')}</p>
                                        </div> 
                                        <div className={cn('toptenmusic-list-singer')}>
                                            <p>{value.getIn(['singer' , 'name'])}</p>
                                        </div>
                                    </div>
                                )
                            )
                        }
                </div>
                <div className={cn('toptenmusic-buttons')}>
                    <div className={cn('toptenmusic-play-all')} onClick={(e) => {this.playAll()}}>
                        <i className="fas fa-list-ol"></i><span> 전체재생</span>
                    </div>
                    
                    <div className={cn('toptenmusic-play-selected')} onClick={(e) => {this.playSelected()}}>
                        <i className="fas fa-tasks"></i><span> 선택재생</span>
                    </div>

                    <div className={cn('toptenmusic-add-playlist')} onClick={(e) => {this.addMusicPlayer()}}>
                        <i className="fas fa-plus"></i><span> 현재재생목록 추가</span>
                    </div>

                    <div className={cn('toptenmusic-add-playlist')} onClick={(e) => {
                            if(this.props.isAuthenticated) {
                                this.onClickAddList()
                            }
                            else {
                                if(window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
                                    this.props.history.push('auth')
                                }
                            }
                                
                        }}>
                        <i className="fas fa-folder-plus"></i><span> 내음악목록 추가</span>
                    </div>
                </div>
            </div>

        
        )
    }
}

export default connect(
    (state) => ({
        items : state.top100.items.slice(0,10),
        isAuthenticated : state.auth.isAuthenticated,
        userId : state.auth.userId,
        myMusicLists : state.myMusic.myMusicLists,
        myMusicListsLoading : state.myMusic.loading,
        musicPlayerMonitor : state.musicPlayer.monitor,
        addedIndex : state.musicPlayer.addedIndex,
    }),
    (dispatch) => ({
        Top100Actions : bindActionCreators(Top100Actions , dispatch),
        MyMusicActions : bindActionCreators(MyMusicActions , dispatch),
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch),
    })
)(withRouter(TopTenMusic))