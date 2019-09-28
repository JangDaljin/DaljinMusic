import React , { Component } from 'react'

import MyMusicViewTable from './Table/table'
import MyMusicViewListNames from './ListNames/listNames'
import MyMusicViewButtons from './Buttons/buttons'

import classNames from 'classnames/bind'
import styles from './myMusicViewBody.css'
const cn = classNames.bind(styles)




export default class MyMusicViewBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            curList : 0,
            myList : [
                {
                    listName : 'TEST1',
                    items : [

                    ] 
                },
                {
                    listName : 'TEST2',
                    items : [

                    ] 
                },
                {
                    listName : 'TEST3',
                    items : [
                        
                    ] 
                }
            ]
        }

        const list = [];
        for(let i = 0 ; i < 100; i++) {
            list.push(
                {
                    singer : `SINGER 1-${i+1}`,
                    song : `SONG 1-${i+1}`,
                    time : `TIME 1-${i+1}`
                }
            )
        }
        this.state.myList[0].items = list;
    }

    render () {

        return (

            <div className={cn('mymusic')}>

                <div className={cn('mymusic-left')}>
                    <MyMusicViewListNames listNames={this.state.myList.map((value) => (value.listName))} />
                </div>

                <div className={cn('mymusic-center')}>
                    <MyMusicViewTable musicList={this.state.myList[this.state.curList]} />
                </div>

                <div className={cn('mymusic-right')}>
                    <MyMusicViewButtons />
                </div>
            </div>



        )
    }
}