import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { List  , fromJS } from 'immutable'

import * as myMusicActions from '../../ReduxModules/myMusic'
import * as modalActions from '../../ReduxModules/modal'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'



import classNames from 'classnames/bind'
import style from './myMusicView.css'
const cn = classNames.bind(style)

class MyMusicView extends Component {

    state = {
        currentSelectedListIndex :-1 ,
        checkedLists : List(),
    }


    componentDidUpdate(prevProps , prevState) {
        //로그인 확인 이후 처리
        if(prevProps.authMonitor && !this.props.authMonitor) {
            this.initState()
        }

        //음악 리스트 변경시 처리
        if(prevProps.myMusicLists !== this.props.myMusicLists ) {

            let list = List()

            for(let i = 0 ; i < this.props.myMusicLists.size; i++) {
                list = list.push(fromJS(Array(this.props.myMusicLists.getIn([i , 'list']).size).fill(false)))
            }
            this.setState({ checkedLists : list , currentSelectedListIndex : -1})
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
        const checkedLists = this.state.checkedLists.toJS()
        for(let i = 0 ; i < checkedLists.length ; i++) {
            if(i !== index) {
                checkedLists[i].fill(false)
            }
        }
        this.setState({ 'checkedLists' : this.state.checkedLists.clear().concat(fromJS(checkedLists)) , 'currentSelectedListIndex' : index})
    }

    checkListItem = (index) => {
        this.setState({ checkedLists : this.state.checkedLists.updateIn([this.state.currentSelectedListIndex , index] , value => !value )})
    }

    onClickAddList = () => {
        const title = '리스트 추가'
        const body = [] , buttons = []
        body.push(<input ref={ref=>this.newListName = ref} type="text" placeholder="이름" key={body.length} />)
        buttons.push(<div key={body.length} onClick={(e) => { this.props.MyMusicActions.fetchMakeMusicList({ userId : this.props.userId , listName : this.newListName.value }); this.props.ModalActions.modalClose()}}>추가</div>)
        this.props.ModalActions.modalSetContents({'title' : title, 'body' : body, 'buttons' : buttons})
        this.props.ModalActions.modalOpen()
    }

    onClickRemoveList = () => {
        const title = '리스트 삭제'
        const body = [] , buttons = []

        for(let i = 0 ; i < this.props.myMusicLists.size ; i++) {
            body.push(
            <div key={body.length} onClick={(e) => { 
                this.props.MyMusicActions.fetchDeleteMusicList({ 'userId' : this.props.userId , 'listId' : this.props.myMusicLists.getIn([i , '_id']) }); 
                this.props.ModalActions.modalClose()
            }}>
                    {this.props.myMusicLists.getIn([i , 'listName'])}
            </div>)
        }

        this.props.ModalActions.modalSetContents({'title' : title, 'body' : body, 'buttons' : buttons})
        this.props.ModalActions.modalOpen()
    }

    onClickRenameList = () => {
        const title = '리스트 수정'
        const body = [] , buttons = []

        for(let i = 0 ; i < this.props.myMusicLists.size ; i++) {
            body.push(
            <div key={body.length} onClick={(e) => { 
                this.props.ModalActions.modalClose()
                const secondBody = [] , secondButtons = []
                secondBody.push(<input ref={ref=>this.renameList = ref} type="text" placeholder={this.props.myMusicLists.getIn([i , 'listName'])} key={secondBody.length} />)
                secondButtons.push(<div key={body.length} onClick={(e) => { this.props.MyMusicActions.fetchRenameMusicList({'userId' : this.props.userId, 'listId' : this.props.myMusicLists.getIn([i , '_id']) , 'name' : this.renameList.value }); this.props.ModalActions.modalClose()}}>확인</div>)
                this.props.ModalActions.modalSetContents({'title' : title, 'body' : secondBody, 'buttons' : secondButtons})
                this.props.ModalActions.modalOpen()
            }}>
                    {this.props.myMusicLists.getIn([i , 'listName'])}
            </div>)
        }

        this.props.ModalActions.modalSetContents({'title' : title, 'body' : body, 'buttons' : buttons})
        this.props.ModalActions.modalOpen()
    }

    onClickMusicsPlay = () => {
        const checkedList = this.state.checkedLists.get(this.state.currentSelectedListIndex).toJS()
        const addList = []
        for(let i = 0 ; i < checkedList.length ; i++) {
            if(checkedList[i]) {
                addList.push(this.props.myMusicLists.getIn([this.state.currentSelectedListIndex , 'list' , i , '_id']))
            }
        }
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : addList})
    }

    onClickRemoveMusics = () => {
        const checkedList = this.state.checkedLists.get(this.state.currentSelectedListIndex).toJS()
        const indexes = []
        for(let i = 0 ; i < checkedList.length; i++) {
            if(checkedList[i]) {
                indexes.push(i)
            }
        }
        this.props.MyMusicActions.fetchRemoveMusicInList({'userId' : this.props.userId , 'listId' : this.props.myMusicLists.getIn([this.state.currentSelectedListIndex , '_id']) , 'indexes' : indexes})
    }

    render() {
        return (
            <div className={cn('mymusicview')}>
                <div className={cn('mymusicview-left')}>
                        <div className={cn('mymusicview-list-buttons')}>
                            <div onClick={(e) => { this.onClickAddList() }}><i className="fas fa-plus"></i></div>
                            <div onClick={(e) => { this.onClickRemoveList() }}><i className="fas fa-minus"></i></div>
                            <div onClick={(e) => { this.onClickRenameList() }}><i className="fas fa-pencil-alt"></i></div>
                        </div>

                        {
                            this.props.myMusicLists.map(
                                (value , index) => (
                                    <div className={cn('mymusicview-listname' , { 'selected-list' : this.state.currentSelectedListIndex === index})} key={index} onClick={(e) => { this.selectList(index) }}>
                                        <div className={cn('listname-left')}>
                                            {`${value.get('listName')}`}
                                        </div>
                                        <div className={cn('listname-right')}>
                                            {`${value.get('list').size}`}
                                        </div>
                                    </div>
                                )
                            )
                        }
                </div>

                
                
                <div className={cn('mymusicview-center')} ref={ref => this.center = ref}>

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

                <div className={cn('mymusicview-right')}>
                    <div className={cn('right-buttons')} onClick={(e) => {
                        this.onClickMusicsPlay()
                    }}>
                        <p><i className={cn('fas fa-play')}></i>&nbsp;재생</p>
                    </div> 

                    <div className={cn('right-buttons')} onClick={
                        (e) => {
                            this.onClickRemoveMusics()
                        }
                    }>
                        <p><i className={cn('fas fa-eraser')}>&nbsp;</i>삭제</p>
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
        MyMusicActions : bindActionCreators(myMusicActions , dispatch),
        ModalActions : bindActionCreators(modalActions , dispatch),
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch),
    })
)(withRouter(MyMusicView))