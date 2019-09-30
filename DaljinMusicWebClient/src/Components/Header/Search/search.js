import React , { Component } from 'react'
import { Link , withRouter } from 'react-router-dom'
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

    searchTextChanged (e) {
        e.preventDefault()
        this.setState({searchtext : e.target.value})
    }

    render () {
        return (
            <div className={cn('header-search')}>
                <div className={cn('header-search-icon-wrap')}>
                    <i className={cn('header-search-icon' , 'fas fa-search')} ></i>
                </div>
                <div className={cn('header-search-text-wrap')}>
                    <input className={cn('header-search-text')} type="text" placeholder="노래를 찾아보세요." onChange={this.searchTextChanged} value={this.state.searchtext}/>
                </div>
                <div className={cn('header-search-button')}>
                    <Link to={`/search?searchtext=${this.state.searchtext}`} style={{textDecoration:'inherit', color:'inherit'}}>검색</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Search);