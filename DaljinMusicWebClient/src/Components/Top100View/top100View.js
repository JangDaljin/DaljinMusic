import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List , fromJS } from 'immutable'
import * as top100Actions from '../../ReduxModules/top100'
import * as myMusicActions from '../../ReduxModules/myMusic'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import * as ModalActions from '../../ReduxModules/modal'
import { withRouter } from 'react-router-dom'
import Loading from '../LoadingView/loading'
import classNames from 'classnames/bind'
import styles from './top100View.css'
const cn = classNames.bind(styles)

const MAX_RANK = 100

class Top100ViewBody extends Component {

    state = {
        selected : List(fromJS(Array(MAX_RANK).fill(false))),
        showBottom : false,
        selectedItemCount : 0,
        top100Mode : 'total',
    }

    componentDidMount () {
        this.props.MyMusicActions.fetchGetMyMusicLists({'userId' : this.props.userId})
        this.props.Top100Actions.fetchTop100({'from' : 1  , 'to' : 10 , 'init' : true , 'mode' : this.state.top100Mode})
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

        if(prevState.top100Mode !== this.state.top100Mode) {
            this.props.Top100Actions.fetchTop100({'from' : 1  , 'to' : 10 , 'init' : true , 'mode' : this.state.top100Mode})
        }
    }

    addMusicPlayer = () => {
        const addList = [];
        
        this.state.selected.forEach((value , index) => {
            if(value) {
                addList.push(this.props.items.getIn([index , '_id']))
            }
        })
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : addList })
        this.setState({ selected : this.state.selected.map(value => { value = false; return value }) , selectedItemCount : 0 , showBottom : false})
    }

    play = () => {
        this.addMusicPlayer()

        //서버에서 응답 받을때까지 대기하고 재생
        const interval = setInterval(() => {
            if(!this.props.musicPlayerMonitor) {
                this.props.MusicPlayerActions.onRemote({'play' : true})
                clearInterval(interval)
            }
        } , 1000)
        
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
        const indexValue = this.state.selected.get(index)
        let selectedItemCount = this.state.selectedItemCount
        let showBottom = this.state.showBottom        
        if(indexValue) {
            selectedItemCount--
            if(selectedItemCount === 0) {
                showBottom = false
            }
        }
        else {
            selectedItemCount++
            showBottom = true
        }

        this.setState({ 'selected' : this.state.selected.update(index , value=>!value) , 'selectedItemCount' : selectedItemCount , 'showBottom' : showBottom})
    }

    onScroll = (e) => {
        const currentScrollBottom = e.target.scrollTop + this.mainview.clientHeight
        const viewHeight = this.listview.clientHeight + this.modeview.clientHeight

        if(currentScrollBottom === viewHeight) {
            this.props.Top100Actions.fetchTop100({'from' : this.props.items.size+1  , 'to' : this.props.items.size+10 , 'mode' : this.state.top100Mode})
        }
    }



    render () {
        return (
            <React.Fragment>
            <div className={cn('top100')} onScroll={this.onScroll} ref={ref => this.mainview = ref}>
                <div className={cn('top100-mode-buttons')} ref={ref => this.modeview = ref}>
                    <div className={cn({'top100-mode-checked' : this.state.top100Mode === 'total'})} onClick={(e)=>{ this.setState({ 'top100Mode' : 'total' })}}>
                        종합
                    </div>
                    <div className={cn({'top100-mode-checked' : this.state.top100Mode === 'month'})} onClick={(e)=>{ this.setState({ 'top100Mode' : 'month' })}}>
                        월간
                    </div>
                    <div className={cn({'top100-mode-checked' : this.state.top100Mode === 'week'})} onClick={(e)=>{ this.setState({ 'top100Mode' : 'week' })}}>
                        주간
                    </div>
                    <div className={cn({'top100-mode-checked' : this.state.top100Mode === 'day'})} onClick={(e)=>{ this.setState({ 'top100Mode' : 'day' })}}>
                        일일
                    </div>
                </div>


                <div className={cn('top100-list')} ref={ref => this.listview = ref}>
                    {
                        this.props.items.map((value , index) => (
                            <div key={index} className={cn('top100-list-item' , {'top100-list-selected' : this.state.selected.get(index)} , {'top100-list-unselected' : !this.state.selected.get(index)})} onClick={(e) => { this.onClickListItem(index) }}>
                                <div className={cn('top100-list-item-ranking')}>
                                    <p>{value.get('rank')}</p>
                                </div>
                                <div className={cn('top100-list-item-img')}>

                                    <div className={cn('top100-list-item-album-img')} 
                                    style={
                                        {
                                            backgroundImage : `url('${process.env.REACT_APP_SERVER}${value.getIn(['album' , 'albumImgUri'])}')`
                                        }}>

                                    </div>
                                </div>

                                <div className={cn('top100-list-item-info')}>
                                    <div className={cn('top100-list-item-song')}>
                                        <p>{value.get('song')}</p>
                                    </div>
                                    <div className={cn('top100-list-item-singer')}>
                                        <p>{value.getIn(['singer' , 'name'])}</p>
                                    </div>
                                    <div className={cn('top100-list-item-album')}>
                                        <p>{value.getIn(['album' , 'name'])}</p>
                                    </div>
                                </div>
                                
                            </div>
                        ))
                        
                    }
                </div>
            </div>
            <div className={cn('top100-bottom' , {'top100-bottom-show' : this.state.showBottom} , {'top100-bottom-hide' : !this.state.showBottom})}>
                <div className={cn('top100-bottom-buttons')}>
                    <div className={cn('top100-play' , 'top100-bottom-button')} onClick={
                                                (e) => {
                                                    this.play()
                                                }
                                            }><i className={cn('fas fa-play')}></i>재생</div>

                    <div className={cn('top100-add' , 'top100-bottom-button')} onClick={
                        (e) => {
                            this.addMusicPlayer()
                        }
                    }><i className={cn('fas fa-plus')}></i>플레이리스트에 추가</div>

                    <div className={cn('top100-addlist' , 'top100-bottom-button')} onClick={
                        (e) => { if(this.props.isAuthenticated) {
                            this.onClickAddList()
                        }
                        else {
                            if(window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
                                this.props.history.push('auth')
                            }
                        } }
                    }><i className={cn('fas fa-list')}></i>내 음악리스트에 추가</div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        items : state.top100.items,
        isAuthenticated : state.auth.isAuthenticated,
        myMusicLists : state.myMusic.myMusicLists,
        myMusicListsLoading : state.myMusic.loading,
        musicPlayerMonitor : state.musicPlayer.monitor,
        addedIndex : state.musicPlayer.addedIndex,
    }),
    (dispatch) => ({
        Top100Actions : bindActionCreators(top100Actions , dispatch),
        MyMusicActions : bindActionCreators(myMusicActions , dispatch),
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch),
    })
)(withRouter(Top100ViewBody))