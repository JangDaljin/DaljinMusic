import React  , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './buttons.css'

import { MODAL_SELECTOR } from '../Modal/modal'
const cn = classNames.bind(styles)


export default class MyMusicViewButtons extends Component {
    render () {
        return (
            <div>
                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-play')}></i>&nbsp;재생</p>
                </div> 

                <div className={cn('mymusic-buttons')} onClick={() => { this.props.onChangeModal(MODAL_SELECTOR.DELETE) }}>
                    <p><i className={cn('fas fa-eraser')}>&nbsp;</i>삭제</p>
                </div>

                <div className={cn('mymusic-buttons')} onClick={() => { this.props.onChangeModal(MODAL_SELECTOR.GETLIST) }}>
                    <p><i className={cn('fas fa-stream')}></i>&nbsp;가져오기</p>
                </div> 

                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-cloud-download-alt')}></i>&nbsp;다운로드</p>
                </div>

            </div>
        )
    }
}