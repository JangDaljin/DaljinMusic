import React , { Component } from 'react'
import styles from './playingList.css'

import classNames from 'classnames/bind'
const cn = classNames.bind(styles)


class PlayingList extends Component {

    render () {
        return (
            <div className={cn('playinglist' , { 'playinglist-show' : this.props.show } , { 'playinglist-notshow' : !this.props.show })}>

                <div className="menu">
                    <div className="button-wrap" onClick={ e => { this.props.onChangeCheck() } }>
                        <i className="far fa-check-square"></i><span> 전체선택</span>   
                    </div>
                    <div className="button-wrap" onClick={ e => { this.props.onRemove() }}>
                        <i className="fas fa-trash"></i><span> 선택삭제</span>   
                    </div>
                </div>

                <div className="list">
                    {
                        this.props.playingList.map(
                            (value , index) => (
                                <div className='list-item' key={index}>
                                    {value.checked ?
                                        <span className="far fa-check-circle checkbox" onClick={(e) => this.props.onChangeCheck(index) }></span>
                                        :
                                        <span className="far fa-circle checkbox" onClick={(e) => this.props.onChangeCheck(index) }></span>
                                    }
                                    

                                    <span className="list-item-name">{`${value.singer} - ${value.song} - ${value.album}`}</span>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default PlayingList