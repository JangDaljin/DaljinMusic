import React , { Component } from 'react';

import Index from './View/Index'
import Splash from './View/SplashView'

import * as Font from 'expo-font'

export default class App extends Component {
  
  state = {
    fontLoaded : false,
    splashHide : false,
    splashMessage : '',
  }

  async componentDidMount() {

    //최소 3초후 스플레시 화면 제거
    setTimeout(() => {
      this.setState({splashHide : true})
    } , 3000)


    //폰트 로딩
    this.setState({splashMessage : '폰트 로딩중...'})
    await Font.loadAsync({
      'jua' : require('./assets/fonts/Jua-Regular.ttf')
    })
    this.setState({fontLoaded : true})

  }
  
  render () {
    return (  

      this.state.fontLoaded && this.state.splashHide ?
      <Index />
      :
      <Splash message={this.state.splashMessage} />
    )
  }
}