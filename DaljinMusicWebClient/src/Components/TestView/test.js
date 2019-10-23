import React , { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import * as TestActions from '../../ReduxModules/test'
import  './test.css'
class TestView extends Component {

    render () {
        return (
            <div className='test-div-root'>
                <input type='button' value='MAKE REF' onClick={() => { this.props.testActions.refMakeFetch() }} />
                <input type='button' value='MAKE TEST' onClick={() => { this.props.testActions.testMakeFetch({outputData : 'abcdefg'}) }} />
                <input type='button' value='TEST START' onClick={() => { this.props.testActions.testFetch() }} />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        inputData : state.test.inputData
    }),
    (dispatch) => ({
        testActions : bindActionCreators(TestActions , dispatch)
    })
)(TestView)
