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

export const SELECT_LIST = 'mymusic/SELECTLIST'
export const selectList = createAction(SELECT_LIST)

export const CHECK_LIST = 'mymusic/CHECK_LIST'
export const checkList = createAction(CHECK_LIST)

export const CHECK_LIST_ITEM = 'mymusic/CHECK_LIST_ITEM'
export const checkListItem = createAction(CHECK_LIST_ITEM)

export const MODAL_FETCH_UPLOAD_FILE = 'mymusic/MODALFETCHUPLOADFILE'
export const modalFetchUploadFile = createAction(MODAL_FETCH_UPLOAD_FILE)

export const MODAL_ACCEPT_UPLOAD_FILE = 'mymusic/MODALACCEPTUPLOADFILE'
export const modalAcceptUploadFile = createAction(MODAL_ACCEPT_UPLOAD_FILE)

export const MODAL_ABORT_UPLOAD_FILE = 'mymusic/MODALABORTUPLOADFILE'
export const modalAbortUploadFile = createAction(MODAL_ABORT_UPLOAD_FILE)

export const MODAL_FETCH_MAKE_MUSIC_LIST = 'mymusic/MODALFETCHMAKEMUSICLIST'
export const modalFetchMakeMusicList = createAction(MODAL_FETCH_MAKE_MUSIC_LIST)

export const MODAL_ACCEPT_MAKE_MUSIC_LIST = 'mymusic/MODALACCEPTMAKEMUSICLIST'
export const modalAcceptMakeMusicList = createAction(MODAL_ACCEPT_MAKE_MUSIC_LIST)

export const MODAL_ABORT_MAKE_MUSIC_LIST = 'mymusic/MODALABORTMAKEMUSICLIST'
export const modalAbortMakeMusicList = createAction(MODAL_ABORT_MAKE_MUSIC_LIST)

export const MODAL_FETCH_DELETE_MUSIC_LIST = 'mymusic/MODALFETCHDELETEMUSICLIST'
export const modalFetchDeleteMusicList = createAction(MODAL_FETCH_DELETE_MUSIC_LIST)

export const MODAL_ACCEPT_DELETE_MUSIC_LIST = 'mymusic/MODALACCEPTDELETEMUSICLIST'
export const modalAcceptDeleteMusicList = createAction(MODAL_ACCEPT_DELETE_MUSIC_LIST)

export const MODAL_ABORT_DELETE_MUSIC_LIST = 'mymusic/MODALABORTDELETEMUSICLIST'
export const modalAbortDeleteMusicList = createAction(MODAL_ABORT_DELETE_MUSIC_LIST)

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
    
    currentSelectedListIndex : -1,  

    myMusicLists : List([]),
    /* 
    //리스트 구조
    {
        selected : boolean,
        listName : '',
        list : [
            {
                _id : '',
                album : '',
                albumImgUri : '',
                song : '',
                singer : '',
                time : '',
                checked : '' // 클라이언트 전용
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
                value.checked = false;
                value.list.map(
                    _value => {
                    _value.checked = false;
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
    [SELECT_LIST] : (state , action) => {
        const newState = { ...state }
        const { selectedListIndex } = action.payload
        newState.currentSelectedListIndex = selectedListIndex
        newState.myMusicLists = newState.myMusicLists.map((value) => value.set('selected' , false)).setIn([selectedListIndex , 'selected'] , true)
        return newState
    },

    [CHECK_LIST] : (state , action) => {
        const newState = { ...state }
        const index = action.payload
        newState.myMusicLists = newState.myMusicLists.updateIn([index , 'checked'], (value => !value) )
        return newState
    },

    [CHECK_LIST_ITEM] : (state , action) => {
        const newState = { ...state }
        const index = action.payload
        newState.myMusicLists = newState.myMusicLists.updateIn([newState.currentSelectedListIndex , 'list' , index , 'checked'] , value => !value)
        return newState
    },
    [MODAL_ACCEPT_UPLOAD_FILE] : (state , action) => {
        const newState = { ...state }
        console.log("ACCEPT UPLOAD")
        return newState
    },
    [MODAL_ABORT_UPLOAD_FILE] : (state , action) => {
        const newState = { ...myMusicInitialState }
        console.log("ABORT UPLOAD")
        return newState
    },
    [MODAL_ACCEPT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists , message } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        window.alert(message)
        return newState
    },
    [MODAL_ABORT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        return newState
    },
    [MODAL_ACCEPT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists , message } = action.payload
        newState.myMusicLists = newState.myMusicLists.clear().concat(fromJS(myMusicLists))
        window.alert(message);
        return newState
    },
    [MODAL_ABORT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState}
        return newState
    },
    [ACCEPT_ADD_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...state }
        window.alert('추가되었습니다.')
        return newState
    },
    [ABORT_ADD_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        window.alert('아이템 추가에 실패하였습니다.')
        return newState
    },
    [ACCEPT_REMOVE_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...state }
        window.alert('삭제되었습니다.')
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
    yield post(`/mymusic/upload` , {} , formData , MODAL_ACCEPT_UPLOAD_FILE , MODAL_ABORT_UPLOAD_FILE)
}

function* fetchMakeMusicListSaga(action) {
    yield post(`/mymusic/makemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , MODAL_ACCEPT_MAKE_MUSIC_LIST , MODAL_ABORT_MAKE_MUSIC_LIST)
}

function* fetchDeleteMusicListSaga(action) {
    yield post(`/mymusic/deletemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , MODAL_ACCEPT_DELETE_MUSIC_LIST , MODAL_ABORT_DELETE_MUSIC_LIST)
}

function* fetchAddMusicInListSaga(action) {
    yield post(`/mymusic/addmusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_ADD_MUSIC_IN_LIST , ABORT_ADD_MUSIC_IN_LIST)
}

function* fetchRemoveMusicInListSaga(action) {
    yield post(`/mymusic/removemusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_REMOVE_MUSIC_IN_LIST , ABORT_REMOVE_MUSIC_IN_LIST)
}

export function* myMusicSaga() {
    yield takeLatest(FETCH_GET_MYMUSICLISTS , fetchGetMyMusicListsSaga)
    yield takeLatest(MODAL_FETCH_UPLOAD_FILE , fetchUploadSaga)
    yield takeLatest(MODAL_FETCH_MAKE_MUSIC_LIST , fetchMakeMusicListSaga)
    yield takeLatest(MODAL_FETCH_DELETE_MUSIC_LIST , fetchDeleteMusicListSaga)
    yield takeLatest(FETCH_ADD_MUSIC_IN_LIST , fetchAddMusicInListSaga)
    yield takeLatest(FETCH_REMOVE_MUSIC_IN_LIST , fetchRemoveMusicInListSaga)
}