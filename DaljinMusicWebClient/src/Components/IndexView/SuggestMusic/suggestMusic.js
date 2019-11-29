import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as suggestMusicActions from '../../../ReduxModules/suggestMusic'

import classNames from 'classnames/bind'
import styles from './suggestMusic.css'
const cn = classNames.bind(styles)

class SuggestMusicList extends Component {


    constructor(props) {
        super(props)
        props.SuggestMusicActions.fetchSuggestMusic(this.props.userId)
    }

    render () {
        return (
            <div className={cn('suggest-music')}>
                <div className="suggest-title">
                    <p>추천 음악</p>
                </div>
                <ul className={cn('suggest-music-list')}>
                    {
                        this.props.items.map((value , index) => (
                            <li key={index} className={cn('suggest-music-list-item')}>
                                <div className={cn('suggest-music-list-album-img-wrap')}>
                                    <div className={cn('suggest-music-list-album-img')} style={{backgroundImage: `url('${value.albumImgUri}')`}}></div>
                                </div>
                                <div className={cn('suggest-music-list-info')}>
                                    <div className={cn('suggest-music-list-singer')}>{value.singer}</div>
                                    <div className={cn('suggest-music-list-song')}>{value.song}</div>
                                    <div className={cn('suggest-music-list-album')}>{value.album}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default connect(
    (state) => ({
        items : state.suggestMusic.items,
        userId : state.auth.userId
    }),
    (dispatch) => ({
        SuggestMusicActions : bindActionCreators(suggestMusicActions , dispatch)
    })
)(SuggestMusicList)