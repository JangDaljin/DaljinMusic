import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put } from 'redux-saga/effects'
import { List , fromJS } from 'immutable'
import { post} from './Request/request'

export const FETCH_GET_MYMUSICLISTS = 'mymusics/FETCTGETMUSICLISTS'
export const fetchGetMyMusicLists = createAction(FETCH_GET_MYMUSICLISTS)

export const ACCEPT_GET_MYMUSICLISTS = 'mymusics/ACCEPTGETMUSICLISTS'
export const acceptGetMyMusicLists = createAction(ACCEPT_GET_MYMUSICLISTS)

export const ABORT_GET_MYMUSICLISTS = 'mymusics/ABORTGETMYMUSICLISTS'
export const abortGetMyMusicLists = createAction(ABORT_GET_MYMUSICLISTS)

export const FETCH_UPLOAD_FILE = 'mymusics/FETCHUPLOADFILE'
export const fetchUploadFile = createAction(FETCH_UPLOAD_FILE)

export const ACCEPT_UPLOAD_FILE = 'mymusics/ACCEPTUPLOADFILE'
export const acceptUploadFile = createAction(ACCEPT_UPLOAD_FILE)

export const ABORT_UPLOAD_FILE = 'mymusics/ABORTUPLOADFILE'
export const abortUploadFile = createAction(ABORT_UPLOAD_FILE)

export const FETCH_MAKE_MUSIC_LIST = 'mymusics/FETCH_MAKE_MUSIC_LIST'
export const fetchMakeMusicList = createAction(FETCH_MAKE_MUSIC_LIST)

export const ACCEPT_MAKE_MUSIC_LIST = 'mymusics/ACCEPT_MAKE_MUSIC_LIST'
export const acceptMakeMusicList = createAction(ACCEPT_MAKE_MUSIC_LIST)

export const ABORT_MAKE_MUSIC_LIST = 'mymusics/ABORT_MAKE_MUSIC_LIST'
export const abortMakeMusicList = createAction(ABORT_MAKE_MUSIC_LIST)

export const FETCH_DELETE_MUSIC_LIST = 'mymusics/FETCH_DELETE_MUSIC_LIST'
export const fetchDeleteMusicList = createAction(FETCH_DELETE_MUSIC_LIST)

export const ACCEPT_DELETE_MUSIC_LIST = 'mymusics/ACCEPT_DELETE_MUSIC_LIST'
export const acceptDeleteMusicList = createAction(ACCEPT_DELETE_MUSIC_LIST)

export const ABORT_DELETE_MUSIC_LIST = 'mymusics/ABORT_DELETE_MUSIC_LIST'
export const abortDeleteMusicList = createAction(ABORT_DELETE_MUSIC_LIST)

export const FETCH_RENAME_MUSIC_LIST = 'mymusics/FETCH_RENAME_MUSIC_LIST'
export const fetchRenameMusicList = createAction(FETCH_RENAME_MUSIC_LIST)

export const ACCEPT_RENAME_MUSIC_LIST = 'mymusics/ACCEPT_RENAME_MUSIC_LIST'
export const acceptRenameMusicList = createAction(ACCEPT_RENAME_MUSIC_LIST)

export const ABORT_RENAME_MUSIC_LIST = 'mymusics/ABORT_RENAME_MUSIC_LIST'
export const abortRenameMusicList = createAction(ABORT_RENAME_MUSIC_LIST)

export const FETCH_ADD_MUSIC_IN_LIST = 'mymusics/FETCHADDMUSICINLIST'
export const fetchAddMusicInList = createAction(FETCH_ADD_MUSIC_IN_LIST)

export const ACCEPT_ADD_MUSIC_IN_LIST = 'mymusics/ACCEPTADDMUSICINLIST'
export const acceptAddMusicInList = createAction(ACCEPT_ADD_MUSIC_IN_LIST)

export const ABORT_ADD_MUSIC_IN_LIST = 'mymusics/ABORTADDMUSICINLIST'
export const abortAddMusicInList = createAction(ABORT_ADD_MUSIC_IN_LIST)

export const FETCH_REMOVE_MUSIC_IN_LIST = 'mymusics/FETCHREMOVEMUSICINLIST'
export const fetchRemoveMusicInList = createAction(FETCH_REMOVE_MUSIC_IN_LIST)

export const ACCEPT_REMOVE_MUSIC_IN_LIST = 'mymusics/ACCEPTREMOVEMUSICINLIST'
export const acceptRemoveMusicInList = createAction(ACCEPT_REMOVE_MUSIC_IN_LIST)

export const ABORT_REMOVE_MUSIC_IN_LIST = 'mymusics/ABORTREMOVEMUSICINLIST'
export const abortRemoveMusicInList = createAction(ABORT_REMOVE_MUSIC_IN_LIST)

export const START_LOADING = 'mymusics/START_LOADING'
export const startLoading = createAction(START_LOADING)

export const END_LOADING = 'mymusics/END_LOADINg'
export const endLoading = createAction(END_LOADING)

const myMusicsInitialState = {

    myMusicLists : List([]),
    isLoading : true,
    /* 
    //리스트 구조
    {
        listName : '',
        list : [
            {...music}
        ]
    }
    */
}

export const myMusicsReducer = handleActions({
    [ACCEPT_GET_MYMUSICLISTS] : (state , action) => {
        const newState = { ...state }
        newState.myMusicLists = newState.myMusicLists.clear()
        const { myMusicLists} = action.payload
        myMusicLists.map(
            value => { 
                value.list.map(
                    _value => {
                    return _value;
                });
                return value})
        newState.myMusicLists = newState.myMusicLists.concat(fromJS(myMusicLists))
        return newState
    },
    [ABORT_GET_MYMUSICLISTS] : (state , action) => {
        const newState = { ...myMusicInitialState } 
        return newState
    },

    [ACCEPT_UPLOAD_FILE] : (state , action) => {
        const newState = { ...state }
        console.log("ACCEPT UPLOAD")
        return newState
    },
    [ABORT_UPLOAD_FILE] : (state , action) => {
        const newState = { ...myMusicInitialState }
        console.log("ABORT UPLOAD")
        return newState
    },
    [ACCEPT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        
        return newState
    },
    [ABORT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        return newState
    },
    [ACCEPT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        
        return newState
    },
    [ABORT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState}
        return newState
    },
    [ACCEPT_RENAME_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        return newState
    },
    [ABORT_RENAME_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        return newState
    },
    [ACCEPT_ADD_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        return newState
    },
    [ABORT_ADD_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        window.alert('아이템 추가에 실패하였습니다.')
        return newState
    },
    [ACCEPT_REMOVE_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        return newState
    },
    [ABORT_REMOVE_MUSIC_IN_LIST] : (state , action) => {
        const newState = {...myMusicInitialState }
        window.alert('삭제에 실패하였습니다.')
        return newState
    },
    [START_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = true
        return newState
    },
    [END_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = false
        return newState
    },
} , myMusicsInitialState)


function* fetchGetMyMusicListsSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/mymusic/getmusiclists` , { 'Content-Type' : 'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_MYMUSICLISTS , ABORT_GET_MYMUSICLISTS)
    yield put({type : END_LOADING})
}

function* fetchUploadSaga (action) {
    const { userId , fileList , listId } = action.payload
    const formData = new FormData()
    formData.append('userId' , userId)
    formData.append('listId' , listId)
    for(const file of fileList) {
        formData.append('fileList' , file , file.name)
    }
    yield put({type : START_LOADING})
    yield post(`/mymusic/upload` , {} , formData , ACCEPT_UPLOAD_FILE , ABORT_UPLOAD_FILE)
    yield put({type : END_LOADING})
}

function* fetchMakeMusicListSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/mymusic/makemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_MAKE_MUSIC_LIST , ABORT_MAKE_MUSIC_LIST)
    yield put({type : END_LOADING})
}

function* fetchDeleteMusicListSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/mymusic/deletemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_DELETE_MUSIC_LIST , ABORT_DELETE_MUSIC_LIST)
    yield put({type : END_LOADING})
}

function* fetchRenameMusicListSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/mymusic/renamemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_RENAME_MUSIC_LIST , ABORT_RENAME_MUSIC_LIST)
    yield put({type : END_LOADING})
}

function* fetchAddMusicInListSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/mymusic/addmusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_ADD_MUSIC_IN_LIST , ABORT_ADD_MUSIC_IN_LIST)
    yield put({type : END_LOADING})
}

function* fetchRemoveMusicInListSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/mymusic/removemusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_REMOVE_MUSIC_IN_LIST , ABORT_REMOVE_MUSIC_IN_LIST)
    yield put({type : END_LOADING})
}


export function* myMusicsSaga() {
    yield takeLatest(FETCH_GET_MYMUSICLISTS , fetchGetMyMusicListsSaga)
    yield takeLatest(FETCH_UPLOAD_FILE , fetchUploadSaga)
    yield takeLatest(FETCH_MAKE_MUSIC_LIST , fetchMakeMusicListSaga)
    yield takeLatest(FETCH_DELETE_MUSIC_LIST , fetchDeleteMusicListSaga)
    yield takeLatest(FETCH_RENAME_MUSIC_LIST , fetchRenameMusicListSaga)
    yield takeLatest(FETCH_ADD_MUSIC_IN_LIST , fetchAddMusicInListSaga)
    yield takeLatest(FETCH_REMOVE_MUSIC_IN_LIST , fetchRemoveMusicInListSaga)
}