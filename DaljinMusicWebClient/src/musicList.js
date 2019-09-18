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
                    <div className={cn('tableheader')}>
                        <div className={cn('musiclist-header-row')}>
                            <div className={cn('musiclist-header-col' , 'table-checkbox')}>
                                <input id='headerCheckbox' className={cn('musiclist-checkbox')} type="checkbox" />
                                <label for='headerCheckbox'></label>
                            </div>
                        <div className={cn('musiclist-header-col' , 'table-singer')}>
                                가수
                            </div>
                            <div className={cn('musiclist-header-col' , 'table-song')}>
                                제목
                            </div>
                            <div className={cn('musiclist-header-col' , 'table-time')}>
                                시간
                            </div>
                        </div>
                    </div>

                    <div className={cn('musiclist-table scrollable')}>
                    {
                        musicList.map(
                            (item , index) => 
                                <div key={index} className={cn('musiclist-row')}>
                                    <div className={cn('musiclist-col' , 'table-checkbox')}>
                                        <input id={`checkbox${index}`} className={cn('musiclist-checkbox')} type="checkbox" value={index}/>
                                        <label for={`checkbox${index}`}></label>
                                    </div>
                                   <div className={cn('musiclist-col' , 'table-singer')}>
                                        {item.singer}
                                    </div>
                                    <div className={cn('musiclist-col' , 'table-song')}>
                                        {item.song}
                                    </div>
                                    <div className={cn('musiclist-col' , 'table-time')}>
                                        {item.time}
                                    </div>
                                </div>
                        )
                    }
                        
                    </div>
                </div>

                <div className={cn('menulist-div')}>
                    <ul className={cn('menulist-ul')}>
                        <li className={cn('menulist-li')}><button className={cn('menubutton')}><i class="far fa-play-circle"></i></button></li>
                        <li className={cn('menulist-li')}><button className={cn('menubutton')}><i class="fas fa-trash"></i></button></li>
                        <li className={cn('menulist-li')}><button className={cn('menubutton')}><i class="far fa-save"></i></button></li>
                    </ul>
                </div>
            </div>

        )

    }

}

export default MusicList;