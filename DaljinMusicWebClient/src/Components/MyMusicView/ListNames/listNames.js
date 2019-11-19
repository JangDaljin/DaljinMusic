import React , { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicAction from '../../../ReduxModules/myMusic'
import { MODAL_SELECTOR } from '../Modal/modal'

import classNames from 'classnames/bind'
import styles from './listNames.css'
const cn = classNames.bind(styles)

class ListName extends Component {

    render () {
        return (
                <div>
                    {
                        this.props.myMusicLists.map(
                            (value , index) => (
                                <div key={index} className={cn('mymusicnames-list-item-wrap' , { 'mymusicnames-list-wrap-selected' : value.get('selected') })} onClick={() => {
                                    this.props.MyMusicAction.selectList({selectedListIndex : index})
                                }}>
                                    <div className={cn('mymusicnames-list-item' , { 'mymusicnames-list-selected' : value.get('selected') })}>
                                        <div>{value.get('listName')}</div>
                                        <div className={cn('mymusicnames-list-delete')} onClick={(e) => { e.stopPropagation(); this.props.onChangeModal(MODAL_SELECTOR.LIST_DELETE , value.get('_id')) }}>
                                            <i className="far fa-minus-square fa-2x"></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                    <div className={cn('mymusicnames-addlist-button')} onClick={() => { this.props.onChangeModal(MODAL_SELECTOR.MAKELIST) }}>
                        <p><i className="far fa-plus-square"></i> 새 리스트</p>
                    </div>
                </div>

        )
    }
}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists
    }),
    (dispatch) => ({
        MyMusicAction : bindActionCreators(myMusicAction , dispatch)
    })
)(ListName)