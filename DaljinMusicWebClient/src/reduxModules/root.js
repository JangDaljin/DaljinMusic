import { combineReducers } from 'redux'
import { fork} from 'redux-saga/effects'
import { authReducer as auth , authSaga} from './auth'
import { signUpReducer as signUp , signUpSaga } from './signUp'

export const rootReducer = combineReducers({
    auth,
    signUp
})


export function *rootSaga() {
    yield fork(authSaga)
    yield fork(signUpSaga)
}
