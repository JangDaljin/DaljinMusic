import React , { Component } from 'react'
import ReactDom from 'react-dom'


export default class IndexView extends Component {

    render () {
        return(
            <div>
                <form method="post" action="/login">
                    <input type="text" />
                    <input type="password" />
                </form>
            </div>
        )
    }
}