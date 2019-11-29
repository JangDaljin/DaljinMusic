import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as hnnActions from '../../../ReduxModules/hotnNewMusic'

import classNames from 'classnames/bind'
import styles from './hotnNewMusic.css'
const cn = classNames.bind(styles)



class HotnNewMusic extends Component {

    constructor(props) {
        super(props)
        props.HnnActions.hnnMusicFetch();
        this.state = {
            curAlbumImgUri : ''
        }
    }

    render () {
        return (
            <div className={cn('hotnnewmusic')}>
                <div className={cn('hotnnewmusic-title')}>
                    <span style={{color:'#FF5A5A'}}>HOT</span><span style={{color:'#9887b9'}}>&nbsp;&&nbsp;</span><span style={{color:'#069'}}>NEW</span>
                </div>

                <div className={cn('hotnnewmusic-content')}>
                    <div className={cn('hotnnewmusic-left')}>
                        <div className={cn('hotnnewmusic-album-img')} style={{backgroundImage: `url('${this.state.curAlbumImgUri}')`}}>

                        </div>
                    </div>

                    <div className={cn('hotnnewmusic-right')}>

                            {
                                this.props.items.map(
                                    (value , index) => (
                                        <div className={cn('hotnnewmusic-list-item' , { 'hot' : !value.isNew } , { 'new' : value.isNew })} key={index} onMouseOver={() => { this.setState({curAlbumImgUri : value.albumImgUri}) }}>
                                            <div className={cn('hotnnewmusic-list-item-singer')}>{value.singer}</div>
                                            <div className={cn('hotnnewmusic-list-item-song')}>{value.song}</div>
                                        </div> 
                                    )
                                )
                            }
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(
    (state) => ({
        items : state.hnnMusic.items
    }),
    (dispatch) => ({
        HnnActions : bindActionCreators(hnnActions , dispatch)
    })
)(withRouter(HotnNewMusic))