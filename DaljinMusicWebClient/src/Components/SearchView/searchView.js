import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import * as ModalActions from '../../ReduxModules/modal'
import * as MusicPlayerActions from '../../ReduxModules/musicPlayer'
import * as SearchActions from '../../ReduxModules/search'
import * as MyMusicActions from '../../ReduxModules/myMusic'

import Loading from '../LoadingView/loading'

import { List } from 'immutable'

import classNames from 'classnames/bind'
import styles from './searchView.css'
const cn = classNames.bind(styles)

class SearchView extends Component {

    state = {
        showMode : 'song',
        selected : List(),
        selectedCount : 0,
    }

    componentDidUpdate (prevProps , prevState) {
        if(prevProps.location.search !== this.props.location.search ) {
            this.onSearch()
        }

        if(prevProps.foundLists !== this.props.foundLists) {
            this.setState({'selected' : this.state.selected.clear().concat(Array(this.props.foundLists.get(this.state.showMode).size).fill(false)) , 'selectedCount' : 0})
        }

        if(prevProps.myMusicListsLoading && !this.props.myMusicListsLoading) {
            const body = []
            for(let i = 0 ; i < this.props.myMusicLists.size ; i++) {
                body.push(
                <div key={body.length} onClick={(e) => { 
                    const addMusicIds = []
                    for(let j = 0 ; j < this.state.selected.size; j++) {
                        if(this.state.selected.get(j)) {
                            addMusicIds.push(this.props.foundLists.getIn([this.state.showMode , j , '_id']))
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

    componentDidMount () {
        this.onSearch()
    }

    onSearch = () => {
        const searchText = queryString.parse(this.props.location.search).searchtext
        this.props.SearchActions.fetchSearch({'searchText' : searchText})
    }

    onClickShowButton = (menuName) => {
        this.setState({'showMode' : menuName , 'selected' : this.state.selected.clear().concat(Array(this.props.foundLists.get(menuName).size).fill(false)) , 'selectedCount' : 0})
    }

    onClickSelect = (index) => {
        let count = this.state.selectedCount;
        if(this.state.selected.get(index)) {
            count--
        }
        else {
            count++
        }
        this.setState({'selected' : this.state.selected.update(index , value => !value) , 'selectedCount' : count})
    }

    addMusicPlayer = () => {
        const addList = [];
        
        this.state.selected.forEach((value , index) => {
            if(value) {
                addList.push(this.props.foundLists.getIn([this.state.showMode , index , '_id']))
            }
        })
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : addList })
        this.setState({ selected : this.state.selected.map(value => { value = false; return value }) , 'selectdCount' : 0 })
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

    onClickAddList = () => {
        const title = '새 음악 추가'
        const body = []
        
        body.push(<Loading key={body.length} />)
        this.props.ModalActions.modalSetContents({'title' : title, 'body' : body })
        this.props.ModalActions.modalOpen()
        this.props.MyMusicActions.fetchGetMyMusicLists({userId : this.props.userId})
    }

    render () {
        return (
            <div className={cn('searchview')}>
                <div className={cn('searchview-header')}>
                    <div className={cn('searchview-header-item' , { 'searchview-header-item-selected' : this.state.showMode === 'song' })} onClick={e => { this.onClickShowButton('song')}}>
                        <span>이름({this.props.foundLists.get('song').size})</span>
                    </div>
                    
                    <div className={cn('searchview-header-item' , { 'searchview-header-item-selected' : this.state.showMode === 'singer' })} onClick={e => { this.onClickShowButton('singer') }}>
                        <span>가수({this.props.foundLists.get('singer').size})</span>
                    </div>

                    <div className={cn('searchview-header-item' , { 'searchview-header-item-selected' : this.state.showMode === 'album' })} onClick={e => { this.onClickShowButton('album') }}>
                        <span>앨범({this.props.foundLists.get('album').size})</span>
                    </div>
                </div>


                    
                <div className={cn('searchview-body')}>
                    <div className={cn('searchview-message')}>
                        검색결과 ({this.props.foundLists.get(this.state.showMode).size})
                    </div>
                    {this.props.foundLists.get(this.state.showMode).size === 0 ?
                        <div>
                            
                        </div>
                        :
                        <div className={cn('searchview-body-list')}>
                        {this.props.foundLists.get(this.state.showMode).map(
                            (value , index) => (
                                <div className={cn('flex-wrapping')}>
                                <div className={cn('searchview-body-item' , {'searchview-body-item-selected' : this.state.selected.get(index)} , {'searchview-body-item-unselected' : !this.state.selected.get(index)})} key={value} onClick={e => { this.onClickSelect(index)}}>
                                    <div className={cn('searchview-body-item-img-wrap')}>
                                        <div className={cn('searchview-body-item-img')} style={{backgroundImage: `url('${value.getIn(['album' , 'albumImgUri'])}')`}}>
                                        </div>
                                    </div>
                                    <div className={cn('searchview-body-item-info')}>
                                        <div className={cn('searchview-body-item-song')}>
                                            {value.get('song')}
                                        </div>
                                        <div className={cn('searchview-body-item-singer')}>
                                            {value.getIn(['singer' , 'name'])}
                                        </div>
                                        <div className={cn('searchview-body-item-album')}>
                                            {value.getIn(['album' , 'name'])}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )
                        )
                        }
                        </div>
                    }
                </div>

                <div className={cn('searchview-bottom-bar' , {'searchview-bottom-bar-show' : this.state.selectedCount !== 0} , { 'searchview-bottom-bar-hide' : this.state.selectedCount === 0})} >
                    <div className={cn('searchview-bottom-bar-text')}>
                        {this.state.selectedCount}개 선택됨.
                    </div>
                    <div className={cn('searchview-bottom-bar-buttons')}>
                        <div className={cn('searchview-play' , 'searchview-bottom-bar-button')} onClick={
                                                    (e) => {
                                                        this.play()
                                                    }
                                                }><i className={cn('fas fa-play')}></i><p>재생</p></div>

                        <div className={cn('searchview-add' , 'searchview-bottom-bar-button')} onClick={
                            (e) => {
                                this.addMusicPlayer()
                            }
                        }><i className={cn('fas fa-plus')}></i><p>플레이리스트에 추가</p></div>

                        <div className={cn('searchview-addlist' , 'searchview-bottom-bar-button')} onClick={
                            (e) => { if(this.props.isAuthenticated) {
                                this.onClickAddList()
                            }
                            else {
                                if(window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
                                    this.props.history.push('auth')
                                }
                            } }
                        }><i className={cn('fas fa-list')}></i><p>내 음악리스트에 추가</p></div>
                        </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        foundLists : state.search.foundLists,
        myMusicLists : state.myMusic.myMusicLists,
        myMusicListsLoading : state.myMusic.loading,
        musicPlayerMonitor : state.musicPlayer.monitor,
    }),
    (dispatch) => ({
        SearchActions : bindActionCreators(SearchActions , dispatch),
        
        MyMusicActions : bindActionCreators(MyMusicActions , dispatch),
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch),
    })
)(withRouter(SearchView))