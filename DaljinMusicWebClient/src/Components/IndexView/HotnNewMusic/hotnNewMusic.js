import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as HotAndNewActions from '../../../ReduxModules/hotnNewMusic'

import classNames from 'classnames/bind'
import styles from './hotnNewMusic.css'
const cn = classNames.bind(styles)



class HotAndNewMusic extends Component {

    constructor(props) {
        super(props)

        

        this.state = {
            currentIndex : 0,
            imageShow : false,
            image_X : 0,
            imgae_Y : 0, 
        }
    }

    componentDidMount() {
        this.props.HotAndNewActions.fetchHotAndNew();
    }

    componentWillUnmount() {
        this.setState({'imageShow' : false})
    }

    imageShow = (e , index) => {
        this.setState({'imageShow' : true , 'currentIndex' : index})
    }

    imageMove = (e) => {
        //console.log(`X : ${e.nativeEvent.x} , Y : ${e.nativeEvent.y}`)
        this.setState({'image_X' : e.nativeEvent.x , 'image_Y' : e.nativeEvent.y})
    }

    imageClose = (e) => {
        this.setState({'imageShow' : false})
    }

    render () {
        return (
            <React.Fragment>
            <div className={cn('hotandnew')}>
                <div className={cn('hotandnew-title')}>
                    <span style={{color:'#FF5A5A'}}>HOT</span><span style={{color:'#9887b9'}}>&nbsp;&&nbsp;</span><span style={{color:'#069'}}>NEW</span>
                </div>

                <div className={cn('hotandnew-content')}>
                    <div className={cn('hotandnew-list')}>
                        {this.props.list.map(
                            (value , index) => (

                                <div className={cn('hotandnew-list-item')} key={index} onMouseOver={(e) => this.imageShow(e , index)} onMouseOut={this.imageClose} onMouseMove={this.imageMove}>
                                    <div className={cn('hotandnew-list-item-info')}>
                                        <div>{value.getIn(['music' , 'singer' , 'name'])}</div>
                                        <div>{value.getIn(['music' , 'song'])}</div>
                                    </div>
                                    <div className={cn('hotandnew-hotnew')}>
                                        {value.get('hot')&&
                                        <div className={cn('hot')}>HOT</div>
                                        }
                                        {value.get('new')&&
                                        <div className={cn('new')}>NEW</div>
                                        }
                                    </div>
                                </div>

                            )
                        )
                        }
                    </div>
                </div>
            </div>


            <div className={cn('hotandnew-img-wrap')} onMouseOver={(e) => {
                console.log(document.getElementById('root').getBoundingClientRect().bottom)
            }} style={
                    {
                        top :  document.getElementById('root').getBoundingClientRect().bottom < this.state.image_Y + 200 ? this.state.image_Y - 200 + 'px' : this.state.image_Y + 'px',
                        left : this.state.image_X + 12,
                        visibility : this.state.imageShow ? 'visible' : 'hidden',
                    }}>
                <div className={cn('hotandnew-img')} style={{
                    backgroundImage:`url('${this.props.list.getIn([this.state.currentIndex , 'music' , 'album' , 'albumImgUri'])}')`,
                }}>
                </div>
            </div>
            </React.Fragment>

        )
    }
}

export default connect(
    (state) => ({
        list : state.hotAndNew.list
    }),
    (dispatch) => ({
        HotAndNewActions : bindActionCreators(HotAndNewActions , dispatch)
    })
)(withRouter(HotAndNewMusic))