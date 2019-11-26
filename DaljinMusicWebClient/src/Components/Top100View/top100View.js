import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as top100Actions from '../../ReduxModules/top100'
import * as myMusicActions from '../../ReduxModules/myMusic'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import Modal from './Modal/modal'
import { AuthConfirm } from '../common'
import { withRouter } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './top100View.css'
const cn = classNames.bind(styles)

class Top100ViewBody extends Component {


    state = {
        showModal : false,
        selectedMusicId : '',
    }

    handleScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight ,document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop ,document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if(parseInt(scrollTop+clientHeight) === parseInt(scrollHeight)) {
            this.props.Top100Actions.fetchTop100({'from' : this.props.items.size+1  , 'to' : this.props.items.size+10})
        }
    }

    componentDidMount () {
        this.props.Top100Actions.fetchTop100({'from' : 1  , 'to' : 10 , 'init' : true})
        window.addEventListener('scroll' , this.handleScroll , true)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll' , this.handleScroll , true)
    }

    addMusicPlayer = (index) => {
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : [this.props.items.getIn([index , '_id'])]})
    }

    play = (index) => {
        this.addMusicPlayer(index)
        this.props.MusicPlayerActions.fetchPlayMusic({'_id' : this.props.items.getIn([index , '_id'])})
    }

    render () {
        return (
            <React.Fragment>
            <div className={cn('top100')}>
                <div className={cn('top100-left')}>
                    {
                        this.props.items.map((value , index) => (
                            <div key={index} className={cn('top100-list-item')}>
                                <div className={cn('top100-list-item-ranking')}>
                                    <p>{value.get('rank')}</p>
                                </div>
                                <div className={cn('top100-list-item-img')}>

                                    <div className={cn('top100-list-item-album-img')} 
                                    style={
                                        {
                                            backgroundImage : `url('${process.env.REACT_APP_SERVER}${value.getIn(['album' , 'albumImgUri'])}')`
                                        }}>

                                    </div>
                                </div>

                                <div className={cn('top100-list-item-info')}>
                                    <div className={cn('top100-list-item-song')}>
                                        <p>{value.get('song')}</p>
                                    </div>
                                    <div className={cn('top100-list-item-singer')}>
                                        <p>{value.getIn(['singer' , 'name'])}</p>
                                    </div>
                                    <div className={cn('top100-list-item-album')}>
                                        <p>{value.getIn(['album' , 'name'])}</p>
                                    </div>
                                </div>
                                
                                <div className={cn('top100-list-item-buttons')}>
                                        <div className={cn('top100-list-item-play' , 'top100-list-button')} onClick={
                                            (e) => {
                                                this.play(index)
                                            }
                                        }><i className={cn('fas fa-play' ,'fa-2x')}></i></div>
                                        <div className={cn('top100-list-item-add' , 'top100-list-button')} onClick={
                                            (e) => {
                                                this.addMusicPlayer(index)
                                            }
                                        }><i className={cn('fas fa-plus' , 'fa-2x')}></i></div>
                                        <div className={cn('top100-list-item-list' , 'top100-list-button')} onClick={
                                            (e) => {
                                                if(this.props.isAuthenticated) {
                                                    this.setState({ showModal : true , selectedMusicId : this.props.items.getIn([index , '_id'])})
                                                }
                                                else {
                                                    if(AuthConfirm()) {
                                                        this.props.history.push('/auth')
                                                    }
                                                }
                                            }
                                        }><i className={cn('fas fa-list' , 'fa-2x')}></i></div>
                                </div>

                            </div>
                        ))
                        
                    }
                </div>


            </div>
            {this.state.showModal &&
                <Modal selectedMusicId={this.state.selectedMusicId} close={() => { this.setState({ showModal : false }) } }/>
            }
            
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        items : state.top100.items,
        isAuthenticated : state.auth.isAuthenticated,
    }),
    (dispatch) => ({
        Top100Actions : bindActionCreators(top100Actions , dispatch),
        MyMusicActions : bindActionCreators(myMusicActions , dispatch),
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch)

    })
)(withRouter(Top100ViewBody))