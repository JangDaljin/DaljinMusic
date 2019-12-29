import React , { Component } from 'react'


import classNames from 'classnames/bind'
import style from './hotAndNewMusicSettingView.css'
import * as AdminActions from '../../../ReduxModules/admin'
import * as HotAndNewActions from '../../../ReduxModules/hotAndNewMusic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const cn = classNames.bind(style)



class HotAndNewMusicSettingView extends Component {


    componentDidMount() {
        this.props.HotAndNewActions.fetchHotAndNew()
    }

    componentDidUpdate(prevProps , prevState) {
        //다시 데이터 불러오기
        if(!prevProps.reRender && this.props.reRender) {
            this.props.HotAndNewActions.fetchHotAndNew()
            this.props.AdminActions.reRenderEnd()
        }
    }

    fetchSetHotAndNew = () => {
        const list = this.props.chosenHotAndNewMusics.map(value => ({'hot' : value.get('hot') , 'new' : value.get('new') , 'musicId' : value.getIn(['music' , '_id'])})).toJS()
        for(let i = 0 ; i < list.length; i++) {
            if(!list[i].hot && !list[i].new) {
                window.alert(`${i+1}번째 HOT/NEW/BOTH 선택 안됨`)
                return
            }
        }
        this.props.AdminActions.fetchSetHotAndNew({'adminKey' : this.props.adminKey , 'list' : list})
    }

    onSelectHotAndNew = (index , value) => {
        let hotValue = false
        let newValue = false

        if(value === 'HOT') {
            hotValue = true
        }
        else if(value === 'NEW') {
            newValue = true
        }
        else if(value === 'BOTH') {
            hotValue = true
            newValue = true
        }
        
        this.props.AdminActions.setHotAndNewMusic({'index' : index , 'hotValue' : hotValue , 'newValue' : newValue})
    }

    onSavedDeleteHotAndNew = (index) => {
        this.props.AdminActions.fetchDeleteSavedHotAndNew({'index' : index , 'adminKey' : this.props.adminKey })
    }

    onChosenDeletHotAndNew = (index) => {
        this.props.AdminActions.deleteChosenHotAndNewMusic(index)
    }


    render () {
        return (
            <div className={cn('hotandnew')}>
                <div className={cn('current-hotandnew')}>
                    <p className={cn('header-text')}>
                        저장목록
                    </p>
                    {
                        this.props.currentHotAndNewMusics.map(
                            (value , index) => (
                                <div key={index} className={cn('hotandnew-item')}>
                                    <div className={cn('hotandnew-album-img-wrap')}>
                                        <div className={cn('hotandnew-album-img')} style={{backgroundImage:`url('${value.getIn(['music' , 'album' , 'albumImgUri'])}')`}}></div>
                                    </div>

                                    <div className={cn('hotandnew-info')}>
                                            <div>제목 : {value.getIn(['music' ,'song'])}</div>
                                            <div>가수 : {value.getIn(['music' , 'singer' , 'name'])}</div>
                                            <div>앨범 : {value.getIn(['music' , 'album' , 'name'])}</div>
                                    </div>
                                    
                                    <div className={cn('hotandnew-menu')}>
                                        <select defaultValue={value.get('hot') & value.get('new') ? 'BOTH' : value.get('hot') ? 'HOT' : value.get('new') ? 'NEW' : ''} onChange={(e) => {this.onSelectHotAndNew(index , e.target.value)}}>
                                            <option value="">선택</option>
                                            <option value="HOT">HOT</option>
                                            <option value="NEW">NEW</option>
                                            <option value="BOTH">BOTH</option>
                                        </select>

                                        <div className={cn('hotandnew-delete')} onClick={e => { this.onSavedDeleteHotAndNew(index) }}>
                                            X
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>

                <div className={cn('chosen-hotandnew')}>
                    <p className={cn('header-text')}>
                        현재목록
                    </p>
                {
                    this.props.chosenHotAndNewMusics.map(
                        (value , index) => (
                            <div key={index} className={cn('hotandnew-item')}>

                                <div className={cn('hotandnew-album-img-wrap')}>
                                    <div className={cn('hotandnew-album-img')} style={{backgroundImage:`url('${value.getIn(['music' , 'album' , 'albumImgUri'])}')`}}></div>
                                </div>

                                <div className={cn('hotandnew-info')}>
                                        <div>제목 : {value.getIn(['music' ,'song'])}</div>
                                        <div>가수 : {value.getIn(['music' , 'singer' , 'name'])}</div>
                                        <div>앨범 : {value.getIn(['music' , 'album' , 'name'])}</div>
                                </div>
                                
                                <div className={cn('hotandnew-menu')}>
                                    <select onChange={(e) => {this.onSelectHotAndNew(index , e.target.value)}}>
                                        <option value="">선택</option>
                                        <option value="HOT">HOT</option>
                                        <option value="NEW">NEW</option>
                                        <option value="BOTH">BOTH</option>
                                    </select>

                                    <div className={cn('hotandnew-delete')} onClick={e => { this.onChosenDeletHotAndNew(index) }}>
                                        X
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
        chosenHotAndNewMusics : state.admin.chosenHotAndNewMusics,
        currentHotAndNewMusics : state.hotAndNew.list,
        reRender : state.admin.reRender,
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch),
        HotAndNewActions : bindActionCreators(HotAndNewActions , dispatch),
    })
)(HotAndNewMusicSettingView)