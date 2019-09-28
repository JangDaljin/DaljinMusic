import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './navigator.css'
const cn = className.bind(styles)

class Navigator extends Component {


    render () {

        const menuNames = [
            {
                name : '홈' ,
                link : 'HOME'
            },
            {
                name : 'TOP 100' ,
                link : 'TOP 100'
            },
            {
                name : '내음악' ,
                link : 'MY MUSIC'
            }
        ]

        return (
            <div className={cn('header-navigator')}>

                <ul>
                    {menuNames.map(
                        (value , index) => {
                            return (<Link to={menuNames[index].link.replace(/ /gi , '').toLowerCase()} key={index} className={cn(`navigator-item`)}><p>{menuNames[index].name}</p></Link>)
                        }
                    )}
                </ul>

            </div> 
        )

    }




}

export default Navigator;