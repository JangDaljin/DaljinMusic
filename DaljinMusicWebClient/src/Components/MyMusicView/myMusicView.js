import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicAction from '../../ReduxModules/myMusic'


import MyMusicViewTable from './Table/table'
import MyMusicViewListNames from './ListNames/listNames'
import MyMusicViewButtons from './Buttons/buttons'

import classNames from 'classnames/bind'
import styles from './myMusicView.css'
const cn = classNames.bind(styles)

class MyMusicViewBody extends Component {

    constructor(props) {
        super(props)
        props.MyMusicActions.fetchMyMusic({userId : this.props.userId})
    }

    render () {
        return (
            <div className={cn('mymusic')}>

                <div className={cn('mymusic-left')}>
                    <MyMusicViewListNames listNames={this.props.myMusicList.map((value) => (value.listName))} />
                </div>

                <div className={cn('mymusic-center')}>
                    <MyMusicViewTable musicList={ this.props.myMusicList[this.props.curSelectList] } />
                </div>

                <div className={cn('mymusic-right')}>
                    <MyMusicViewButtons />
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicList : state.myMusic.myMusicList.slice(0 , state.myMusic.myMusicList.length),
        curSelectList : state.myMusic.curSelectList,
        id : state.auth.userId
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(MyMusicViewBody)