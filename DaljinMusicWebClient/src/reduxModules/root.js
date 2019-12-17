import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'
import { authReducer as auth , authSaga} from './auth'
import { signUpReducer as signUp , signUpSaga } from './signUp'
import { todaysMusicReducer as todaysMusic , todaysMusicSaga } from './todaysMusic'
import { suggestMusicReducer as suggestMusic , suggestMusicSaga } from './suggestMusic'
import { hotAndNewReducer as hotAndNew , hotAndNewSaga } from './hotnNewMusic'
import { top100Reducer as top100 , top100Saga } from './top100'
import { myMusicReducer as myMusic , myMusicSaga} from './myMusic'
import { adminReducer as admin , adminSaga} from './admin'
import { searchReducer as search , searchSaga } from './search'
import { musicPlayerReducer as musicPlayer , musicPlayerSaga} from './musicPlayer'
import { modalReducer as modal } from './modal'
import { messageReducer as message , messageSaga } from './message'

export const rootReducer = combineReducers({
    auth,
    signUp,
    todaysMusic,
    suggestMusic,
    hotAndNew,
    top100,
    myMusic,
    admin,
    search,
    musicPlayer,
    modal,
    message,
})


export function *rootSaga() {
    yield fork(authSaga)
    yield fork(signUpSaga)
    yield fork(todaysMusicSaga)
    yield fork(suggestMusicSaga)
    yield fork(hotAndNewSaga)
    yield fork(top100Saga)
    yield fork(myMusicSaga)
    yield fork(adminSaga)
    yield fork(searchSaga)
    yield fork(musicPlayerSaga)
    yield fork(messageSaga)
}
