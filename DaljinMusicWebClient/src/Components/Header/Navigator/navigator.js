import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './navigator.css'
const cn = className.bind(styles)

class Navigator extends Component {


    render () {

        const menuNames = ['HOME' , 'TOP 100' , 'MY MUSIC' , 'OTHER MUSIC']

        return (
            <div className={cn('header-navigator')}>

                <ul>
                    {menuNames.map(
                        (value , index) => {
                            return (<Link to={menuNames[index].replace(/ /gi , '').toLowerCase()} key={index} className={cn(`navigator-item`)}><p>{value}</p></Link>)
                        }
                    )}
                </ul>

            </div> 
        )

    }




}

export default Navigator;