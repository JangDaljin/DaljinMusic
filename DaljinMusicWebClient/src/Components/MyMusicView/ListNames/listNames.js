import React , { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicAction from '../../../ReduxModules/myMusic'

import classNames from 'classnames/bind'
import styles from './listNames.css'
const cn = classNames.bind(styles)

class ListName extends Component {


    render () {
        return (
            <div>
                {
                    this.props.listNames.map(
                        (value , index) => (
                            <div key={index} className={cn('mymusicnames-list-item-wrap')} onClick={() => {
                                this.props.MyMusicAction.selectList({selectedList : index})
                            }}>
                                <div className={cn('mymusicnames-list-item')}>
                                    <p>{value}</p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default connect(
    (state) => ({
        
    }),
    (dispatch) => ({
        MyMusicAction : bindActionCreators(myMusicAction , dispatch)
    })
)(ListName)