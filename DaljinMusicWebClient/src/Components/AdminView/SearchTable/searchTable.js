import React , { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdminActions from '../../../ReduxModules/admin'

import classNames from 'classnames/bind'
import style from './searchTable.css'
const cn = classNames.bind(style)

const SEARCH_MODE = {
    SONG : 0,
    SINGER : 1,
    ALBUM : 2,
}

class SearchTable extends Component {

    state = {
        searchMode : SEARCH_MODE.SONG
    }

    componentDidMount () {
        this.fetchGetAllMusics()
    }


    onChangeSearchMode = (_searchMode) => {
        this.setState({'searchMode' : _searchMode})
    }

    fetchGetAllMusics = () => {
        this.props.AdminActions.fetchGetAllMusics({'adminKey' : this.props.adminKey})
    }

    onClickSearchListItem = (index) => {
        this.props.AdminActions.choiceItem(this.props.searchList.get(index))
    }

    onClickSearch = (searchText) => {
        
    }

    render () {
        return (
            <div className={cn('searchtable')}>
                <div className={cn('search-bar')}>
                    <select onChange={(e)=>{ this.onChangeSearchMode(e.target.value) }}>
                        <option value={SEARCH_MODE.SONG}>제목</option>
                        <option value={SEARCH_MODE.SINGER}>가수</option>
                        <option value={SEARCH_MODE.ALBUM}>앨범</option>
                    </select>
                    <input type="text" />
                    <div className={cn('search-button' , 'fas fa-search')}></div>
                </div>

                <div className={cn('search-list-header')}>
                    <div className={cn('search-list-column')}>가수</div>
                    <div className={cn('search-list-column')}>제목</div>
                    <div className={cn('search-list-column')}>앨범</div>
                </div>

                <div className={cn('search-list')}>
                {
                    this.props.searchList.map(
                        (value , index) => (
                            <div className={cn('search-item' , { 'search-item-odd' : index % 2 === 1} , {'search-item-even' : index % 2 === 0})} key={index} onClick={(e)=>{ this.onClickSearchListItem(index) }}>
                                <div className={cn('search-list-column')}>
                                    {value.getIn(['singer' , 'name'])}
                                </div>
                                <div className={cn('search-list-column')}>
                                    {value.get('song')}
                                </div>
                                <div className={cn('search-list-column')}>
                                    {value.getIn(['album' , 'name'])}
                                </div>
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
        adminKey : state.admin.adminKey,
        searchList : state.admin.searchList,
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(SearchTable)