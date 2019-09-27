import React , { Component } from 'react'
import Header from '../Components/Header/header'
import Top100ViewBody from '../Components/Top100ViewBody/top100ViewBody'

export default class Top100View extends Component {
    render () {

        return (
            <div>
                <Header />
                <Top100ViewBody />
            </div>
        )


    }
}