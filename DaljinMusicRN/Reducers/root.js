import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'
import { todaysLiveReducer as todaysLive , todaysLiveSaga as todaysLiveSaga} from './todaysLive'

export const rootReducer = combineReducers({
    todaysLive,
})


export function* rootSaga() {
    yield fork(todaysLiveSaga)
}
