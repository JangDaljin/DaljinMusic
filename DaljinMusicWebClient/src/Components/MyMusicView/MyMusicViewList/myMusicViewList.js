import React , { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './myMusicViewList.css'
const cn = classNames.bind(styles)

const itemPerPage = 5;
const pagePerBar = 5;

export default class MyMusicViewList extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            totalPage : 0,
            curPage : 1,
            curShowPages : 0,
            pages : []
        }
    }

    componentDidUpdate(prevProps , prevState) {


        if(prevProps !== this.props) {
            console.dir(this.props.musicList.items)

            const initPage = [];
            const _totalPage = Math.ceil(this.props.musicList.items.length / itemPerPage)
            for(let i = 1; i <= _totalPage; i++) {
                initPage.push(i)
            }

            this.setState({
                totalPage : _totalPage,
                pages : initPage,
                curPage : 1,
                curShowPages : 0
            })
        }
        
    }

    render () {
        return (
            <div className={cn('mymusic-list')}>
                <div className={cn('mymusic-list-wrap')}>
                {
                    this.props.musicList.items.map(
                        (value , index) => (
                            <div key={index} className={cn('mymusic-list-item')}>
                                <div className={cn('mymusic-list-album-img-wrap')}>
                                    <div className={cn('mymusic-list-album-img')} style={{backgroundImage : `url('${value.albumImgUri}')`}}>
                                    </div>
                                </div>
                                <div className={cn('mymusic-list-info')}>
                                    <div className={cn('mymusic-list-info-song')}>
                                        <p>{value.song}</p>
                                    </div>
                                    <div className={cn('mymusic-list-info-singer')}>
                                        <p>{value.singer}</p>
                                    </div>
                                    <div className={cn('mymusic-list-info-album')}>
                                        <p>{value.album}</p>
                                    </div>
                                </div>
                                <div className={cn('mymusic-list-buttons')}>

                                </div>
                            </div>
                        )
                    )
                }
                </div>













                <div className={cn('mymusic-pages')}>
                    
                    <div className={cn('mymusic-pages-left')}>
                        <div className={cn('page-button')} onClick={
                                () => { 
                                    if(this.state.curShowPages > 0) {
                                        this.setState({curShowPages : this.state.curShowPages - 1  })}
                                    }
                                }><i className="fas fa-less-than"></i></div>
                    </div>
                    
                    <div className={cn('mymusic-pages-center')}>
                        {
                            this.state.pages.slice(this.state.curShowPages * pagePerBar , (this.state.curShowPages + 1) * pagePerBar)
                            .map((value , index) => (
                                <div key={index} className={cn({'mymusic-page-choiced' : (value === this.state.curPage)? true : false})}
                                onClick={() => { this.setState({ curPage : value }) }}
                                >{value}</div>
                            ))
                        }
                    </div>

                    <div className={cn('mymusic-pages-right')}>
                        <div className={cn('page-button')} onClick={
                            () => { 
                                if(this.state.totalPage > (this.state.curShowPages + 1) * pagePerBar) {
                                    this.setState({ curShowPages : this.state.curShowPages + 1 })
                                }
                            }
                        }><i className="fas fa-greater-than"></i></div>
                    </div>
                </div>

            </div>
        )
    }
}


