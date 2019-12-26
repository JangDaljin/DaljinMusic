import React , { Component } from 'react'

import ValidateAdminView from './ValidateAdminView/validateAdminView'
import TodaysLiveSettingView from './TodaysLive/todaysLiveSettingView'
import HotAndNewMusicSettingView from './HotAndNew/hotAndNewMusicSettingView'
import SearchTable from './SearchTable/searchTable'

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
        this.props.AdminActions.fetchSave(this.props.adminKey)
    }

<<<<<<< HEAD
=======
    fetchSetTodaysLive = () => {
        const musicId = this.state.todayslive.get('_id')
        this.props.AdminActions.fetchSetTodaysLive({'adminKey' : this.props.adminKey , 'musicId' : musicId})
    }

    fetchSetHotAndNew = () => {
        const list = this.state.hotandnew.map(value => ({'hot' : value.get('hot') , 'new' : value.get('new') , 'musicId' : value.getIn(['music' , '_id'])})).toJS()
        for(let i = 0 ; i < list.length; i++) {
            if(!list[i].hot && !list[i].new) {
                window.alert(`${i+1}번째 HOT/NEW/BOTH 선택 안됨`)
                return
            }
        }
        this.props.AdminActions.fetchSetHotAndNew({'adminKey' : this.props.adminKey , 'list' : list})
    }
>>>>>>> dc31ca52ed49bd437c290b12b53199d30bbc7abc

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
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(AdminView)