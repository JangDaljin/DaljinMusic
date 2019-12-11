import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MessageActions from '../../ReduxModules/message'
import classNames from 'classnames/bind'
import style from './messageView.css'
const cn = classNames.bind(style)

class MessageView extends Component {

    componentDidMount () {

    }

    render () {
        return (
            <div className={cn('message-view')}>
                {
                    this.props.messageQueue.map((value , index) => (
                        <div className={cn('message-item')} key={index}>
                            {value}
                        </div>
                    ))
                }
            </div>
        )
    }

}

export default connect(
    (state) => ({
        messageQueue : state.message.queue
    }),
    (dispatch) => ({
        MessageActions : bindActionCreators(MessageActions , dispatch)
    })
)(MessageView)