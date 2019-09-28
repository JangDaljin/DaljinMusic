import React , { Component } from 'react'
import Header from '../Components/Header/header'
import SearchViewBody from '../Components/SearchViewBody/searchViewBody'

export default class SearchView extends Component {

    render () {


        return (
            <div>
                <Header />
                <SearchViewBody />
            </div>
        )
    }
}