import React , { Component } from 'react'
import './musicPlayer2.css'

class MusicPlayer extends Component {

    state = {

    }


    render () {
        return (
            <div className='musicplayer2'>
                <div className='scroller'>
                    <div className="fas fa-angle-down fa-2x"></div> 
                </div>

                <div className='controller'>
                    <div className='left'>
                            <div className='img-wrap'>
                                <div className='img' style={{backgroundImage:`url('/twice2.jpg')`}}>

                                </div>
                            </div>

                            <div className='info'>

                                <div className='text'>
                                    가수 - 노래 - 앨범
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
                        <div className='buttons1'>
                            <i className="fas fa-fast-backward"></i>
                            <i className="fas fa-pause"></i>
                            <i className="fas fa-play"></i>
                            <i className="fas fa-fast-forward"></i>
                        </div>
                        <div className='buttons2'>
                            <i className="fas fa-exchange-alt"> 반복</i>
                            <i className="fas fa-sort-numeric-down"> 순서대로</i>
                        </div>
                            
                    </div>

                    <div className='right'>
                        <i className="fas fa-list fa-2x"></i>
                    </div>
                </div>


            </div>
        )
    }

}


export default MusicPlayer