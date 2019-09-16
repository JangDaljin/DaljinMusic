import React , { Component } from 'react'
import styles from './musicList.css'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

class MusicList extends Component {





    render () {

        const musicAlbumList = ["Album1" , "Album2" , "Album3" , "Album4"]
        
        let singer = ["A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E" , "A" , "B" , "C" , "D" , "E"]
        let musicName = ["가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마" , "가" , "나" , "다" , "라" , "마"]
        let musicTime = ["1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00" , "1:00" , "2:00" , "3:00" , "4:00" , "5:00"]

        let musicList = [];

        for(let i = 0 ; i < singer.length; i ++) {
            musicList.push({singer : singer[i] , song : musicName[i] , time : musicTime[i]})
        }


        return(
            <div className={cn('list-wrap')}>
                <div className={cn('albumlist-div')}>
                    <ul className={cn('albumlist-ul')}>
                        {musicAlbumList.map((item , index) => 
                            <li key={index} className={cn('albumlist-li')}><button className={cn('album-button')}>{item}</button></li>
                        )}
                    </ul>
                </div>

                <div className={cn('hidescroll')}>
                    <div className={cn('musiclist-table scrollable')}>
                    {
                        musicList.map(
                            (item , index) => 
                                <div key={index} className={cn('musiclist-row')}>
                                    <div className={cn('musiclist-col' , 'checkbox')}>
                                        <input type="checkbox" value={index}/>
                                    </div>
                                    <div className={cn('musiclist-col' , 'index')}>
                                        {index}
                                    </div>
                                   <div className={cn('musiclist-col' , 'singer')}>
                                        {item.singer}
                                    </div>
                                    <div className={cn('musiclist-col' , 'song')}>
                                        {item.song}
                                    </div>
                                    <div className={cn('musiclist-col' , 'time')}>
                                        {item.time}
                                    </div>
                                </div>
                        )
                    }
                        
                    </div>
                </div>

                <div className={cn('menulist-div')}>
                    <ul className={cn('menulist-ul')}>
                        <li className={cn('menulist-li')}><button>재생</button></li>
                        <li className={cn('menulist-li')}><button>삭제</button></li>
                        <li className={cn('menulist-li')}><button>저장</button></li>
                    </ul>
                </div>
            </div>

        )

    }

}

export default MusicList;