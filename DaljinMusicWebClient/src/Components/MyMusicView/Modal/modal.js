import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicActions from '../../../ReduxModules/myMusic'

import classNames from 'classnames/bind'
import styles from './modal.css'
const cn = classNames.bind(styles)

export const MODAL_SELECTOR = {
    DELETE : 1,
    MAKELIST : 2,
    GETLIST : 4,
    LIST_DELETE : 8,
};

const button = (value , key , _onClick = () => {}) => (
    <div className={cn('mymusic-modal-button')} key={`button${key}`} onClick={(e) => { _onClick(e); }}>
        <p>{value}</p>
    </div>
)

const text = (value , key) => (
    <div className={cn('mymusic-modal-text')} key={`text${key}`}>
        <p>{value}</p>
    </div>
)

const inputText = (placeholder , key , _onChange = () => {}) => (
    <div className={cn('mymusic-modal-inputtext')} key={`inputtext${key}`}>
        <input type='text' placeholder={placeholder} onChange={_onChange} />
    </div>
)

class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fileList : [],
            makeListName : '',
            selectedListId : -1,
        }
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            this.setState({
                fileList : [],
                makeListName : '',
                selectedListId : -1,
            })
        }
    }
    
    render () {
        let title = null;
        let content = [];
        let buttons = [];
        switch(this.props.mode) {
            case MODAL_SELECTOR.DELETE : 
                title = '삭제'
                content.push(text('정말 삭제하시겠습니까?' , content.length))
                buttons.push(button('네' , buttons.length))
                break;
            
            case MODAL_SELECTOR.MAKELIST : 
                title = '새 리스트 만들기'
                content.push(inputText('리스트 이름' , content.length , (e) => { this.setState({makeListName : e.target.value})}))
                buttons.push(button('만들기' , buttons.length , () => { this.props.MyMusicActions.modalFetchMakeMusicList({ userId : this.props.userId , listName : this.state.makeListName }); this.props.onToggleModal(); } ))
                break;
            
            case MODAL_SELECTOR.GETLIST : 
                title = '가져오기'
                content.push(inputText('아이디' , content.length))
                content.push(inputText('리스트이름' , content.length))
                buttons.push(button('가져오기' , buttons.length))
                break;

            case MODAL_SELECTOR.LIST_DELETE :
                title = '리스트 삭제'
                content.push(text('정말로 삭제하시겠습니까?' , content.length))
                buttons.push(button('네' , buttons.length , () => {this.props.MyMusicActions.modalFetchDeleteMusicList({ 'userId' : this.props.userId , 'listId' : this.props.modeParam }); this.props.onToggleModal(); }))
                break;
            default :

                break;
        }

        return (
                <div className={cn('mymusic-modal')}>
                    <div className={cn('title')}>
                        <div className={cn('title-text')}>{title}</div>
                        <div className={cn('title-buttons')} onClick={() => { this.props.onToggleModal() }}>
                            <div>
                                <p>X</p>
                            </div>
                        </div>
                    </div>
                    <div className={cn('content')}>
                        {content}
                    </div>
                    <div className={cn('buttons')}>
                        {buttons}
                    </div>
                </div>
        )
    }
}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists,
        uploadProgress : state.myMusic.uploadProgress,
        userId : state.auth.userId
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicActions , dispatch)
    })
)(Modal)