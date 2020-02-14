import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'
import { todaysLiveReducer as todaysLive , todaysLiveSaga } from './todaysLive'
import { suggestMusicsReducer as suggestMusics , suggestMusicsSaga } from './suggestMusics'
import { hotAndNewMusicsReducer as hotAndNewMusics , hotAndNewMusicsSaga } from './hotAndNewMusics'
import { top100MusicsReducer as top100Musics , top100MusicsSaga } from './top100Musics'
import { authReducer as auth , authSaga } from './auth'
import { myMusicsReducer as myMusics , myMusicsSaga } from './myMusics'
import { searchReducer as search , searchSaga } from './search'
import { musicPlayerReducer as musicPlayer , musicPlayerSaga } from './musicPlayer'
export const rootReducer = combineReducers({
    todaysLive,
    suggestMusics,
    hotAndNewMusics,
    top100Musics,
    auth,
    myMusics,
    search,
    musicPlayer,
})


export function* rootSaga() {
    yield fork(todaysLiveSaga)
    yield fork(suggestMusicsSaga)
    yield fork(hotAndNewMusicsSaga)
    yield fork(top100MusicsSaga)
    yield fork(authSaga)
    yield fork(myMusicsSaga)
    yield fork(searchSaga)
    yield fork(musicPlayerSaga)
}
