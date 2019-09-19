import { combineReducers } from 'redux'
import login from './login'
import music from './music'

const reducers = combineReducers({
    login,
    music
})

export default reducers