import React , { Component } from 'react'




import classNames from 'classnames/bind'
import style from './todaysLiveSettingView.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdminActions from '../../../ReduxModules/admin'
const cn = classNames.bind(style)


class TodaysLiveSettingView extends Component {

    fetchSetTodaysLive = () => {
        const musicId = this.props.chosenTodaysLive.get('_id')
        this.props.AdminActions.fetchSetTodaysLive({'adminKey' : this.props.adminKey , 'musicId' : musicId})
    }


    render () {
        return (
            <React.Fragment>
            <div className={cn('todayslive')}>
                <div className={cn('todayslive-img-wrap')}>
                    <div className={cn('todayslive-img')} style={{backgroundImage:`url('${this.props.chosenTodaysLive.getIn(['album' , 'albumImgUri'])}')`}}></div>
                </div>
                <div className={cn('todayslive-info')}>
                    <div>
                        <span>가수 : {this.props.chosenTodaysLive.getIn(['singer' , 'name'])}</span>
                    </div>
                    <div>
                        <span>노래 : {this.props.chosenTodaysLive.get('song')}</span>
                    </div>
                    <div>
                        <span>앨범 : {this.props.chosenTodaysLive.getIn(['album' , 'name'])}</span>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        adminKey : state.admin.adminKey,
        chosenTodaysLive : state.admin.chosenTodaysLive,
    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(TodaysLiveSettingView)