import React , { Component } from 'react'

import * as AdminActions from '../../ReduxModules/admin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Map , List } from 'immutable'


import classNames from 'classnames/bind'
import style from './adminView2.css'
const cn = classNames.bind(style)

const MENU_MODE = {
    TODAYSLIVE : 0,
    HOTANDNEW : 1,
    ADDMUSIC : 2,
}

const SEARCH_MODE = {
    SONG : 0,
    SINGER : 1,
    ALBUM : 2,
}

class AdminView extends Component {

    state = {
        menuMode : MENU_MODE.TODAYSLIVE,
        searchMode : SEARCH_MODE.SONG,
        password : '',

        todayslive : Map(),
        hotandnew : List(),
        addmusic : List(),
    }

    onClickMenu = (_menuMode) => {
        this.setState({'menuMode' : _menuMode })
    }

    onChangeSearchMode = (_searchMode) => {
        this.setState({'searchMode' : _searchMode})
    }

    fetchGetAllMusics = () => {
        this.props.AdminActions.fetchGetAllMusics({'adminKey' : this.props.adminKey})
    }

    onChangeAdminLoginPassword = (e) => {
        this.setState({'password' : e.target.value})
    }

    onClickAdminLogin = () => {
        this.props.AdminActions.fetchValidatePassword({'password' : this.state.password})
        this.setState({'password' : ''})
    }

    onClickRightListItem = (index) => {
        switch(this.state.menuMode) {
            case MENU_MODE.TODAYSLIVE :
                this.setState({
                    'todayslive' : this.props.musicList.get(index)
                })
            break;

            case MENU_MODE.HOTANDNEW :
                this.setState({
                    'hotandnew' : this.state.hotandnew.push(Map({
                        hot : false,
                        new : false,
                        music : this.props.musicList.get(index)
                    }))
                })
            break;

            case MENU_MODE.ADDMUSIC :

            break;

            default :

            break;
        }
    }

    componentDidUpdate = (prevProps , prevState) => {
        if(prevProps !== this.props) {
            if(!prevProps.isAdmin && this.props.isAdmin) {
                this.fetchGetAllMusics()
            }
        }
    }

    onClickSearch = (searchText) => {
        switch(this.state.searchMode) {
            case SEARCH_MODE.SONG :

            break;

            case SEARCH_MODE.SINGER :

            break;

            case SEARCH_MODE.ALBUM :

            break;

            default :

            break;
        }
    }

    onSelectHotAndNew = (index , value) => {
        if(value === 'HOT') {
            this.setState({'hotandnew' : this.state.hotandnew.setIn([index , 'hot'] , true).setIn([index , 'new'] , false)})
        }
        else if(value === 'NEW') {
            this.setState({'hotandnew' : this.state.hotandnew.setIn([index , 'hot'] , false).setIn([index , 'new'] , true)})
        }
        else if(value === 'BOTH') {
            this.setState({'hotandnew' : this.state.hotandnew.setIn([index , 'hot'] , true).setIn([index , 'new'] , true)})
        }
        else {
            this.setState({'hotandnew' : this.state.hotandnew.setIn([index , 'hot'] , false).setIn([index , 'new'] , false)})
        }

    }

    fetchSetHotAndNew = () => {
        const list = this.state.hotandnew.map(value => ({'hot' : value.get('hot') , 'new' : value.get('new') , 'musicId' : value.getIn(['music' , '_id'])})).toJS()
        for(let i = 0 ; i < list.length; i++) {
            if(!list[i].hot && !list[i].new) {
                window.alert(`${i+1}번째 HOT/NEW/BOTH 선택 안됨`)
                return
            }
        }
        this.props.AdminActions.fetchSetHotAndNew({'adminKey' : this.props.adminKey , 'list' : list})
    }

    render () {
        return (
            
        <div className={cn('adminview')}>
            {!this.props.isAdmin ?

                <div className={cn('admin-confirm')}>
                    <div className={cn("fas fa-lock fa-2x" , 'lock-icon')}></div>
                    <input type="password" placeholder="비밀번호" onChange={this.onChangeAdminLoginPassword}/>
                    <div className={cn("far fa-arrow-alt-circle-right fa-2x" , 'admin-enter')} onClick={this.onClickAdminLogin} ></div>
                </div>

                :
                
                <React.Fragment>
                <div className={cn('left')}>
                    <div className={cn('left-header')}>
                        <div className={cn({'menu-selected' : this.state.menuMode === MENU_MODE.TODAYSLIVE})} onClick={(e)=> { this.onClickMenu(MENU_MODE.TODAYSLIVE)}}>오늘의 라이브 설정</div>
                        <div className={cn({'menu-selected' : this.state.menuMode === MENU_MODE.HOTANDNEW})} onClick={(e)=> { this.onClickMenu(MENU_MODE.HOTANDNEW)}}>핫앤뉴 설정</div>
                        <div className={cn({'menu-selected' : this.state.menuMode === MENU_MODE.ADDMUSIC})} onClick={(e)=> { this.onClickMenu(MENU_MODE.ADDMUSIC)}}>새 음악 추가</div>
                    </div>

                    {this.state.menuMode === MENU_MODE.TODAYSLIVE &&
                    <React.Fragment>
                    <div className={cn('todayslive')}>
                        <div className={cn('todayslive-img-wrap')}>
                            <div className={cn('todayslive-img')} style={{backgroundImage:`url('${this.state.todayslive.getIn(['album' , 'albumImgUri'])}')`}}></div>
                        </div>
                        <div className={cn('todayslive-info')}>
                            <div>
                                <span>가수 : {this.state.todayslive.getIn(['singer' , 'name'])}</span>
                            </div>
                            <div>
                                <span>노래 : {this.state.todayslive.get('song')}</span>
                            </div>
                            <div>
                                <span>앨범 : {this.state.todayslive.getIn(['album' , 'name'])}</span>
                            </div>
                        </div>
                    </div>

                    <div className={cn('save-button')}>저장</div>
                    </React.Fragment>
                    }

                    {this.state.menuMode === MENU_MODE.HOTANDNEW &&
                    <div className={cn('hotandnew')}>
                        {
                            this.state.hotandnew.map(
                                (value , index) => (
                                    <div key={index} className={cn('hotandnew-item')}>

                                        <div className={cn('hotandnew-album-img-wrap')}>
                                            <div className={cn('hotandnew-album-img')} style={{backgroundImage:`url('${value.getIn(['music' , 'album' , 'albumImgUri'])}')`}}></div>
                                        </div>

                                        <div className={cn('hotandnew-info')}>
                                                <div>제목 : {value.getIn(['music' ,'song'])}</div>
                                                <div>가수 : {value.getIn(['music' , 'singer' , 'name'])}</div>
                                                <div>앨범 : {value.getIn(['music' , 'album' , 'name'])}</div>
                                        </div>
                                        
                                        <div className={cn('hotandnew-menu')}>
                                            <select onChange={(e) => {this.onSelectHotAndNew(index , e.target.value)}}>
                                                <option value="">선택</option>
                                                <option value="HOT">HOT</option>
                                                <option value="NEW">NEW</option>
                                                <option value="BOTH">BOTH</option>
                                            </select>

                                            <div className={cn('hotandnew-delete')}>
                                                X
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                        <div className={cn('save-button')} onClick={(e) => { this.fetchSetHotAndNew() }}>
                            저장
                        </div>
                    </div>
                    }

                    {this.state.menuMode === MENU_MODE.ADDMUSIC &&

                    <div>

                    </div>

                    }
                </div>


                <div className={cn('right')}>
                    <div className={cn('search-bar')}>
                        <select onChange={(e)=>{ this.onChangeSearchMode(e.target.value) }}>
                            <option value={SEARCH_MODE.SONG}>제목</option>
                            <option value={SEARCH_MODE.SINGER}>가수</option>
                            <option value={SEARCH_MODE.ALBUM}>앨범</option>
                        </select>
                        <input type="text" />
                        <div className={cn('search-button' , 'fas fa-search')}></div>
                    </div>

                    <div className={cn('right-list-header')}>
                            <div className={cn('right-list-column')}>가수</div>
                            <div className={cn('right-list-column')}>제목</div>
                            <div className={cn('right-list-column')}>앨범</div>
                        </div>

                    <div className={cn('right-list')}>

                    {
                        this.props.musicList.map(
                            (value , index) => (
                                <div className={cn('right-item' , { 'right-item-odd' : index % 2 === 1} , {'right-item-even' : index % 2 === 0})} key={index} onClick={(e)=>{ this.onClickRightListItem(index) }}>
                                    <div className={cn('right-list-column')}>
                                        {value.getIn(['singer' , 'name'])}
                                    </div>
                                    <div className={cn('right-list-column')}>
                                        {value.get('song')}
                                    </div>
                                    <div className={cn('right-list-column')}>
                                        {value.getIn(['album' , 'name'])}
                                    </div>
                                </div>
                            )
                        )
                    }
                    </div>
                </div>
                </React.Fragment>
                
            }

        </div>
            
        )
    }
}


export default connect(
    (state) => ({
        isAdmin : state.admin.isAdmin,
        adminKey : state.admin.adminKey,
        musicList : state.admin.musicList
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(AdminView)