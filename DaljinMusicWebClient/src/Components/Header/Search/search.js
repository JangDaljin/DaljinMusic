import React , { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchActions from '../../../ReduxModules/search'

import queryString from 'query-string'
import styles from './search.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)
    
class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchtext : queryString.parse(this.props.location.search).searchtext || ''
        }
        this.searchTextChanged = this.searchTextChanged.bind(this);
    }

    searchTextChanged = (e) => {
        e.preventDefault()
        this.setState({searchtext : e.target.value})
    }

    onClickSearchButton = (e) => {
        //this.props.SearchActions.fetchSearch({'searchText' : this.state.searchtext})
        this.props.history.push(`/search?searchtext=${this.state.searchtext}`)
    }

    render () {
        return (
            <div className={cn('header-search')}>
                <div className={cn('header-search-icon-wrap')}>
                    <i className={cn('header-search-icon' , 'fas fa-search')} ></i>
                </div>
                <div className={cn('header-search-text-wrap')}>
                    <input className={cn('header-search-text')} type="text" placeholder="검색어 입력" onChange={this.searchTextChanged} value={this.state.searchtext}/>
                </div>
                <div className={cn('header-search-button')} onClick={this.onClickSearchButton}>
                    검색
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        
    })
    ,
    (dispatch) => ({
        SearchActions : bindActionCreators(SearchActions , dispatch)
    })
)(withRouter(Search))