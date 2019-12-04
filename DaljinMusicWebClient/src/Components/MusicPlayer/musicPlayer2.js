import React , { Component } from 'react'
import { Map , List , fromJS } from 'immutable'
import classNames from 'classnames/bind'
import style from './musicPlayer2.css'
const cn = classNames.bind(style)

class MusicPlayer extends Component {

    state = {
        isPlaying : false,
    }

    onClickPlay = () => {
        this.setState({ isPlaying : true })
    }

    onClickPause = () => {
        this.setState({ isPlaying : false })
    }

    render () {
        return (
            <div className={cn('musicplayer-background')}>

                <div className={cn('musicplayer')}>
                    <div className={cn('controller')}>
                        <div className={cn('img-wrap')}>
                            <div className={cn('img')}>

                            </div>
                        </div>
                        <div className={cn('info')}>
                            <div className={cn('info-song')}>SONG</div>
                            <div className={cn('info-singer')}>SINGER</div>
                            <div className={cn('info-album')}>ALBUM</div>
                        </div>
                    </div>

                    <div className={cn('buttons')}>
                            <div className="button fas fa-fast-backward"></div>
                            {this.state.isPlaying ?
                                <div className="button fas fa-play" onClick={this.onClickPause}></div>
                                :
                                <div className="button fas fa-pause" onClick={this.onClickPlay}></div>
                            }
                            
                            <div className="button fas fa-fast-forward"></div>
                            
                    </div>

                    <div className={cn('buttons')}>
                        <div className="button fas fa-exchange-alt"></div>
                        <div className="button fas fa-sort-numeric-down"></div>
                    </div>

                    <div className={cn('list')}>

                    </div>

                </div>
            </div>
        )
    }
}

export default MusicPlayer