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
                            <div className={cn('title')}>
                                {this.props.contents.get('title')}
                            </div>
                            <div className={cn('top-button')}>
                                <div className={cn('close-button')} onClick={(e) => { this.props.ModalActions.modalClose()}}>
                                    X
                                </div>
                            </div>
                        </div>
                    }


                    <div className={cn('center')}>
                        {this.props.contents.get('body').toJS()}
                    </div>

                    {this.props.showButtons&&
                        <div className={cn('bottom')}>
                            {this.props.contents.get('buttons').toJS()}
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
        contents : state.modal.contents,
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions , dispatch)
    })
)(Modal)