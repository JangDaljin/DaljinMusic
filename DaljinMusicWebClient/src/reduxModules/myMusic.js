import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { List , fromJS } from 'immutable'
import { post } from './Request/request'
export const FETCH_GET_MYMUSICLISTS = 'mymusic/FETCTGETMUSICLISTS'
export const fetchGetMyMusicLists = createAction(FETCH_GET_MYMUSICLISTS)

export const ACCEPT_GET_MYMUSICLISTS = 'mymusic/ACCEPTGETMUSICLISTS'
export const acceptGetMyMusicLists = createAction(ACCEPT_GET_MYMUSICLISTS)

export const ABORT_GET_MYMUSICLISTS = 'mymusic/ABORTGETMYMUSICLISTS'
export const abortGetMyMusicLists = createAction(ABORT_GET_MYMUSICLISTS)

export const FETCH_UPLOAD_FILE = 'mymusic/FETCHUPLOADFILE'
export const fetchUploadFile = createAction(FETCH_UPLOAD_FILE)

export const ACCEPT_UPLOAD_FILE = 'mymusic/ACCEPTUPLOADFILE'
export const acceptUploadFile = createAction(ACCEPT_UPLOAD_FILE)

export const ABORT_UPLOAD_FILE = 'mymusic/ABORTUPLOADFILE'
export const abortUploadFile = createAction(ABORT_UPLOAD_FILE)

export const FETCH_MAKE_MUSIC_LIST = 'mymusic/FETCH_MAKE_MUSIC_LIST'
export const fetchMakeMusicList = createAction(FETCH_MAKE_MUSIC_LIST)

export const ACCEPT_MAKE_MUSIC_LIST = 'mymusic/ACCEPT_MAKE_MUSIC_LIST'
export const acceptMakeMusicList = createAction(ACCEPT_MAKE_MUSIC_LIST)

export const ABORT_MAKE_MUSIC_LIST = 'mymusic/ABORT_MAKE_MUSIC_LIST'
export const abortMakeMusicList = createAction(ABORT_MAKE_MUSIC_LIST)

export const FETCH_DELETE_MUSIC_LIST = 'mymusic/FETCH_DELETE_MUSIC_LIST'
export const fetchDeleteMusicList = createAction(FETCH_DELETE_MUSIC_LIST)

export const ACCEPT_DELETE_MUSIC_LIST = 'mymusic/ACCEPT_DELETE_MUSIC_LIST'
export const acceptDeleteMusicList = createAction(ACCEPT_DELETE_MUSIC_LIST)

export const ABORT_DELETE_MUSIC_LIST = 'mymusic/ABORT_DELETE_MUSIC_LIST'
export const abortDeleteMusicList = createAction(ABORT_DELETE_MUSIC_LIST)

export const FETCH_RENAME_MUSIC_LIST = 'mymusic/FETCH_RENAME_MUSIC_LIST'
export const fetchRenameMusicList = createAction(FETCH_RENAME_MUSIC_LIST)

export const ACCEPT_RENAME_MUSIC_LIST = 'mymusic/ACCEPT_RENAME_MUSIC_LIST'
export const acceptRenameMusicList = createAction(ACCEPT_RENAME_MUSIC_LIST)

export const ABORT_RENAME_MUSIC_LIST = 'mymusic/ABORT_RENAME_MUSIC_LIST'
export const abortRenameMusicList = createAction(ABORT_RENAME_MUSIC_LIST)

export const FETCH_ADD_MUSIC_IN_LIST = 'mymusic/FETCHADDMUSICINLIST'
export const fetchAddMusicInList = createAction(FETCH_ADD_MUSIC_IN_LIST)

export const ACCEPT_ADD_MUSIC_IN_LIST = 'mymusic/ACCEPTADDMUSICINLIST'
export const acceptAddMusicInList = createAction(ACCEPT_ADD_MUSIC_IN_LIST)

export const ABORT_ADD_MUSIC_IN_LIST = 'mymusic/ABORTADDMUSICINLIST'
export const abortAddMusicInList = createAction(ABORT_ADD_MUSIC_IN_LIST)

export const FETCH_REMOVE_MUSIC_IN_LIST = 'mymusic/FETCHREMOVEMUSICINLIST'
export const fetchRemoveMusicInList = createAction(FETCH_REMOVE_MUSIC_IN_LIST)

export const ACCEPT_REMOVE_MUSIC_IN_LIST = 'mymusic/ACCEPTREMOVEMUSICINLIST'
export const acceptRemoveMusicInList = createAction(ACCEPT_REMOVE_MUSIC_IN_LIST)

export const ABORT_REMOVE_MUSIC_IN_LIST = 'mymusic/ABORTREMOVEMUSICINLIST'
export const abortRemoveMusicInList = createAction(ABORT_REMOVE_MUSIC_IN_LIST)



const myMusicInitialState = {

    myMusicLists : List([]),
    /* 
    //리스트 구조
    {
        selected : boolean,
        listName : '',
        list : [
            {
                _id : '',
                album : {
                    _id : '',
                    name : '',
                },
                albumImgUri : '',
                song : '',
                singer : {
                    _id : '',
                    name : '',
                },
                duration : '',
            }
        ]
    }
    */
}

export const myMusicReducer = handleActions({
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
    }
} , myMusicInitialState)


function* fetchGetMyMusicListsSaga(action) {
    yield post(`/mymusic/getmusiclists` , { 'Content-Type' : 'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_MYMUSICLISTS , ABORT_GET_MYMUSICLISTS)
}

function* fetchUploadSaga (action) {
    const { userId , fileList , listId } = action.payload
    const formData = new FormData()
    formData.append('userId' , userId)
    formData.append('listId' , listId)
    for(const file of fileList) {
        formData.append('fileList' , file , file.name)
    }
    yield post(`/mymusic/upload` , {} , formData , ACCEPT_UPLOAD_FILE , ABORT_UPLOAD_FILE)
}

function* fetchMakeMusicListSaga(action) {
    yield post(`/mymusic/makemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_MAKE_MUSIC_LIST , ABORT_MAKE_MUSIC_LIST)
}

function* fetchDeleteMusicListSaga(action) {
    yield post(`/mymusic/deletemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_DELETE_MUSIC_LIST , ABORT_DELETE_MUSIC_LIST)
}

function* fetchRenameMusicListSaga(action) {
    yield post(`/mymusic/renamemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_RENAME_MUSIC_LIST , ABORT_RENAME_MUSIC_LIST)
}

function* fetchAddMusicInListSaga(action) {
    yield post(`/mymusic/addmusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_ADD_MUSIC_IN_LIST , ABORT_ADD_MUSIC_IN_LIST)
}

function* fetchRemoveMusicInListSaga(action) {
    yield post(`/mymusic/removemusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_REMOVE_MUSIC_IN_LIST , ABORT_REMOVE_MUSIC_IN_LIST)
}


export function* myMusicSaga() {
    yield takeLatest(FETCH_GET_MYMUSICLISTS , fetchGetMyMusicListsSaga)
    yield takeLatest(FETCH_UPLOAD_FILE , fetchUploadSaga)
    yield takeLatest(FETCH_MAKE_MUSIC_LIST , fetchMakeMusicListSaga)
    yield takeLatest(FETCH_DELETE_MUSIC_LIST , fetchDeleteMusicListSaga)
    yield takeLatest(FETCH_RENAME_MUSIC_LIST , fetchRenameMusicListSaga)
    yield takeLatest(FETCH_ADD_MUSIC_IN_LIST , fetchAddMusicInListSaga)
    yield takeLatest(FETCH_REMOVE_MUSIC_IN_LIST , fetchRemoveMusicInListSaga)
}