import React  , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './buttons.css'
const cn = classNames.bind(styles)


export default class MyMusicViewButtons extends Component {
    render () {
        return (
            <div>
                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-play')}></i>&nbsp;재생</p>
                </div> 

                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-eraser')}>&nbsp;</i>삭제</p>
                </div>

                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-list')}></i>&nbsp;새 리스트 만들기</p>
                </div> 

                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-stream')}></i>&nbsp;가져오기</p>
                </div> 

                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-cloud-download-alt')}></i>&nbsp;다운로드</p>
                </div>

                <div className={cn('mymusic-buttons')}>
                    <p><i className={cn('fas fa-cloud-upload-alt')}></i>&nbsp;업로드</p>
                </div>
            </div>
        )
    }
}