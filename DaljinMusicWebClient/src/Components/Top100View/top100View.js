import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as top100Actions from '../../ReduxModules/top100'
import * as myMusicActions from '../../ReduxModules/myMusic'
import Modal from './Modal/modal'


import classNames from 'classnames/bind'
import styles from './top100View.css'
const cn = classNames.bind(styles)

class Top100ViewBody extends Component {


    state = {
        showModal : false,
        selectedMusicId : '',
    }


    componentDidMount () {
        
        this.getMoreItem(1 , 10);
        window.addEventListener('scroll' , () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight ,document.body.scrollHeight);
            let scrollTop = Math.max(document.documentElement.scrollTop ,document.body.scrollTop);
            let clientHeight = document.documentElement.clientHeight;
            if(parseInt(scrollTop+clientHeight) === parseInt(scrollHeight)) {
                this.getMoreItem(this.props.items.length+1 , this.props.items.length+10)
            }
        } , true)
    }

    getMoreItem = (from , to) => {
        this.props.Top100Actions.fetchTop100({'from' : from  , 'to' : to})
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
                                    <p>{value.rank}</p>
                                </div>
                                <div className={cn('top100-list-item-img')}>
                                    <div className={cn('top100-list-item-album-img')} style={{backgroundImage:`url('${value.albumImgUri}')`}}>

                                    </div>
                                </div>

                                <div className={cn('top100-list-item-info')}>
                                    <div className={cn('top100-list-item-song')}>
                                        <p>{value.song}</p>
                                    </div>
                                    <div className={cn('top100-list-item-singer')}>
                                        <p>{value.singer}</p>
                                    </div>
                                    <div className={cn('top100-list-item-album')}>
                                        <p>{value.album}</p>
                                    </div>
                                </div>
                                
                                <div className={cn('top100-list-item-buttons')}>
                                        <div className={cn('top100-list-item-play' , 'top100-list-button')}><i className={cn('fas fa-play' ,'fa-2x')}></i></div>
                                        <div className={cn('top100-list-item-add' , 'top100-list-button')} 
                                        onClick={
                                            (e) => {
                                                this.setState({ showModal : true , selectedMusicId : ''})
                                            }
                                        }><i className={cn('fas fa-plus' , 'fa-2x')}></i></div>
                                        <div className={cn('top100-list-item-list' , 'top100-list-button')}><i className={cn('fas fa-list' , 'fa-2x')}></i></div>
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
        items : state.top100.items.toJS()
    }),
    (dispatch) => ({
        Top100Actions : bindActionCreators(top100Actions , dispatch),
        MyMusicActions : bindActionCreators(myMusicActions , dispatch)
    })
)(Top100ViewBody)