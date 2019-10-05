import { combineReducers } from 'redux'
import { fork} from 'redux-saga/effects'
import { authReducer as auth , authSaga} from './auth'

export const rootReducer = combineReducers({
    auth,
})


export function *rootSaga() {
    yield fork(authSaga)
}
