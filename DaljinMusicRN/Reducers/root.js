import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'
import { todaysLiveReducer as todaysLive , todaysLiveSaga } from './todaysLive'
import { suggestMusicsReducer as suggestMusics , suggestMusicsSaga } from './suggestMusics'
import { hotAndNewMusicsReducer as hotAndNewMusics , hotAndNewMusicsSaga } from './hotAndNewMusics'
import { top100MusicsReducer as top100Musics , top100MusicsSaga } from './top100Musics'

export const rootReducer = combineReducers({
    todaysLive,
    suggestMusics,
    hotAndNewMusics,
    top100Musics,
})


export function* rootSaga() {
    yield fork(todaysLiveSaga)
    yield fork(suggestMusicsSaga)
    yield fork(hotAndNewMusicsSaga)
    yield fork(top100MusicsSaga)
}
