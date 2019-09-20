import React , { Component } from 'react'

import className from 'classnames/bind'
import styles from './navigator.css'
const cn = className.bind(styles)

class Navigator extends Component {


    render () {

        const menuNames = ['TOP 100' , 'MY MUSIC' , 'OTHER MUSIC']

        return (
            <div className={cn('header-navigator')}>

                <ul>
                    {menuNames.map(
                        (value , index) => {
                            return (<li key={index} className={cn(`navigator-item`)}><p>{value}</p></li>)
                        }
                    )}
                </ul>

            </div> 
        )

    }




}

export default Navigator;