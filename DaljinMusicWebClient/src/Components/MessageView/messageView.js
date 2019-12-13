import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MessageActions from '../../ReduxModules/message'
import classNames from 'classnames/bind'
import style from './messageView.css'
const cn = classNames.bind(style)




class MessageView extends Component {

    componentDidMount () {
        let count = 0;
        setInterval( () => {
            this.props.MessageActions.addMessage(count++)
        } , 1000)
    }

    componentDidUpdate (prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.messageQueue.size === 0 && this.props.messageQueue.size !== 0) {
                this.props.MessageActions.normalize()
            }
            if(this.props.messageQueue.size === 0) {
                this.props.MessageActions.minimize()
            }
        }
    }

    render () {
        return (
            <div className={cn('message-view')}>
                {
                    this.props.messageQueue.map((value , index) => (
                        <div className={cn('message-item')} key={index} onClick={(e) => { this.props.MessageActions.removeMessage(index) }}>
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