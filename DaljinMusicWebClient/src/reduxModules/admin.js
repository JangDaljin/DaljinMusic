import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { post } from './Request/request'

export const FETCH_MUSIC_UPLOAD = 'admin/FETCH_MUSIC_UPLOAD'
export const fetchMusicUpload = createAction(FETCH_MUSIC_UPLOAD)

export const ACCEPT_MUSIC_UPLOAD = 'admin/ACCEPT_MUSIC_UPLOAD'
export const acceptMusicUpload = createAction(ACCEPT_MUSIC_UPLOAD)

export const ABORT_MUSIC_UPLOAD = 'admin/ABORT_MUSIC_UPLOAD'
export const abortMusicUpload = createAction(ABORT_MUSIC_UPLOAD)

const initialAdminState = {
    isAdmin : false,
}

export const adminReducer = handleActions({
    [ACCEPT_MUSIC_UPLOAD] : (state , action) => {
        const newState = {...state}
        const { message } = action.payload
        window.alert(message)
        return newState
    },
    [ABORT_MUSIC_UPLOAD] : (state , action) => {
        const newState = { ...initialAdminState }
        return newState
    }
} , initialAdminState)

function* fetchMusicUploadSaga(action) {
    const { songs , singers , albums , musicFiles } = action.payload
    const formData = new FormData()
    formData.append('songs' , JSON.stringify(songs))
    formData.append('singers' , JSON.stringify(singers))
    formData.append('albums' , JSON.stringify(albums.map((value) => ({'name' : value.name , '_id' : value._id , 'isThere' : value.isThere , 'index' : value.index}))))
    for(const album of albums) {
        if(album.isThere) {
            formData.append('albumImgFiles' , album.file)
        }
    }

    for(const file of musicFiles) {
        formData.append('musicFiles' , file)
    }

    yield post(`/admin/musicupload` , {} , formData , ACCEPT_MUSIC_UPLOAD , ABORT_MUSIC_UPLOAD)
}

export function* adminSaga() {
    yield takeLatest(FETCH_MUSIC_UPLOAD , fetchMusicUploadSaga)
}