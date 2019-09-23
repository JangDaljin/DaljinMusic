import React , { Component } from 'react'
import styles from './search.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)
    
class Search extends Component {

    render () {
        return (
            <div className={cn('header-search')}>
                <div className={cn('header-search-icon-wrap')}>
                    <i className={cn('header-search-icon' , 'fas fa-search')} ></i>
                </div>
                <div className={cn('header-search-text-wrap')}>
                    <input className={cn('header-search-text')} type="text" placeholder="노래를 찾아보세요." />
                </div>
                <div className={cn('header-search-button')}>
                    검색
                </div>
            </div>
        )
    }
}

export default Search;