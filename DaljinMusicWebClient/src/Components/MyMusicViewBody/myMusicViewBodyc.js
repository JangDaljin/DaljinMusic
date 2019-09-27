import React , { Component } from 'react'

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
                    
                    {
                        this.state.myList.map(
                            (value , index) => (
                                <div key={index} className={cn('mymusic-list-item-wrap')}>
                                    <div className={cn('mymusic-list-item')}>
                                        <p>{value.listName}</p>
                                    </div>
                                </div>
                            )
                        )
                    }


                </div>

                <div className={cn('mymusic-center')}>
                    <div className={cn('mymusic-table-wrap')}>
                        <div className={cn('mymusic-table-header')}>
                            <div className={cn('mymusic-table-number', 'table-vertical-line')}><p>No</p></div>
                            <div className={cn('mymusic-table-song' , 'table-vertical-line')}><p>제목</p></div>
                            <div className={cn('mymusic-table-singer' , 'table-vertical-line')}><p>가수</p></div>
                            <div className={cn('mymusic-table-time')}><p>시간</p></div>
                        </div>
                        <div className={cn('mymusic-table-body')}>
                            {
                                this.state.myList[this.state.curList].items.map(
                                    (value , index) => (
                                        <div key={index} className={cn('mymusic-table-items')}>
                                            <div className={cn('mymusic-table-number', 'table-vertical-line')}><p>{index+1}</p></div>
                                            <div className={cn('mymusic-table-song' , 'table-vertical-line')}><p>{value.song}</p></div>
                                            <div className={cn('mymusic-table-singer' , 'table-vertical-line')}><p>{value.singer}</p></div>
                                            <div className={cn('mymusic-table-time')}><p>{value.time}</p></div>
                                        </div>
                                    )
                                )
                            }

                        </div>
                    </div>
                </div>

                <div className={cn('mymusic-right')}>

                    <div className={cn('mymusic-buttons')}>
                        <p><i className={cn('fas fa-play')}></i>&nbsp;재생</p>
                    </div> 

                    <div className={cn('mymusic-buttons')}>
                        <p><i className={cn('fas fa-eraser')}>&nbsp;</i>삭제</p>
                    </div>

                    <div className={cn('mymusic-buttons')}>
                        <p><i className={cn('fas fa-stream')}></i>&nbsp;가져오기</p>
                    </div> 

                    <div className={cn('mymusic-buttons')}>
                        <p><i className={cn('fas fa-cloud-download-alt')}></i>&nbsp;다운로드</p>
                    </div>

                    <div className={cn('mymusic-buttons')}>
                        <p><i className={cn('fas fa-cloud-upload-alt')}></i>&nbsp;업로드</p>
                    </div>

                </div>
            </div>



        )
    }
}