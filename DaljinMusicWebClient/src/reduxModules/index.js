import { combineReducers } from './node_modules/redux'
import login from './login'
import music from './music'

const reducers = combineReducers({
    login,
    music
})

export default reducers