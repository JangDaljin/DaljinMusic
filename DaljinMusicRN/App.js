import React , { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore , applyMiddleware} from 'redux'
import createSagaMiddleWare from 'redux-saga'
import { rootReducer , rootSaga } from './Reducers/root'

import Index from './View/Index'
import Splash from './View/SplashView'

import * as Font from 'expo-font'
import { API_SERVER } from './Config'

const sagaMiddleware = createSagaMiddleWare()
const store = createStore(rootReducer , applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default class App extends Component {
  
  state = {
    fontLoaded : false,
    splashHide : false,
    checkAPI : false,
    isLogin : false,
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

    //API 서버체크
    this.setState({splashMessage : '서버 체크...'})
    fetch(`${API_SERVER}/checkapi`).then(response => response.json()).then(data => { 
      this.setState({checkAPI : data.ok})
    })
  }
  
  render () {
    return (  
      <Provider store={store}>
      {
        this.state.fontLoaded && this.state.splashHide && this.state.checkAPI ?
        <Index />
        :
        <Splash message={this.state.splashMessage} />
      }
      </Provider>
    )
  }
}