import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Top100Actions from '../../../ReduxModules/top100'
import * as MyMusicActions from '../../../ReduxModules/myMusic'
import * as MusicPlayerActions from '../../../ReduxModules/musicPlayer'
import classNames from 'classnames/bind'
import styles from './TopTenMusic.css'
const cn = classNames.bind(styles)

class TopTenMusic extends Component {

    componentDidMount() {
        this.props.top100Actions.fetchTop100({ from : 1 , to :  10 , init : true})
    }

    addMusicPlayer = (index) => {
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : [this.props.top10.getIn([index , '_id'])]})
    }

    play = (index) => {
        this.addMusicPlayer(index)
        this.props.MusicPlayerActions.fetchPlayMusic({'_id' : this.props.top10.getIn([index , '_id'])})
    }

    render () {
        return (
            <div className={cn('toptenmusic')}>

                <div className={cn('toptenmusic-title')}>
                    <p><i className="fas fa-fire" style={{color:'#F42'}}></i>&nbsp;실시간 차트&nbsp;<i className="fas fa-fire" style={{color:'#F42'}}></i></p>
                </div>

                <div className={cn('toptenmusic-list')}>
                        {
                            this.props.top10.map(
                                (value , index) => (
                                    <div className={cn('toptenmusic-list-item')} key={index}>
                                        <div className={cn('toptenmusic-list-rank' , `rank${value.get('rank')}`)}>
                                            <p>{(index > 2)? `${index+1}` : <i className="fas fa-medal"></i> }</p>
                                        </div>
                                        <div className={cn('toptenmusic-list-song')}>
                                            <p>{value.get('song')}</p>
                                        </div> 
                                        <div className={cn('toptenmusic-list-singer')}>
                                            <p>{value.getIn(['singer' , 'name'])}</p>
                                        </div>
                                        <div className={cn('toptenmusic-list-buttons')}>
                                            <div className={cn('toptenmusic-list-play' , 'toptenmusic-list-button')} 
                                            onClick={(e)=>{ this.play(index); }}>
                                                <i className={cn('fas fa-play')}></i>
                                            </div>
                                            <div className={cn('toptenmusic-list-addlist' , 'toptenmusic-list-button')} 
                                            onClick={(e)=>{this.addMusicPlayer(index)}}>
                                                <i className={cn('fas fa-plus')}></i>
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
        top10 : state.top100.items.slice(0,10),
        isAuthenticated : state.auth.isAuthenticated,
        userId : state.auth.userId,
    }),
    (dispatch) => ({
        top100Actions : bindActionCreators(Top100Actions , dispatch),
        myMusicActions : bindActionCreators(MyMusicActions , dispatch),
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch)
    })
)(TopTenMusic)