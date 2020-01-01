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
        changeTextBuffer : null, //텍스트 변경용 버퍼

        imageLoadIndex : -1, //개별 이미지 불러올때 저장용 인덱스
    }

    componentDidMount () {
        this.props.AdminActions.fetchGetCategories({'adminKey' : this.props.adminKey})
    }

    componentDidUpdate (prevProps , prevState) {
        if(prevState !== this.state) {

        }
    }

    onClickMusicFilesLoadButton = (e) => {
        this.musicFilesInput.click()
    }

    onMusicFilesLoad = (e) => {
        const newMusicData = []

        //수정 가능하게 복사
        const mutableFiles = []
        Array.prototype.push.apply(mutableFiles , e.target.files)

        for(const file of mutableFiles) {
            const fileName = file.name.substr(0 , file.name.lastIndexOf('.'))
            const fileExtention = file.name.substr(file.name.lastIndexOf('.')+1 , file.name.length)
            const splitFileName = fileName.split('-')



            const singer = (splitFileName[0] === null || splitFileName[0] ===  '' || splitFileName[0] === undefined)? '' : splitFileName[0].trim()
            const song = (splitFileName[1] === null || splitFileName[1] ===  '' || splitFileName[1] === undefined)? '' : splitFileName[1].trim()
            const album = (splitFileName[2] === null || splitFileName[2] ===  '' || splitFileName[2] === undefined)? '' : splitFileName[2].trim()

            newMusicData.push({
                'checked' : false,
                'musicFile' : file,
                'musicFileName' : fileName,
                'musicFileExtention' : fileExtention,
                'fileSize' : fileSizeChanger(file.size),
                'singer' : singer,
                'singerDatabaseId' : null,
                'song' : song,
                'album' : album,
                'albumDatabaseId' : null,
                'albumImgFile' : null,
                'withAlbumImg' : false,
                'category' : '',
                'validate' : false,
            })
        }
        this.props.AdminActions.setNewMusicData(this.props.newMusicData.concat(fromJS(newMusicData)))
    }

    onClickImageFilesLoadButton = (e) => {
        this.imageFilesInput.click()
    }

    onImageFilesLoad = (e) => {

        const mutableFiles = []
        Array.prototype.push.apply(mutableFiles , e.target.files)
    
        let newMusicData = List().concat(this.props.newMusicData)

        for(const file of mutableFiles) {

            const fileName = file.name.substr(0 , file.name.lastIndexOf('.'))
            //const fileExtention = file.name.substr(file.name.lastIndexOf('.')+1 , file.name.length)

            const findIndex = this.props.newMusicData.findIndex(value => (value.get('musicFileName') === fileName))
            
            if(findIndex !== -1) {
                newMusicData = newMusicData.setIn([findIndex , 'albumImgFile'] , file)
                .setIn([findIndex , 'withAlbumImg'] , true)
            }
        }

        this.props.AdminActions.setNewMusicData(newMusicData)
    }

    onClickImageFileLoadButton = (index) => {
        this.setState({'imageLoadIndex' : index})
        this.imageFileInput.click()
    }

    onImageFileLoad = (e) => {
        const mutableFile = e.target.files[0]
        this.props.AdminActions.setNewMusicData(
            this.props.newMusicData.setIn([this.state.imageLoadIndex , 'albumImgFile'] , mutableFile)
                                .setIn([this.state.imageLoadIndex , 'withAlbumImg'] , true)
        )
        this.setState({ 'imageLoadIndex' : -1 })
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

    onClickCheckbox = (index) => {
        this.props.AdminActions.setNewMusicData(this.props.newMusicData.updateIn([index , 'checked'] , value => !value))
    }

    onClickItemDelete = () => {
        this.props.AdminActions.setNewMusicData(this.props.newMusicData.filter(value => !value.get('checked')))
    }

    onChangeText = (e) => {
        this.setState({'changeTextBuffer' : e.target.value})
    }
    
    onSaveText = (e , index , field) => {
        if(e.key === 'Enter') {
            this.props.AdminActions.setNewMusicData(this.props.newMusicData.setIn([index , field] ,this.state.changeTextBuffer))
            e.currentTarget.blur();
        }
    }

    onBlurText = (e , index , field) => {
        e.target.value = this.props.newMusicData.getIn([index , field]);
        this.setState({'changeTextBuffer' : null});
    }

    onClickImageFileDelete = (index) => {
        this.props.AdminActions.setNewMusicData(this.props.newMusicData.setIn([index , 'albumImgFile'] , null).setIn([index , 'withAlbumImg'] , false))
    }

    onClickSave = () => {
        this.props.AdminActions.fetchMusicUpload({'adminKey' : this.props.adminKey , 'newMusicData' : this.props.newMusicData})
    }

    onChangeCategory = (index , category) => {
        this.props.AdminActions.setNewMusicData(this.props.newMusicData.setIn([index , 'category'] , category))
    }

    render () {
        return (
            <div className={cn('musicmanager')}>
                <div className={cn('table-menu')}>
                    <div className={cn('table-menu-item')} onClick={this.onClickMusicFilesLoadButton}>
                        <i className="fas fa-upload"></i>
                        <span className={cn('table-menu-item-text')}>
                            음악불러오기
                        </span>
                        

                    </div>



                    <div className={cn('table-menu-item')} onClick={this.onClickImageFilesLoadButton}>
                        <i className="far fa-images"></i>
                        <span className={cn('table-menu-item-text')}>
                            자동이미지추가
                        </span>

                    </div>

                    <div className={cn('table-menu-item')} onClick={e => { this.onClickAddCategory() }}>
                        <i className="fas fa-sitemap"></i>
                        <span className={cn('table-menu-item-text')}>
                            카테고리추가
                        </span>
                    </div>

                    <div className={cn('table-menu-item')} onClick={e => { this.onClickItemDelete() }}>
                        <i className="fas fa-trash"></i>
                        <span className={cn('table-menu-item-text')}>
                            선택삭제
                        </span>
                    </div>

                    <div className={cn('table-menu-item')} onClick={e => { this.onClickSave()  }}>
                        <i className="fas fa-save"></i>
                        <span className={cn('table-menu-item-text')}>
                            저장
                        </span>
                    </div>

                </div>

                {/* 파일인풋 모음 */}
                <div style={{display : 'none'}}>
                    {/*음악 불러오기*/}
                    <input type="file" ref={ref => this.musicFilesInput = ref} 
                        onChange={this.onMusicFilesLoad}
                        hidden="hidden" accept="audio/*" multiple />

                    {/*이미지 자동추가*/}
                    <input type="file" ref={ref => this.imageFilesInput = ref}
                        onChange={this.onImageFilesLoad}
                        hidden="hidden" accept="image/*" multiple />

                    {/*개별 이미지 추가*/}
                    <input type="file" ref={ref => this.imageFileInput = ref}
                        onChange={this.onImageFileLoad}
                        hidden="hidden" accept="image/*" />
                </div>

                <div className={cn('musicmanager-table')}>
                {
                    this.props.newMusicData.map(
                        (value , index) => (
                            <div key={value} className={cn('table-row' , {'table-row-odd' : index % 2 === 1} , {'table-row-even' : index % 2 === 0})}>
                                <div className={cn('table-column' , 'tc1')}>
                                    <input type="checkbox" checked={this.props.newMusicData.getIn([index , 'checked'])} onChange={e => this.onClickCheckbox(index)} />
                                </div>
                                <div className={cn('table-column' , 'tc2')}>
                                    <input type="text" defaultValue={value.get('singer')} 
                                    onChange={e => { this.onChangeText(e) }}
                                    onKeyPress={e => { this.onSaveText(e , index , 'singer') }}
                                    onBlur={e => { this.onBlurText(e , index , 'singer') }}
                                    />
                                    {value.get('singerDatabaseId') !== null &&
                                        <i className="fas fa-key"></i>
                                    }
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
                                    {value.get('albumDatabaseId') !== null &&
                                        <i className="fas fa-key"></i>
                                    }
                                </div>
                                <div className={cn('table-column' , 'tc5')}>
                                    <div>{value.get('fileSize')}</div>
                                </div>

                                <div className={cn('table-column' , 'tc6')}>
                                    <select className={cn('category-select')} value={value.get('category')} onChange={ e => this.onChangeCategory(index , e.target.value) }>
                                        <option></option>
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
                                        {value.get('withAlbumImg') ?
                                            <span className={cn('album-image-file-text')}>
                                                <p>{value.get('albumImgFile').name}</p>
                                                
                                                <i className={cn("far fa-times-circle" , "album-image-file-delete")} onClick={e => { this.onClickImageFileDelete(index) }}></i>
                                            </span>
                                            :
                                            <span className={cn('album-image-load-button')} onClick={e => this.onClickImageFileLoadButton(index)}>
                                                <i className="far fa-file-image fa-2x"></i>
                                            </span>
                                        }
                                        
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
        newMusicData : state.admin.newMusicData,
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch),
        ModalActions : bindActionCreators(ModalActions , dispatch),
    })
)(MusicManagerView)