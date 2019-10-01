import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './top100View.css'
const cn = classNames.bind(styles)

export default class Top100ViewBody extends Component {

    constructor (props) {
        super(props)
        this.getMoreItem = this.getMoreItem.bind(this);


        this.state = {
            itemCount : 0,
            items : []
        }
    }


    componentDidMount () {
        console.log('DidMount');
        this.getMoreItem(0 , 10);
        window.addEventListener('scroll' , () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight ,document.body.scrollHeight);
            let scrollTop = Math.max(document.documentElement.scrollTop ,document.body.scrollTop);
            let clientHeight = document.documentElement.clientHeight;
            if(scrollTop+clientHeight === scrollHeight) {
                if(this.state.itemCount < 100) {
                    this.getMoreItem(this.state.itemCount , this.state.itemCount+10)
                }
            }
        } , true)
    }


    getMoreItem(prevCount , nowCount) {
        const newState = { ...this.state }
        newState.itemCount = this.state.itemCount + nowCount-prevCount

        for(let i = prevCount ; i < nowCount; i ++) {
            newState.items.push(
                {
                    singer : `SINGER ${prevCount + i}`,
                    song : `SONG ${prevCount + i}`,
                    album : `ALBUM ${prevCount + i}`
                }
            )
        }

        this.setState(newState);
    }



    render () {


        return (
            <div className={cn('top100')}>
                <div className={cn('top100-left')}>
                    {

                        this.state.items.map((value , index) => (
                            <div key={index} className={cn('top100-list-item')}>
                                <div className={cn('top100-list-item-ranking')}>
                                    <p>{index+1}</p>
                                </div>
                                <div className={cn('top100-list-item-img')}>
                                    <div className={cn('top100-list-item-album-img')} style={{backgroundImage:`url('twice.jpg')`}}>

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
                                        <div className={cn('top100-list-item-add' , 'top100-list-button')}><i className={cn('fas fa-plus' , 'fa-2x')}></i></div>
                                        <div className={cn('top100-list-item-list' , 'top100-list-button')}><i className={cn('fas fa-list' , 'fa-2x')}></i></div>
                                </div>

                            </div>
                        ))
                        
                    }
                </div>

                <div className={cn('top100-right')}>
                    

                </div>

            </div>
        )
    }
}
