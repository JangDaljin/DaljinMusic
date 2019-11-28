import React , { Component } from 'react'
import { connect } from 'react-redux'
import * as modalActions from '../../ReduxModules/modal'

import classNames from 'classnames/bind'
import style from './modal.css'
import { bindActionCreators } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux'
const cn = classNames.bind(style)


class Modal extends Component {

    render () {
        return (
            <div className={cn('modal-background' , {'modal-open' : this.props.show} , {'modal-close' : !this.props.show})}>
                <div className={cn('modal')}>
                    {this.props.showTitleBar &&
                        <div className={cn('top')}>
                            {this.props.title}
                        </div>
                    }


                    <div className={cn('center')} onClick={(e) => { this.props.ModalActions.modalClose()}}>
                        {this.props.center}
                    </div>

                    {this.props.showButtons&&
                        <div className={cn('bottom')}>
                            {this.props.bottom}
                        </div>
                    }

                </div>
            </div>
        )
    }

}

export default connect(
    (state) => ({
        show : state.modal.show,
        showTitleBar : state.modal.showTitleBar,
        showButtons : state.modal.showButtons,
        contents : state.modal.contents.toJS()
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions , dispatch)
    })
)(Modal)