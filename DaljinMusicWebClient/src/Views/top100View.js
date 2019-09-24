import React , { Component } from 'react'
import Header from '../Components/Header/header'
import Top100Body from '../Components/Top100Body/top100Body'

export default class Top100View extends Component {
    render () {

        return (
            <div>
                <Header />
                <Top100Body />
            </div>
        )


    }
}