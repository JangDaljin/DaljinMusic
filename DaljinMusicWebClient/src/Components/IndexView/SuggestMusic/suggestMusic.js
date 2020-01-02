import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as suggestMusicActions from '../../../ReduxModules/suggestMusic'

import classNames from 'classnames/bind'
import styles from './suggestMusic.css'
const cn = classNames.bind(styles)

class SuggestMusicList extends Component {

    componentDidUpdate(prevProps , prevState) {
        if(prevProps.authMonitor && !this.props.authMonitor) {
            this.props.SuggestMusicActions.fetchSuggestMusic({ 'userId' : this.props.userId , 'musicCount' : 5 })
        }
    }


    render () {
        return (
            <div className={cn('suggest-music')}>
                <div className="suggest-title">
                    <p>추천 음악</p>
                </div>
                <ul className={cn('suggest-music-list')}>
                    {
                        this.props.suggestMusics.map((value , index) => (

                            <li key={index} className={cn('suggest-music-list-item')}>
                                <div className={cn('suggest-music-list-album-img-wrap')}>
                                    <div className={cn('suggest-music-list-album-img')} style={{backgroundImage: `url('${value.getIn(['album' , 'albumImgUri'])}')`}}></div>
                                </div>
                                <div className={cn('suggest-music-list-info')}>
                                    <div className={cn('suggest-music-list-singer')}>{value.getIn(['singer' , 'name'])}</div>
                                    <div className={cn('suggest-music-list-song')}>{value.get('song')}</div>
                                    <div className={cn('suggest-music-list-album')}>{value.getIn(['album' , 'name'])}</div>
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
        suggestMusics : state.suggestMusic.suggestMusics,
        userId : state.auth.userId,
        authMonitor : state.auth.monitor,
    }),
    (dispatch) => ({
        SuggestMusicActions : bindActionCreators(suggestMusicActions , dispatch)
    })
)(SuggestMusicList)