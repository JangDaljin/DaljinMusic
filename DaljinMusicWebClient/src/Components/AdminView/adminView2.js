import React , { Component } from 'react'

import ValidateAdminView from './ValidateAdminView/validateAdminView'
import TodaysLiveSettingView from './TodaysLive/todaysLiveSettingView'
import HotAndNewMusicSettingView from './HotAndNew/hotAndNewMusicSettingView'
import SearchTable from './SearchTable/searchTable'
import MusicManagerView from './MusicManager/musicManagerView'

import * as AdminActions from '../../ReduxModules/admin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import classNames from 'classnames/bind'
import style from './adminView2.css'
const cn = classNames.bind(style)


class AdminView extends Component {

    onClickMenu = (_menuMode) => {
        this.props.AdminActions.changeMenuMode(_menuMode)
    }

    onClickSave = () => {
        let finalProcess = false
        switch(this.props.menuMode) {
            case AdminActions.MENU_MODE.NOTTHING :
                window.alert('메뉴를 선택해주세요.')
            break;
            
            case AdminActions.MENU_MODE.TODAYSLIVE :
                finalProcess = true
            break;

            case AdminActions.MENU_MODE.HOTANDNEW :
                //검증
                let error = -1
                this.props.chosenHotAndNewMusics.forEach((value , index) => {
                    if(!(value.get('hot') || value.get('new'))) {
                        error = index
                        return false
                    }
                })
                if(error > -1) {
                    window.alert(`${error + 1}번째 설정 오류`)
                    finalProcess = false
                }
                else {
                    finalProcess = true
                }
            break;

            case AdminActions.MENU_MODE.NEWMUSIC:
                finalProcess = true
            break;

            default :

            break;
        }
        if(finalProcess) {
            this.props.AdminActions.fetchSave(this.props.adminKey)
            this.props.AdminActions.clearChooseItem()
        }
    }


    render () {
        return (
            
        <div className={cn('adminview')}>
            {!this.props.isAdmin ?

                <ValidateAdminView />

                :
                
                <React.Fragment>
                <div className={cn('left')}>
                    <div className={cn('left-header')}>
                        <div className={cn('left-header-menu')}>
                            <div className={cn({'menu-selected' : this.props.menuMode === AdminActions.MENU_MODE.TODAYSLIVE})} onClick={(e)=> { this.onClickMenu(AdminActions.MENU_MODE.TODAYSLIVE)}}>오늘의 라이브 설정</div>
                            <div className={cn({'menu-selected' : this.props.menuMode === AdminActions.MENU_MODE.HOTANDNEW})} onClick={(e)=> { this.onClickMenu(AdminActions.MENU_MODE.HOTANDNEW)}}>핫앤뉴 설정</div>
                            <div className={cn({'menu-selected' : this.props.menuMode === AdminActions.MENU_MODE.NEWMUSIC})} onClick={(e)=> { this.onClickMenu(AdminActions.MENU_MODE.NEWMUSIC)}}>새 음악 추가</div>
                        </div>
                        <div className={cn('left-header-buttons')} onClick={(e) => { this.onClickSave() }}>
                            <div className={cn('save-button' , 'far fa-save')}></div>
                        </div>
                    </div>

                    {this.props.menuMode === AdminActions.MENU_MODE.TODAYSLIVE &&
                        <TodaysLiveSettingView />
                    }

                    {this.props.menuMode === AdminActions.MENU_MODE.HOTANDNEW &&
                        <HotAndNewMusicSettingView />
                    }

                    {this.props.menuMode === AdminActions.MENU_MODE.NEWMUSIC &&
                    <div>
                        <MusicManagerView />
                    </div>
                    }
                </div>


                <div className={cn('right')}>
                    <SearchTable />
                </div>
                </React.Fragment>
            }

        </div>
            
        )
    }
}


export default connect(
    (state) => ({
        isAdmin : state.admin.isAdmin,
        adminKey : state.admin.adminKey,
        menuMode : state.admin.menuMode,
        chosenTodaysLive : state.admin.chosenTodaysLive,
        chosenHotAndNewMusics : state.admin.chosenHotAndNewMusics,
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(AdminView)