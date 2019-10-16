import React , { Component } from 'react'


import classNames from 'classnames/bind'
import styles from './modal.css'
const cn = classNames.bind(styles)

export const MODAL_SELECTOR = {
    DELETE : 1,
    MAKELIST : 2,
    GETLIST : 4,
    DOWNLOAD : 8,
    UPLOAD : 16
};

const button = (value , key) => (
    <div className={cn('mymusic-modal-button')} key={key}>
        <input type='button' value={value} />
    </div>
)

const text = (value , key) => (
    <div className={cn('mymusic-modal-text')} key={key}>
        <p>{value}</p>
    </div>
)

const inputText = (placeholder , key) => (
    <div className={cn('mymusic-modal-inputtext')} key={key}>
        <input type='text' placeholder={placeholder} />
    </div>
)





export default class Modal extends Component {

    render () {
        let title = null;
        let content = [];
        let buttons = [];
        switch(this.props.mode) {
            case MODAL_SELECTOR.DELETE : 
                title = '삭제'
                content.push(text('정말 삭제하시겠습니까?' , content.length))
                buttons.push(button('네' , buttons.length))
                buttons.push(button('아니오' , buttons.length))
                break;
            
            case MODAL_SELECTOR.MAKELIST : 
                title = '새 리스트 만들기'
                content.push(inputText('리스트 이름'))
                buttons.push(button('만들기' , buttons.length))
                break;
            
            case MODAL_SELECTOR.GETLIST : 
                title = '가져오기'
                break;
            
            case MODAL_SELECTOR.DOWNLOAD : 
                title = '다운로드'
                break;
            
            case MODAL_SELECTOR.UPLOAD : 
                title = '업로드'
                break;
            
            default :

                break;
        }

        return (
                <div className={cn('modal')}>
                    <div className={cn('modal-title')}>
                        <div className={cn('modal-title-text')}>{title}</div>
                        <div className={cn('modal-title-buttons')}>
                            <div>
                                <p>X</p>
                            </div>
                        </div>
                    </div>
                    <div className={cn('modal-content')}>
                        {content}
                    </div>
                    <div className={cn('modal-buttons')}>
                        {buttons}
                    </div>
                </div>
        )
    }
}