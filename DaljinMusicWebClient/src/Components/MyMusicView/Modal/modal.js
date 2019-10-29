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
    UPLOAD : 8,
    LIST_DELETE : 16,
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

const inputFileFinder = (onFileChange , key) => (
    <div className={cn('mymusic-modal-inputfile' , 'mymusic-modal-button')} key={`inputFileFinder${key}`}>
        <input type='file' id='fileupload' className={cn('mymusic-upload-button')} onChange={onFileChange} accept='audio/*' multiple/>
        <label htmlFor='fileupload' className={cn('mymusic-upload-label')}><p>찾아보기</p></label>
    </div>
)

const uploadList = (uploadItems = [] , key) => (
    <div className={cn('mymusic-modal-uploadlist')} key={`uploadList${key}`}>
        {uploadItems}
    </div>
)

const uploadListItem = (item, key , onClickDelete) => (
    <div className={cn('mymusic-modal-uploadlist-item')} key={`uploadListItem${key}`}>
        <div className={cn('mymusic-modal-uploadlist-item-first')}>
            <p>{item.name}</p>
        </div>
        <div className={cn('mymusic-modal-uploadlist-item-second')}>
            <p>{fileSizeChanger(item.size)}</p>
        </div>
        <div className={cn('mymusic-modal-uploadlist-item-third')}>
            <p onClick={onClickDelete}>X</p>
        </div>
    </div>
)

const listSelector = (lists = [] , key , onSelect = () => {}) => {
    let defaultValue = 'DEFAULT'
    for(const list of lists) {
        if(list.selected === true) {
            defaultValue = list._id
            break;
        }
    }
    return (
    <div className={cn('mymusic-modal-selector')} key={key}>
        <select value={defaultValue} onChange={onSelect}>
            <option value="DEFAULT" disabled>리스트선택</option>
            {
                lists.map( (value , index) => (
                    <option key={`${key}_${index}`} value={value._id}>{value.listName}</option>
                ))
            }
        </select>
    </div>
    )
}

const fileSizeChanger = (size , offset = 0) => {
    if(size > 1024) {
        return fileSizeChanger(size / 1024 , offset + 1)
    }
    else {
        return `${size.toFixed(2)}${
                        offset === 0 ? 'Byte' : 
                        offset === 1 ? 'KB' :
                        offset === 2 ? 'MB' :
                        offset === 3 ? 'GB' :
                        'TB'}`
    }
}

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

            case MODAL_SELECTOR.UPLOAD : 
                title = '업로드'
                content.push(listSelector(this.props.listNames , content.length , (e) => { this.setState({selectedListId : e.target.value}) }))
                content.push(
                    uploadList(
                        this.state.fileList.map(
                            (value , index ) => (
                                uploadListItem(value , index , 
                                    () => {
                                        const newState = { ...this.state };
                                        newState.fileList.splice(index , 1);
                                        this.setState(newState)
                                    }
                                )
                            )
                        ), content.length
                    )
                )

                buttons.push(
                    inputFileFinder(
                        (e) => {
                            const newFileList = [];
                            Array.prototype.push.apply(newFileList , e.target.files);
                            this.setState({fileList : newFileList})
                        }, 
                        content.length)
                    )
                buttons.push(
                    button('완료',
                        buttons.length,
                        () => { 
                            this.props.MyMusicActions.modalFetchUploadFile({ 'userId' : this.props.userId , 'fileList' : this.state.fileList , 'listId' : this.state.selectedListId })
                        }
                    )
                )
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
                <div className={cn('modal')}>
                    <div className={cn('modal-title')}>
                        <div className={cn('modal-title-text')}>{title}</div>
                        <div className={cn('modal-title-buttons')} onClick={() => { this.props.onToggleModal() }}>
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

export default connect(
    (state) => ({
        uploadProgress : state.myMusic.uploadProgress,
        userId : state.auth.userId
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicActions , dispatch)
    })
)(Modal)