import React , { Component } from 'react'
import PlayingList from './playingList'
import { Map , List } from 'immutable'

import Draggable from 'react-draggable'

import styles from './musicPlayer2.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

class MusicPlayer extends Component {

    constructor(props) {
        super(props)

        const newList = []
        for(let i = 1 ; i <= 20; i ++) {
            newList.push(
                Map({
                    singer : `SINGER ${i}`,
                    song : `SONG ${i}`,
                    album : `ALBUM ${i}`,
                    duration : i*10,
                    checked : false,
                })
            )
        }

        this.state = {
            isShow : false,
            isShowPlayingList : false,

            isLoop : false,
            isPlayingOne : false,
            currentMusicIndex : 0,
            playingList : List(newList),
        }
    }

    onChangeCheck = (index) => {
        //index 없으면 전체 선택(Overloading)
        if(typeof index === 'undefined') {
            this.setState({ playingList : this.state.playingList.map(value => value.update('checked' , (value => !value)))})
        }
        //index 있으면 해당 데이터 변경(Overloading)
        else if(typeof index === 'number') {
            this.setState({ playingList : this.state.playingList.updateIn([index , 'checked'] , value => !value) })
        }
    }

    onRemove = () => {
        //서버에 저장할 코드 작성 필요
        this.setState({ playingList : this.state.playingList.filter( item => !item.get('checked') ) })
    }

    onProgressbarClick = (e) => {
        
    }

    onProgressSeek = (e , data) => {
        const width = this.progressbar.offsetWidth-26
        const percentage = (data.x / width) * 100
        console.log(`PERCENTAGE : ${percentage}`)
    }

    render () {
        return (
            <React.Fragment>
            <div className={cn('musicplayer2' , { 'musicplayer-down' : !this.state.isShow } , {'musicplayer-up' : this.state.isShow})}>
                <div className='scroller'>
                    <div className={cn('fas fa-angle-up fa-2x' , { 'scroller-rotate' : this.state.isShow} , {'scroller-none' : !this.state.isShow})} onClick={(e) => { this.setState({isShow : !this.state.isShow})}}>
                    </div> 
                </div>

                <div className='controller'>
                    <div className='left'>
                            <div className='img-wrap'>
                                <div className='img' style={{backgroundImage:`url('/twice2.jpg')`}}>

                                </div>
                            </div>

                            <div className='info'>

                                <div className='text'>
                                    <div>가수 - 노래 - 앨범</div>
                                </div>

                                <div className='progress'>
                                    00:00
                                    <div className='progressbar' ref={ ref => this.progressbar = ref} onMouseDown={this.onProgressbarClick}>
                                        <Draggable axis="x" bounds="parent" defaultPosition={{x :  0 ,  y : -8 }} onDrag={this.onProgressSeek}>
                                        <div className='position' ref={ ref=> this.progressPosition = ref}></div>
                                        </Draggable>
                                    </div>
                                    11:11
                                </div>

                            </div>
                    </div>
                    <div className='center'>
                        <div className='buttons buttons1'>
                            <div className="button fas fa-fast-backward"></div>
                            <div className="button fas fa-pause"></div>
                            <div className="button fas fa-play"></div>
                            <div className="button fas fa-fast-forward"></div>
                        </div>
                        <div className='buttons buttons2'>
                            <div className="button fas fa-exchange-alt"></div>
                            <div className="button fas fa-sort-numeric-down"></div>
                        </div>
                            
                    </div>

                    <div className='right'>
                        <div className="fas fa-list fa-2x" onClick={(e) => { 
                            this.setState({isShowPlayingList : !this.state.isShowPlayingList}) }}></div>
                    </div>
                </div>

               
            <PlayingList show={this.state.isShowPlayingList} playingList={this.state.playingList.toJS()} onRemove={this.onRemove} onChangeCheck={this.onChangeCheck} />
            </div>
            </React.Fragment>
        )
    }

}


export default MusicPlayer