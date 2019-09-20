import React , {Component} from 'react'
import MusicList from '../Components/Music/musicList'
import styles from './musicView.css'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'

import MusicPlayer from '../Components/Music/musicPlayer'


const cn = classNames.bind(styles)


class MusicView extends Component {

    render () {
        return (
        <div className={cn('musicview-div')}>
            <div className={cn('center-wrap')}>
                <div className={cn('left-wrap')}>
                    <MusicList />
                </div>

                <div className={cn('right-wrap')}>
                    오른쪽
                </div>
            </div>
            

            <div className={cn('bottom-wrap')}>
                <MusicPlayer />
            </div>
        </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.login.isAuthenticated
    }
}


export default connect(mapStateToProps)(MusicView);