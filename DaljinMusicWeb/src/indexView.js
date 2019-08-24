import React , { Component } from 'react'
import './indexView.css'
export default class IndexView extends Component {

    render () {
        return(
            <div>
                <h1 className="test">HELLO REACT</h1>
                <h2>WHAT THE</h2>
                <form method="post" action="/login">
                    <input type="text" />
                    <input type="password" />
                </form>
            </div>
        )
    }
}