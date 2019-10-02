import { combineReducers } from 'redux'
import Login from './login'
import Top100 from './top100'

const reducers = combineReducers({
    Login,
    Top100
})

export default reducers