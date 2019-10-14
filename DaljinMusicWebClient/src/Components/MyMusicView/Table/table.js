import React , { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './table.css'
const cn = classNames.bind(styles)


const itemPerPage = 5;
const pagePerBar = 5;

export default class MyMusicTable extends Component {
    
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
            <div className={cn('mymusic-table')}>
                <div className={cn('mymusic-table-header')}>
                    <div className={cn('mymusic-table-number', 'table-vertical-line')}><p>No</p></div>
                    <div className={cn('mymusic-table-song' , 'table-vertical-line')}><p>제목</p></div>
                    <div className={cn('mymusic-table-singer' , 'table-vertical-line')}><p>가수</p></div>
                    <div className={cn('mymusic-table-time')}><p>시간</p></div>
                </div>

                <div className={cn('mymusic-table-body')}>
                    {
                        this.props.musicList.items.slice((this.state.curPage-1) * itemPerPage , this.state.curPage * itemPerPage).map(
                            (value , index) => (
                                <div key={index} className={cn('mymusic-table-items')}>
                                    <div className={cn('mymusic-table-number', 'table-vertical-line')}><p>{((this.state.curPage - 1) * itemPerPage) + index + 1}</p></div>
                                    <div className={cn('mymusic-table-song' , 'table-vertical-line')}><p>{value.song}</p></div>
                                    <div className={cn('mymusic-table-singer' , 'table-vertical-line')}><p>{value.singer}</p></div>
                                    <div className={cn('mymusic-table-time')}><p>{value.time}</p></div>
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


