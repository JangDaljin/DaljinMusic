import React , { Component } from 'react'
import './musicPlayer2.css'

class MusicPlayer extends Component {

    state = {

    }


    render () {
        return (
            <div className='musicplayer2'>
                <div className='scroller'>
                    <div className="fas fa-angle-up fa-2x"></div> 
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
                                    <div className='progressbar'>
                                        <div className='position'>
                                            
                                        </div>
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
                        <div className="fas fa-list fa-2x"></div>
                    </div>
                </div>


            </div>
        )
    }

}


export default MusicPlayer