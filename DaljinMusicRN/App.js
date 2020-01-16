import React , { Component } from 'react';

import Index from './View/Index'

import * as Font from 'expo-font'

export default class App extends Component {
  
  async componentDidMount() {
    Font.loadAsync({
      'jua' : require('./assets/fonts/Jua-Regular.ttf')
    })

  }
  
  render () {
    return (
      <Index />
    )
  }
}