import { createAction , handleActions } from 'redux-actions'
import { takeLatest , select , put } from 'redux-saga/effects'
import { post } from './Request/request'
import { Map , List , fromJS } from 'immutable'

export const FETCH_VALIDATE_PASSWORD = 'admin/FETCH_VALIDATE_PASSWORD'
export const fetchValidatePassword = createAction(FETCH_VALIDATE_PASSWORD)

export const ACCEPT_VALIDATE_PASSWORD = 'admin/ACCEPT_VALIDATE_PASSWORD'
export const acceptValidatePassword = createAction(ACCEPT_VALIDATE_PASSWORD)

export const ABORT_VALIDATE_PASSWORD = 'admin/ABORT_VALIDATE_PASSWORD'
export const abortValidatePassword = createAction(ABORT_VALIDATE_PASSWORD)

export const FETCH_GET_ALL_MUSICS = 'admin/FETCH_GET_ALL_MUSICS'
export const fetchGetAllMusics = createAction(FETCH_GET_ALL_MUSICS)

export const ACCEPT_GET_ALL_MUSICS = 'admin/ACCEPT_GET_ALL_MUSICS'
export const acceptGetAllMusics = createAction(ACCEPT_GET_ALL_MUSICS)

export const ABORT_GET_ALL_MUSICS = 'admin/ABORT_GET_ALL_MUSICS'
export const abortGetAllMusics = createAction(ABORT_GET_ALL_MUSICS)

export const FETCH_SET_TODAYSLIVE = 'admin/FETCH_SET_TODAYSLIVE'
export const fetchSetTodaysLive = createAction(FETCH_SET_TODAYSLIVE)

export const ACCEPT_SET_TODAYSLIVE = 'admin/ACCEPT_SET_TODAYSLIVE'
export const acceptSetTodaysLive = createAction(ACCEPT_SET_TODAYSLIVE)

export const ABORT_SET_TODAYSLIVE = 'admin/ABORT_SET_TODAYSLIVE'
export const abortSetTodaysLive = createAction(ABORT_SET_TODAYSLIVE)

export const FETCH_SET_HOTANDNEW = 'admin/FETCH_SET_HOTANDNEW'
export const fetchSetHotAndNew = createAction(FETCH_SET_HOTANDNEW)

export const ACCEPT_SET_HOTANDNEW = 'admin/ACCEPT_SET_HOTANDNEW'
export const acceptSetHotAndNew = createAction(ACCEPT_SET_HOTANDNEW)

export const ABORT_SET_HOTANDNEW = 'admin/ABORT_SET_HOTANDNEW'
export const abortSetHotAndNew = createAction(ABORT_SET_HOTANDNEW)

export const FETCH_MUSIC_UPLOAD = 'admin/FETCH_MUSIC_UPLOAD'
export const fetchMusicUpload = createAction(FETCH_MUSIC_UPLOAD)

export const ACCEPT_MUSIC_UPLOAD = 'admin/ACCEPT_MUSIC_UPLOAD'
export const acceptMusicUpload = createAction(ACCEPT_MUSIC_UPLOAD)

export const ABORT_MUSIC_UPLOAD = 'admin/ABORT_MUSIC_UPLOAD'
export const abortMusicUpload = createAction(ABORT_MUSIC_UPLOAD)

export const MENU_MODE = {
    NOTTHING : -1,
    TODAYSLIVE : 0,
    HOTANDNEW : 1,
    NEWMUSIC : 2,
}

export const CHANGE_MENU_MODE = 'admin/CHANGE_MENU_MODE'
export const changeMenuMode = createAction(CHANGE_MENU_MODE)

export const CHOICE_ITEM = 'admin/CHOICE_ITEM'
export const choiceItem = createAction(CHOICE_ITEM)

export const CLEAR_CHOOSE_ITEM = 'admin/CLEAR_CHOOSE_ITEM'
export const clearChooseItem = createAction(CLEAR_CHOOSE_ITEM)

export const SET_HOTANDNEWMUSIC = 'admin/SETTING_HOTANDNEWMUSIC'
export const setHotAndNewMusic = createAction(SET_HOTANDNEWMUSIC)

export const DELETE_CHOSEN_HOTANDNEWMUSIC = 'admin/DELETE_CHOSEN_HOTANDNEWMUSIC'
export const deleteChosenHotAndNewMusic = createAction(DELETE_CHOSEN_HOTANDNEWMUSIC)

export const FETCH_DELETE_SAVED_HOTANDNEWMUSIC = 'admin/FETCH_DELETE_SAVED_HOTANDNEWMUSIC'
export const fetchDeleteSavedHotAndNew = createAction(FETCH_DELETE_SAVED_HOTANDNEWMUSIC)

export const ACCEPT_DELETE_SAVED_HOTANDNEWMUSIC = 'admin/ACCEPT_DELETE_SAVED_HOTANDNEWMUSIC'
export const acceptDeleteSavedHotAndNew = createAction(ACCEPT_DELETE_SAVED_HOTANDNEWMUSIC)

export const ABORT_DELETE_SAVED_HOTANDNEWMUSIC = 'admin/ABORT_DELETE_SAVED_HOTANDNEWMUSIC'
export const abortDeleteSavedHotAndNew = createAction(ABORT_DELETE_SAVED_HOTANDNEWMUSIC)


export const FETCH_SAVE = 'admin/FETCH_SAVE'
export const fetchSave = createAction(FETCH_SAVE)

export const RERENDER_END = 'admin/RERENDER_END'
export const reRenderEnd = createAction(RERENDER_END)

const initialAdminState = {
    isAdmin : false,
    adminKey : null,

    menuMode : MENU_MODE.NOTTHING,

    searchList : List(),
    chosenTodaysLive : Map(),
    chosenHotAndNewMusics : List(),

    reRender : false,
}

export const adminReducer = handleActions({
    [ACCEPT_VALIDATE_PASSWORD] : (state , action) => {
        const newState = { ...state }
        const { adminKey , isAdmin } = action.payload

        if(typeof adminKey === 'string' && adminKey.trim() !== '') {
            newState.isAdmin = isAdmin
            newState.adminKey = adminKey
        }

        if(!newState.isAdmin) {
            window.alert('비밀번호가 틀렸습니다.')
        }
        return newState
    },

    [ABORT_VALIDATE_PASSWORD] : (state , action) => {
        const newState = { ...state }
        window.alert('서버와 통신 불가')
        return newState
    },

    [CHANGE_MENU_MODE] : (state , action) => {
        const newState = { ...state }
        newState.menuMode = action.payload
        return newState
    },

    

    [CHOICE_ITEM] : (state , action) => {
        const newState = { ...state }
        const chosenItem = action.payload
        switch(newState.menuMode) {
            case MENU_MODE.TODAYSLIVE :
                newState.chosenTodaysLive = chosenItem
                break;
            case MENU_MODE.HOTANDNEW : 
                newState.chosenHotAndNewMusics = newState.chosenHotAndNewMusics.push(
                    Map({
                        'music' : fromJS(chosenItem),
                        'hot' : false,
                        'new' : false,
                    }))
                break;
            default : 

                break;
        }
        return newState
    },

    [CLEAR_CHOOSE_ITEM] : (state , action) => {
        const newState = { ...state }
        newState.chosenHotAndNewMusics = newState.chosenHotAndNewMusics.clear()
        newState.chosenTodaysLive = newState.chosenTodaysLive.clear()
        return newState
    },

    [SET_HOTANDNEWMUSIC] : (state , action) => {
        const newState = { ...state }
        const { index  , hotValue , newValue } = action.payload
        newState.chosenHotAndNewMusics = newState.chosenHotAndNewMusics.setIn([index , 'hot'] , hotValue).setIn([index , 'new'] , newValue)
        return newState
    },

    [DELETE_CHOSEN_HOTANDNEWMUSIC] : (state , action) => {
        const newState = { ...state }
        newState.chosenHotAndNewMusics = newState.chosenHotAndNewMusics.splice(action.payload , 1)
        return newState
    },

    [ACCEPT_DELETE_SAVED_HOTANDNEWMUSIC] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        newState.reRender = true
        return newState
    },

    [ABORT_DELETE_SAVED_HOTANDNEWMUSIC] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },

    [ACCEPT_GET_ALL_MUSICS] : (state , action) => {
        const newState = { ...state }
        const { searchList } = action.payload
        newState.searchList = newState.searchList.concat(fromJS(searchList))
        return newState
    },

    [ABORT_GET_ALL_MUSICS] : (state , aciton) => {
        const newState = { ...state }
        newState.searchList = newState.searchList.clear()
        return newState
    },

    [ACCEPT_SET_TODAYSLIVE] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        newState.reRender = true
        return newState
    },

    [ABORT_SET_TODAYSLIVE] : (state , action) => {
        const newState = { ...state }
        //할일 없음
        return newState
    },

    [ACCEPT_SET_HOTANDNEW] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        newState.reRender = true
        return newState
    },
    [ABORT_SET_HOTANDNEW] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },

    [ACCEPT_MUSIC_UPLOAD] : (state , action) => {
        const newState = {...state}
        const { message } = action.payload
        window.alert(message)
        return newState
    },
    [ABORT_MUSIC_UPLOAD] : (state , action) => {
        const newState = { ...initialAdminState }
        return newState
    },

    [RERENDER_END] : (state , action) => {
        const newState = {...state}
        newState.reRender = false
        return newState
    },

} , initialAdminState)

function* fetchValidatePasswordSaga(action) {
    yield post('/admin/validate' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_VALIDATE_PASSWORD , ABORT_VALIDATE_PASSWORD)
}

function* fetchGetAllMusicsSaga(action) {
    yield post('/admin/getallmusics' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_ALL_MUSICS , ABORT_GET_ALL_MUSICS)
}

function* fetchSetTodaysLiveSaga(action) {
    yield post('/admin/settodayslive' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_SET_TODAYSLIVE , ABORT_SET_TODAYSLIVE)
}

function* fetchSetHotAndNewSaga(action) {
    yield post('/admin/sethotandnew' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_SET_HOTANDNEW , ABORT_SET_HOTANDNEW)
}

function* fetchDeleteSavedHotAndNewSaga(action) {
    yield post('/admin/deletesavedhotandnew' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_DELETE_SAVED_HOTANDNEWMUSIC , ABORT_DELETE_SAVED_HOTANDNEWMUSIC)
}

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

function* fetchSaveSaga(action) {
    const state = yield select(state => state.admin)
    const adminKey = action.payload

    switch(state.menuMode) {
        case MENU_MODE.TODAYSLIVE :
            const musicId = state.chosenTodaysLive.get('_id')
            yield put({'type' : FETCH_SET_TODAYSLIVE , 'payload' : { 'adminKey' :  adminKey , 'musicId' : musicId } })
            break;
        case MENU_MODE.HOTANDNEW :
            const saveList = state.chosenHotAndNewMusics.toJS()
            yield put({'type' : FETCH_SET_HOTANDNEW , 'payload' : { 'adminKey' : adminKey , 'saveList' : saveList}})
            break;
        default : 
            console.log(`비정상적 작동`)
            break;
    }

}

export function* adminSaga() {
    yield takeLatest(FETCH_VALIDATE_PASSWORD , fetchValidatePasswordSaga)
    yield takeLatest(FETCH_GET_ALL_MUSICS , fetchGetAllMusicsSaga)
    yield takeLatest(FETCH_SET_TODAYSLIVE , fetchSetTodaysLiveSaga)

    yield takeLatest(FETCH_SET_HOTANDNEW , fetchSetHotAndNewSaga)
    yield takeLatest(FETCH_DELETE_SAVED_HOTANDNEWMUSIC , fetchDeleteSavedHotAndNewSaga)

    yield takeLatest(FETCH_MUSIC_UPLOAD , fetchMusicUploadSaga)
    yield takeLatest(FETCH_SAVE , fetchSaveSaga)
}