import React , { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import SearchResult from './SearchResult/searchResult'


import classNames from 'classnames/bind'
import styles from './searchViewBody.css'
const cn = classNames.bind(styles)

class SearchViewBody extends Component {
    
    constructor (props) {
        super(props)

        const query = queryString.parse(props.location.search)
        this.state = {
            searchText : query.searchtext,
            searchSongItems : [],
            searchSingerItems : [],
            searchAlbumItems : []
        }

        
        //TEST
        const newState = { ...this.state }
        const testInfo = [];
        for(let i = 0 ; i < 5; i ++) {
            testInfo.push(
                {
                    singer : `SINGER ${i}`,
                    song : `SONG ${i}`,
                    album : `ALBUM ${i}`
                }
            )
        }
        newState.searchSongItems = testInfo;
        newState.searchSingerItems = testInfo;
        newState.searchAlbumItems = testInfo;

        this.state = newState;
    }

    render () {
        return (
            <div className={cn('viewbody')}>
                <SearchResult title='곡' items={this.state.searchSongItems} />
                <SearchResult title='가수' items={this.state.searchSingerItems} />
                <SearchResult title='앨범' items={this.state.searchAlbumItems} />
            </div>
        )
    }
}

export default withRouter(SearchViewBody);