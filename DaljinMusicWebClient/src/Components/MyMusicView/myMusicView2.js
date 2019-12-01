import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { List  , fromJS } from 'immutable'
import * as myMusicAction from '../../ReduxModules/myMusic'
import classNames from 'classnames/bind'
import style from './myMusicView2.css'
const cn = classNames.bind(style)

class MyMusicView2 extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        currentSelectedListIndex :-1 ,
        checkedLists : []
    }


    componentDidUpdate(prevProps , prevState) {
        if(prevProps.authMonitor && !this.props.authMonitor) {
            this.initState()
        }

        if(prevProps.myMusicLists !== this.props.myMusicLists ) {
            let list = List()

            for(let i = 0 ; i < this.props.myMusicLists.size; i++) {
                list = list.push(fromJS(Array(this.props.myMusicLists.getIn([i , 'list']).size).fill(false)))
            }
            this.setState({ checkedLists : list })
        }
    }

    componentDidMount () {
        if(!this.props.authMonitor) {
            this.initState()
        }

    }

    initState = () => {
        if(this.props.isAuthenticated) {
            this.props.MyMusicActions.fetchGetMyMusicLists({userId : this.props.userId})
        }
        else {
            this.props.history.push('/auth')
        }
    }

    selectList = (index) => {
        this.setState({ currentSelectedListIndex : index})
    }

    checkListItem = (index) => {
        this.setState({ checkedLists : this.state.checkedLists.updateIn([this.state.currentSelectedListIndex , index] , value => !value )})
    }

    render() {
        return (
            <div className={cn('mymusicview')}>
                <div className={cn('mymusicview-left')}>
                        <div className={cn('mymusicview-list-buttons')}>
                            <div><i className="fas fa-plus"></i></div>
                            <div><i className="fas fa-minus"></i></div>
                            <div><i className="fas fa-pencil-alt"></i></div>
                        </div>

                        {
                            this.props.myMusicLists.map(
                                (value , index) => (
                                    <div className={cn('mymusicview-listname' , { 'selected-list' : this.state.currentSelectedListIndex === index})} key={index} onClick={(e) => { this.selectList(index) }}>
                                        <div className={cn('listname-left')}>
                                            {`${value.get('listName')}(${value.get('list').size})`}
                                        </div>
                                        <div className={cn('listname-right')}>
                                            {this.props.myMusicLists.getIn([index , 'checked'])?
                                                <i className="far fa-check-circle" onClick={(e) => { e.stopPropagation(); this.props.MyMusicActions.checkList(index) }}></i>
                                                :
                                                <i className="far fa-circle" onClick={(e) => { e.stopPropagation(); this.props.MyMusicActions.checkList(index) }}></i>
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        }
                </div>

                
                
                <div className={cn('mymusicview-center')} ref={ref => this.center = ref}>
                    <div className={cn('mymusicview-center-contents-wrap')}>
                        {this.state.currentSelectedListIndex === -1 ? <div></div> :
                        this.props.myMusicLists.getIn([this.state.currentSelectedListIndex , 'list']).size > 0?
                            <React.Fragment>
                            <div className={cn('selected-musiclist')}>
                            {
                                this.props.myMusicLists.getIn([this.state.currentSelectedListIndex , 'list']).map(
                                    (value , index) => (

                                        <div key={index} className={cn('selected-musiclist-item' , 
                                        { 'check-item' : this.state.checkedLists.getIn([this.state.currentSelectedListIndex , index]) },
                                        { 'uncheck-item' : !this.state.checkedLists.getIn([this.state.currentSelectedListIndex , index]) }
                                        )} 
                                        onClick={(e) => { this.checkListItem(index) }}>

                                            <div className={cn('selected-musiclist-img-wrap')}>
                                                <div className={cn('selected-musiclist-img')} style={{backgroundImage : `url('${value.getIn(['album' , 'albumImgUri'])}')`}}>

                                                </div>
                                            </div>
                                            <div className={cn('selected-musiclist-info')}>
                                                <div className={cn('selected-musiclist-info-song')}>
                                                    {value.get('song')}
                                                </div>
                                                <div className={cn('selected-musiclist-info-singer')}>
                                                    {value.getIn(['singer' , 'name'])}
                                                </div>
                                                <div className={cn('selected-musiclist-info-album')}>
                                                    {value.getIn(['album' , 'name'])}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                            </div>
                            </React.Fragment>
                            :
                            <div className={cn('musiclist-no-item')}>
                            <p><i className="fas fa-exclamation-circle fa-2x"></i></p>
                            <p> 자료가 존재하지 않습니다.</p>
                            </div>
                        }
                    </div>
                
                </div>

                <div className={cn('mymusicview-right')}>
                    <div className={cn('right-buttons')}>
                        <p><i className={cn('fas fa-play')}></i>&nbsp;재생</p>
                    </div> 

                    <div className={cn('right-buttons')}>
                        <p><i className={cn('fas fa-eraser')}>&nbsp;</i>삭제</p>
                    </div>

                    <div className={cn('right-buttons')}>
                        <p><i className={cn('fas fa-stream')}></i>&nbsp;가져오기</p>
                    </div> 

                    <div className={cn('right-buttons')}>
                        <p><i className={cn('fas fa-cloud-download-alt')}></i>&nbsp;다운로드</p>
                    </div>
                </div>
            </div>
        )
    }


}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists,
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        authMonitor : state.auth.monitor,
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(withRouter(MyMusicView2))