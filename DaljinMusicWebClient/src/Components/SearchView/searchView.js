import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import * as SearchActions from '../../ReduxModules/search'

import { Map } from 'immutable'

import classNames from 'classnames/bind'
import styles from './searchView.css'
const cn = classNames.bind(styles)

class SearchView extends Component {

    state = {
        searchMode : Map({
            song : true,
            singer : false,
            album : false,
        })
    }

    componentDidMount () {
        const searchText = queryString.parse(this.props.location.search).searchtext
        if(typeof searchText !== 'undefined') {
            this.setState({ 'searchText' : searchText })
            this.props.SearchActions.fetchSearchSong({'searchText' : searchText})
        }
    }

    onClickSearchSong = (e) => {
        if(typeof this.state.searchText !== 'undefined') {
            this.setState({'searchMode' : this.state.searchMode.set('song' , true).set('singer' , false).set('album' , false)})
            this.props.SearchActions.fetchSearchSong({'searchText' : this.state.searchText})
        }
    }

    onClickSearchSinger = (e) => {
        if(typeof this.state.searchText !== 'undefined') {
            this.setState({'searchMode' : this.state.searchMode.set('song' , false).set('singer' , true).set('album' , false)})
            this.props.SearchActions.fetchSearchSinger({'searchText' : this.state.searchText})
        }
    }

    onClickSearchAlbum = (e) => {
        if(typeof this.state.searchText !== 'undefined') {
            this.setState({'searchMode' : this.state.searchMode.set('song' , false).set('singer' , false).set('album' , true)})
            this.props.SearchActions.fetchSearchAlbum({'searchText' : this.state.searchText})
        }
    }


    render () {
        return (
            <div className={cn('searchview')}>
                <div className={cn('searchview-header')}>
                    <div className={cn('searchview-header-item' , { 'searchview-header-item-selected' : this.state.searchMode.get('song') })} onClick={this.onClickSearchSong}>
                        <span>이름</span>
                    </div>
                    
                    <div className={cn('searchview-header-item' , { 'searchview-header-item-selected' : this.state.searchMode.get('singer') })} onClick={this.onClickSearchSinger}>
                        <span>가수</span>
                    </div>

                    <div className={cn('searchview-header-item' , { 'searchview-header-item-selected' : this.state.searchMode.get('album') })} onClick={this.onClickSearchAlbum}>
                        <span>앨범</span>
                    </div>
                </div>

                <div className={cn('searchview-message')}>
                    검색결과 ({this.props.foundList.size})
                </div>
                    
                <div className={cn('searchview-body')}>
                    {this.props.foundList.size === 0 ?
                        <div>
                            데이터 없음
                        </div>
                        :
                        <div className={cn('searchview-body-list')}>
                        {this.props.foundList.map(
                            (value , index) => (
                                <div className={cn('searchview-body-item')} key={value}>
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
                            )
                        )
                        }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        foundList : state.search.foundList
    }),
    (dispatch) => ({
        SearchActions : bindActionCreators(SearchActions , dispatch)
    })
)(withRouter(SearchView))