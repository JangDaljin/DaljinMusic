import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdminActions from '../../../ReduxModules/admin'
import * as ModalActions from '../../../ReduxModules/modal'

import { List , fromJS } from 'immutable'

import classNames from 'classnames/bind'
import style from './musicManagerView.css'
const cn = classNames.bind(style)

const fileSizeChanger = (fileSize , offset = 0) => {
    if(fileSize > 1024) {
        return fileSizeChanger(fileSize/1024 , offset+1)
    }
    else {
        return `${fileSize.toFixed(2)}${ offset === 0 ? 'Byte' : offset === 1 ? 'KB' : offset === 2 ? 'MB' : offset === 3 ? 'GB' : 'TB' }`
    }
}

class MusicManagerView extends Component {
    
    state = {
        newMusicData : List(),
        changeTextBuffer : null,
    }

    componentDidMount () {
        this.props.AdminActions.fetchGetCategories({'adminKey' : this.props.adminKey})
    }

    componentDidUpdate (prevProps , prevState) {
        if(prevState !== this.state) {

        }
    }

    onClickFileLoadButton = (e) => {
        this.fileInput.click()
    }

    onFileLoad = (e) => {
        const newMusicData = []

        //수정 가능하게 복사
        const mutableFiles = []
        Array.prototype.push.apply(mutableFiles , e.target.files)

        for(const file of mutableFiles) {
            const splitFileName = file.name.substr(0 , file.name.lastIndexOf('.')).split('-')

            const singer = (splitFileName[0] === null || splitFileName[0] ===  '' || splitFileName[0] === undefined)? '' : splitFileName[0].trim()
            const song = (splitFileName[1] === null || splitFileName[1] ===  '' || splitFileName[1] === undefined)? '' : splitFileName[1].trim()
            const album = (splitFileName[2] === null || splitFileName[2] ===  '' || splitFileName[2] === undefined)? '' : splitFileName[2].trim()

            newMusicData.push({
                'checked' : false,
                'musicFile' : file,
                'fileSize' : fileSizeChanger(file.size),
                'singer' : singer,
                'song' : song,
                'album' : album,
                'albumImg' : null,
                'withAlbumImg' : false,
                'albumImgIndex' : -1,
                'categories' : []
            })
        }
        this.setState({'newMusicData' : this.state.newMusicData.concat(fromJS(newMusicData))})
    }


    onClickAddCategory = () => {
        const modalTitle = '카테고리 추가'
        const modalBody = [<input type="text" ref={ref => this.newCategoryNameInput = ref} key={1} placeholder="새 카테고리 이름" />]
        const modalButtons = [<div key={1} onClick={e => {this.onAddCategory(this.newCategoryNameInput.value)} }>추가</div>]
        this.props.ModalActions.modalSetContents({'title' : modalTitle , 'body' :  modalBody, 'buttons' : modalButtons})
        this.props.ModalActions.modalOpen()
    }

    onAddCategory = (newCategoryName) => {
        this.props.AdminActions.fetchAddCategory({'adminKey' : this.props.adminKey , 'newCategoryName' : newCategoryName})
        this.props.ModalActions.modalClose()
    }

    onClickItemDelete = (index) => {
        this.setState({'newMusicData' : this.state.newMusicData.splice(index , 1)})
    }

    onChangeText = (e) => {
        this.setState({'changeTextBuffer' : e.target.value})
    }
    
    onSaveText = (e , index , field) => {
        if(e.key === 'Enter') {
            this.setState({'newMusicData' : this.state.newMusicData.setIn([index , field] ,this.state.changeTextBuffer)}); 
            e.currentTarget.blur();
        }
    }

    onBlurText = (e , index , field) => {
        e.target.value = this.state.newMusicData.getIn([index , field]);
        this.setState({'changeTextBuffer' : null});
    }

    render () {
        return (
            <div className={cn('musicmanager')}>
                <div className={cn('table-menu')}>
                    <div className={cn('table-menu-item')} onClick={this.onClickFileLoadButton}>
                        <i className="fas fa-upload"></i>
                        <span className={cn('table-menu-item-text')}>
                            불러오기
                        </span>
                        
                        
                    </div>

                    <input type="file" ref={ref => this.fileInput = ref} 
                    onChange={this.onFileLoad}
                    hidden="hidden" accept="audio/*" multiple />

                    <div className={cn('table-menu-item')}>
                        <i className="far fa-images"></i>
                        <span className={cn('table-menu-item-text')}>
                            이미지추가
                        </span>
                    </div>

                    <div className={cn('table-menu-item')} onClick={e => { this.onClickAddCategory() }}>
                        <i className="fas fa-sitemap"></i>
                        <span className={cn('table-menu-item-text')}>
                            카테고리추가
                        </span>
                    </div>

                </div>
                <div className={cn('musicmanager-table')}>
                {
                    this.state.newMusicData.map(
                        (value , index) => (
                            <div key={value} className={cn('table-row' , {'table-row-odd' : index % 2 === 1} , {'table-row-even' : index % 2 === 0})}>
                                <div className={cn('table-column' , 'tc1')}>
                                    <input type="checkbox" />
                                </div>
                                <div className={cn('table-column' , 'tc2')}>
                                    <input type="text" defaultValue={value.get('singer')} 
                                    onChange={e => { this.onChangeText(e) }}
                                    onKeyPress={e => { this.onSaveText(e , index , 'singer') }}
                                    onBlur={e => { this.onBlurText(e , index , 'singer') }}
                                    />
                                </div>
                                <div className={cn('table-column' , 'tc3')}>
                                    <input type="text" defaultValue={value.get('song')} 
                                    onChange={e => { this.onChangeText(e) }}
                                    onKeyPress={e => { this.onSaveText(e , index , 'song') }}
                                    onBlur={e => { this.onBlurText(e , index , 'song') }}
                                    />
                                </div>
                                <div className={cn('table-column' , 'tc4')}>
                                    <input type="text" defaultValue={value.get('album')} 
                                    onChange={e => { this.onChangeText(e) }}
                                    onKeyPress={e => { this.onSaveText(e , index , 'album') }}
                                    onBlur={e => { this.onBlurText(e , index , 'album') }}
                                    />
                                </div>
                                <div className={cn('table-column' , 'tc5')}>
                                    <div>{value.get('fileSize')}</div>
                                </div>

                                <div className={cn('table-column' , 'tc6')}>
                                    <select className={cn('category-select')}>
                                        {
                                            this.props.musicCategories.map(
                                                (categoryValue , categoryIndex) => (
                                                    <option key={categoryIndex} value={categoryValue.get('_id')}>{categoryValue.get('name')}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>

                                <div className={cn('table-column' , 'tc7')}>
                                    <div className={cn('musicmanager-button')} onClick={e => { this.onClickItemDelete(index) }}>
                                        <i className={cn("fas fa-trash" , 'musicmanager-button-img')}></i>
                                        <span className={cn('musicmanager-button-text')}>
                                            삭제
                                        </span>
                                    </div>
                                </div>

                            </div>
                        )
                    )
                }
                </div>

            </div>
        )
    }
}

export default connect(
    (state) => ({
        adminKey : state.admin.adminKey,
        musicCategories : state.admin.musicCategories,
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch)
    })
)(MusicManagerView)