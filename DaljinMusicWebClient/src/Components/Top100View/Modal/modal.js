import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myMusicActions from '../../../ReduxModules/myMusic'
import './modal.css'

class Top100Modal extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            show : 1,

            makeListName : '',
        }
    }

    componentDidMount () {
        this.props.MyMusicActions.fetchGetMyMusicLists({'userId' : this.props.userId})
    }

    render () {
        return ( 
            <React.Fragment>
            {(this.state.show & 1) !== 0 &&
                <div className="top100modal">
                    <div className="modal-title">
                        <div className="text">리스트 선택</div>
                        <div className="button" onClick={(e) => {this.props.close()}}>X</div>
                    </div>
                    <div className="modal-musiclists">
                    {
                        this.props.myMusicLists.map((value , index) => 
                        (
                            <div className="modal-item" key={index} onClick={
                                (e) => {
                                    this.props.MyMusicActions.fetchAddMusicInList({ 'userId' : this.props.userId , 'listId' : this.props.myMusicLists.getIn([index , '_id']) , 'musicId' : this.props.selectedMusicId })
                                    this.props.close()
                                }
                            }>{value.get('listName')}</div>
                        ))
                        
                    }
                    </div>
                    <div className="modal-item" onClick={(e) => { this.setState({show : 2}) } }>
                        <i className='fas fa-plus'> 새 리스트 </i>
                    </div>
                </div>
            }

            {(this.state.show & 2) !== 0 &&
                <div className="top100modal">
                    <div className="newlistname">
                        <input type="text" placeholder="새 리스트 이름" onChange={(e)=> { this.setState({ makeListName : e.target.value })}} />
                        <span onClick={
                            (e) => {
                                if(this.state.makeListName.trim() !== '') {
                                    this.props.MyMusicActions.modalFetchMakeMusicList({ userId : this.props.userId , listName : this.state.makeListName.trim() })
                                    this.setState({makeListName : ''})
                                }
                                this.setState({ show : 1 })
                            }
                        }>
                            {this.state.makeListName.trim() === '' ? "취소" : "확인"}
                        </span>
                    </div>

                </div>
            }
            </React.Fragment>
        )
    }
}


export default connect(
    (state) => ({
        userId : state.auth.userId,
        myMusicLists : state.myMusic.myMusicLists
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicActions , dispatch)
    })
)(Top100Modal)