import React , { Component } from 'react'
import Header from '../Components/Header/header'
import IndexBody from '../Components/IndexViewBody/indexViewBody'
export default class IndexView extends Component {

    render () {
        return (
            <div>
                
                <Header />

                <IndexBody />


            </div>
        )
    }

}