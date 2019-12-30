import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdminActions from '../../../ReduxModules/admin'

import classNames from 'classnames/bind'
import style from './musicManagerView.css'
const cn = classNames.bind(style)


class MusicManagerView extends Component {
    

    componentDidMount () {
        this.props.AdminActions.fetchGetCategories({'adminKey' : this.props.adminKey})
    }

    onClickFileLoadButton (e) {
        this.fileInput.click()
    }

    onFileLoad(e) {
        console.log(e)
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
                    <input type="file" ref={ref => this.fileInput = ref} hidden="hidden" accept="audio/*" multiple 
                    onChange={this.onFileLoad} />
                    <div className={cn('table-menu-item')}>
                        <i className="far fa-images"></i>
                        <span className={cn('table-menu-item-text')}>
                            이미지추가
                        </span>
                    </div>
                </div>
                <div className={cn('table-row')}>
                    <div className={cn('table-column' , 'tc1')}>
                        <input type="checkbox" />
                    </div>
                    <div className={cn('table-column' , 'tc2')}>
                        <input type="text" defaultValue="ASDFASDFASDF" />
                    </div>
                    <div className={cn('table-column' , 'tc3')}>
                        <input type="text" defaultValue="ZXCVZXCVZXCVZXCVZXCV" />
                    </div>
                    <div className={cn('table-column' , 'tc4')}>
                        <input type="text" defaultValue="LKJHLKJHLKJHLKJH" />
                    </div>
                    <div className={cn('table-column' , 'tc5')}>
                        <p>FILE SIZE</p>
                    </div>

                    <div className={cn('table-column' , 'tc6')}>
                        <select className={cn('category-select')}>
                            {
                                this.props.musicCategories.map(
                                    (value , index) => (
                                        <option key={index} value={value.getIn([index , '_id'])}>{value.getIn([index , 'name'])}</option>
                                    )
                                )
                            }
                        </select>
                        <div className={cn('musicmanager-button')}>
                            <i className={cn("fas fa-plus" , 'musicmanager-button-img')}></i>
                            <span className={cn('musicmanager-button-text')}>
                                추가
                            </span>
                        </div>


                    </div>

                    <div className={cn('table-column' , 'tc7')}>
                        <div className={cn('musicmanager-button')}>
                            <i className={cn("fas fa-trash" , 'musicmanager-button-img')}></i>
                            <span className={cn('musicmanager-button-text')}>
                                삭제
                            </span>
                        </div>
                    </div>

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
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(MusicManagerView)