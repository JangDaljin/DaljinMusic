import React , { Component } from 'react'
import { List , Map } from 'immutable'

import classNames from 'classnames/bind'
import styles from './top100Body.css'
const cn = classNames.bind(styles)

export default class Top100Body extends Component {

    constructor (props) {
        super(props)
        this.state = Map({
            itemCount : 10,
            items : List(Map({TEST:'TTTT'}))
        })
        this.getMoreItem = this.getMoreItem.bind(this);
    }

    componentDidMount () {
        console.log('DidMount');
        this.getMoreItem(0 , this.state.get('itemCount'))

        window.addEventListener('scroll' , () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight ,document.body.scrollHeight);
            let scrollTop = Math.max(document.documentElement.scrollTop ,document.body.scrollTop);
            let clientHeight = document.documentElement.clientHeight;
            if(scrollTop+clientHeight === scrollHeight) {
                console.log('scroll end');
                this.setState(this.state.set('itemCount' , this.state.get('itemCount')+10))
            }
        } , true)
    }

    componentDidUpdate (prevProps , prevState) {
        //10개 더 요청
        console.log('didupdate');
        if(prevState !== this.state) {
            //prevState.get('itemCount') ~ this.state.get('itemCount') 까지 요청

            
        }
    }

    getMoreItem(prevCount , nowCount) {

        
        for(let i = prevCount ; i < nowCount; i ++) {
            this.setState(this.state.set('items' , this.state.get('items').push(
                    Map({
                        singer : `SINGER ${prevCount + i}`,
                        song : `SONG ${prevCount + i}`,
                        album : `ALBUM ${prevCount + i}`
                    })
                ))
            )
        }

        console.log(this.state.get('items'));
    }



    render () {

        return (
            <div className={cn('top100')}>
                <div className={cn('top100-left')}>
                    {/*
                        this.state.get('items').toJS().map((value , index) => (
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
                        ))*/
                    }
                </div>

                <div className={cn('top100-right')}>
                    

                </div>

            </div>
        )
    }
}
