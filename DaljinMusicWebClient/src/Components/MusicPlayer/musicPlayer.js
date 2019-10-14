import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './musicPlayer.css'
const cn = classNames.bind(styles)


export default class MusicPlayer extends Component {

    constructor(props) {
        super(props)

        const newState = []
        for(let i = 1 ; i <= 100; i ++) {
            newState.push(
                {
                    singer : `SINGER ${i}`,
                    song : `SONG ${i}`,
                    album : `ALBUM ${i}`,
                    time : `${i}:${i}`
                }
            )
        }

        this.state = {
            showList : true,
            loop : true,
            justOneSong : true,
            removeMode : false,
            isPlaying : false,
            curPos : 50,
            items : newState
        }
        this.doListItemClicked = this.doListItemClicked.bind(this)
    }

    doListItemClicked (index) {
        if(this.state.removeMode) {
            const newState = { ...this.state }
            newState.items.splice(index , 1)
            this.setState(newState)
        }
        else {
            //재생모드
        }
    }

    render () {
        return (
            <div className={cn('musicplayer')}>
                
                <div className={cn('top-wrap')}>
                    <div className={cn('img-wrap')}>
                        <div className={cn('img')} style={{backgroundImage:`url('/twice1.jpg')`}}></div>
                    </div>
                    <div className={cn('info')}>
                        <div className={cn('singer')}>
                            <p>SINGER</p>
                        </div>
                        <div className={cn('song')}>
                            <p>SONG</p>
                        </div>
                        <div className={cn('progress-wrap')}>
                            <div className={cn('progress')} style={{width:`${this.state.curPos}%`}}>
                                {this.state.curPos}%
                            </div>
                        </div>
                    </div>
                    <div className={cn('buttons')}>
                        <div className={cn('button')}>
                            <div className={cn('prev')}>
                                <i className="fas fa-fast-backward"></i>
                            </div>
                            <div className={cn('playpause')} onClick={()=>{ this.setState({isPlaying : !this.state.isPlaying})}}>
                            {
                                this.state.isPlaying ? 
                                <i className="fas fa-pause"></i>
                                :
                                <i className="fas fa-play"></i>
                            }
                            </div>
                            <div className={cn('next')}>
                                <i className="fas fa-fast-forward"></i>
                            </div>
                        </div>
                        <div className={cn('musicplayer-list-up')} onClick={() => { this.setState({showList : !this.state.showList})}}>
                            <i className="fas fa-angle-down fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className={cn('bottom-wrap' , {'showlist' : this.state.showList})}>

                    <div className={cn('playing-list')}>
                        
                        {this.state.items.map(
                            (value , index) => (
                                <div key={index} className={cn('playing-list-item')} onClick={ (e) => {e.preventDefault(); this.doListItemClicked(index)} }>
                                    <div className={cn('playing-list-number')}><p>{index+1}</p></div>
                                    <div className={cn('playing-list-singer')}><p>{value.singer}</p></div>
                                    <div className={cn('playing-list-song')}><p>{value.song}</p></div>
                                    <div className={cn('playing-list-time')}><p>{value.time}</p></div>
                                </div>
                            )
                        )}


                    </div>
                    <div className={cn('playing-list-button')}>
                            <div className={cn('playing-loop' , {'unchecked' : !this.state.loop})} onClick={()=>{ this.setState({loop : !this.state.loop})}}>
                                <i className="fas fa-exchange-alt"> 순환재생</i>
                            </div>
                            <div className={cn('playing-justonesong' , {'unchecked' : !this.state.justOneSong})} onClick={()=>{ this.setState({justOneSong : !this.state.justOneSong})}}>
                                <i className="fas fa-sort-numeric-down"> 전체재생</i>
                            </div>
                            <div className={cn('playing-list-delete' , {'unchecked' : !this.state.removeMode} , {'removemode' : this.state.removeMode})} onClick={()=>{ this.setState({removeMode: !this.state.removeMode})}} >
                                <i className="far fa-check-square" style={{fontWeight:'bold'}}> 삭제모드</i>
                            </div>
                    </div>
                </div>

            </div>
        )
    }
}