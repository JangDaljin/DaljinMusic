import React , { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './myMusicViewList.css'
const cn = classNames.bind(styles)

const itemPerPage = 6;
const pagePerBar = 5;

export default class MyMusicViewList extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            totalPage : 0,
            curPage : 1,
            curShowPages : 0,
            pages : [],
            currentListName : ''
        }

        
    }

    componentDidUpdate(prevProps , prevState) {
        if(this.props.musicListName !== this.state.currentListName) {

            const initPage = [];
            const _totalPage = Math.ceil(this.props.musicList.length / itemPerPage)
            for(let i = 1; i <= _totalPage; i++) {
                initPage.push(i)
            }
            
            this.setState({
                totalPage : _totalPage,
                pages : initPage,
                curPage : 1,
                curShowPages : 0,
                currentListName : this.props.musicListName
            })
        }

    }

    render () {
        return (
            <div>
                <div className={cn('mymusic-list-title')}><p><i className="fas fa-stream"></i> { this.props.musicListName } </p></div>
                {this.props.musicList.length > 0 ?
                    <div className={cn('mymusic-list')}>
                        <div className={cn('mymusic-list-wrap')}>
                        {   
                            this.props.musicList.slice((this.state.curPage-1) * itemPerPage , this.state.curPage * itemPerPage).map(
                                (value , index) => (
                                    <div key={index} className={cn('mymusic-list-item' , {'mymusic-checked' : value.checked})} onClick={ ()=> { this.props.onCheck(value) } }>
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
                :
                <div className={cn('mymusic-musiclist-no-item')}>
                    <div>
                    <p><i className="fas fa-exclamation-circle fa-2x"></i></p>
                    <p> 자료가 존재하지 않습니다.</p>
                    </div>
                </div>
                }
            </div>
        )
    }
}


