import React , { Component } from 'react'

import classNames from 'classnames/bind'
import style from './musicManagerView.css'
const cn = classNames.bind(style)


class MusicManagerView extends Component {
    
    render () {
        return (
            <div className={cn('musicmanager')}>
                
                <div className={cn('table-row')}>
                    <div className={cn('table-column' , 'tc1')}>
                        <input type="checkbox" />
                    </div>
                    <div className={cn('table-column' , 'tc2')}>
                        <input type="text" defaultValue="ASDFASDFASDF" />
                    </div>
                    <div className={cn('table-column' , 'tc3')}>
                        <input type="text" defaultValue="ZXCVZXCVZXCVZXCVZXCV" />
                    </div>
                    <div className={cn('table-column' , 'tc4')}>
                        <input type="text" defaultValue="LKJHLKJHLKJHLKJH" />
                    </div>
                    <div className={cn('table-column' , 'tc5')}>
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default MusicManagerView