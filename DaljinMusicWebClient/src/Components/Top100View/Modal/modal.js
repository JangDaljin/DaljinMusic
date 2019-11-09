import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicActions from '../../../ReduxModules/myMusic'
import './modal.css'

class Top100Modal extends Component {
    

    componentDidMount () {
        this.props.MyMusicActions.fetchGetMyMusicLists({'userId' : this.props.userId})
    }

    render () {
        return ( 
            <div className="top100modal">
                <div className="modal-title">리스트 선택</div>
                <div className="modal-musiclists">
                {
                    this.props.myMusicLists.map((value , index) => 
                    (
                        <div className="modal-item" key={index}>{value.listName}</div>
                    ))
                    
                }
                </div>
                <div className="modal-item">
                    <i className='fas fa-plus'> 새 리스트 </i>
                </div>
            </div>
        )
    }
}


export default connect(
    (state) => ({
        userId : state.auth.userId,
        myMusicLists : state.myMusic.myMusicLists.toJS()
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicActions , dispatch)
    })
)(Top100Modal)