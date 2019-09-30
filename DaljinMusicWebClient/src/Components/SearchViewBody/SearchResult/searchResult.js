import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './searchResult.css'
const cn = classNames.bind(styles)

const showItemPerPage = 6;
const showPagesCount = 5;

export default class searchResult extends Component {

    constructor(props) {
        super(props);
        
        const initPages = [];
        const initChecked = [];
        for(let i = 0 ; i < Math.ceil(this.props.items.length / showItemPerPage) ; i++) {
            initPages.push(i+1);
            for(let j = 0 ; j < showItemPerPage; j++) {
                initChecked.push(false)
            }
        }

        this.state = {
            curPage : 1,
            curPagesCount : 1,
            pages : initPages,
            checked : initChecked
        }
    }

    render () {
        return (
            <div className={cn('result')}>
                <div className={cn('title')}>{`${this.props.title}(${this.props.items.length})`}</div>

                <div className={cn('list')}>
                    {
                        
                        this.props.items.slice((this.state.curPage-1) * showItemPerPage , this.state.curPage * showItemPerPage).map((value , index) => (
                            <div key={index} className={cn('list-item' , {'list-item-checked' : this.state.checked[(this.state.curPage * showItemPerPage) + index]})} onClick={() => {
                                const newState = { ...this.state }
                                const pos = (newState.curPage * showItemPerPage)+index
                                newState.checked[pos] = !newState.checked[pos]
                                this.setState(newState)
                            }}>

                                <div className={cn('list-item-img-wrap')}>
                                    <div className={cn('list-item-img')} style={{backgroundImage:`url('/twice.jpg')`}}>

                                    </div>
                                </div>

                                <div className={cn('list-item-info')}>
                                    <div className={cn('list-item-song')}>
                                        <p>{value.song}</p>
                                    </div>
                                    <div className={cn('list-item-singer')}>
                                        <p>{value.singer}</p>
                                    </div>
                                    <div className={cn('list-item-album')}>
                                        <p>{value.album}</p>
                                    </div>
                                </div>

                            </div>
                            
                        ))
                        
                    }
                </div>

                <div className={cn('pages')}>
                    <div className={cn('prev')} onClick={() => {
                        const newState = { ...this.state }
                        if(newState.curPagesCount > 1 ) {
                            newState.curPagesCount = newState.curPagesCount-1
                            newState.curPage = newState.curPagesCount * showPagesCount
                        }
                        this.setState(newState)
                        }}>
                        <p><i className="fas fa-less-than"></i></p>
                    </div>

                    <div className={cn('page-wrap')}>
                    {
                        this.state.pages
                        .slice(
                            ( this.state.curPagesCount-1) * showPagesCount, 
                             (this.state.curPagesCount * showPagesCount) < this.state.pages.length ? this.state.curPagesCount * showPagesCount : this.state.pages.length)
                        .map(
                            (value , index) => (
                                <div key={index} className={cn('page' , {'pagechoice' : this.state.curPage === value? true : false})} onClick={() => {this.setState({curPage : value})}}>
                                    {
                                        value
                                    }
                                </div>
                            )
                        )
                        
                    }
                    </div>

                    <div className={cn('next')} onClick={() => { 
                            const newState = { ...this.state }
                            //(this.state.curPagesCount*showPagesCount < this.state.pages.length ? this.setState({curPagesCount : this.state.curPagesCount+1}) :  this.setState({curPagesCount : this.state.curPagesCount}))
                            if(newState.curPagesCount*showPagesCount < newState.pages.length) { 
                                newState.curPagesCount = newState.curPagesCount+1
                                newState.curPage = ((newState.curPagesCount-1) * showPagesCount) + 1
                            }
                            this.setState(newState)
                        }}>
                        <p><i className="fas fa-greater-than"></i></p>
                    </div>
                </div>
            </div>
        )
    }
}