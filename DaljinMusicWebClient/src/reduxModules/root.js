import { combineReducers } from 'redux'
import { fork} from 'redux-saga/effects'
import { authReducer as auth , authSaga} from './auth'
import { signUpReducer as signUp , signUpSaga } from './signUp'
import { todaysMusicReducer as todaysMusic , todaysMusicSaga } from './todaysMusic'
import { suggestMusicReducer as suggestMusic , suggestMusicSaga } from './suggestMusic'
import { hnnMusicReducer as hnnMusic , hnnMusicSaga } from './hotnNewMusic'
import { top100Reducer as top100 , top100Saga } from './top100'

export const rootReducer = combineReducers({
    auth,
    signUp,
    todaysMusic,
    suggestMusic,
    hnnMusic,
    top100
})


export function *rootSaga() {
    yield fork(authSaga)
    yield fork(signUpSaga)
    yield fork(todaysMusicSaga)
    yield fork(suggestMusicSaga)
    yield fork(hnnMusicSaga)
    yield fork(top100Saga)
}
