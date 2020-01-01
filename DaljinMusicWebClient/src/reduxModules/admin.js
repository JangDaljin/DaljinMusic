import { createAction , handleActions } from 'redux-actions'
import { takeLatest , select , put , call} from 'redux-saga/effects'
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

export const FETCH_MUSIC_UPLOAD = 'admin/FETCH_MUSIC_UPLOAD'
export const fetchMusicUpload = createAction(FETCH_MUSIC_UPLOAD)

export const SET_NEWMUSICDATA = 'admin/SET_NEWMUSICDATA'
export const setNewMusicData = createAction(SET_NEWMUSICDATA)

export const SET_NEWMUSICDATA_END = 'admin/SET_NEWMUSICDATA_END'
export const setNewMusicDataEnd = createAction(SET_NEWMUSICDATA_END)

export const ACCEPT_MUSIC_UPLOAD = 'admin/ACCEPT_MUSIC_UPLOAD'
export const acceptMusicUpload = createAction(ACCEPT_MUSIC_UPLOAD)

export const ABORT_MUSIC_UPLOAD = 'admin/ABORT_MUSIC_UPLOAD'
export const abortMusicUpload = createAction(ABORT_MUSIC_UPLOAD)

export const FETCH_GET_CATEGORIES = 'admin/FETCH_GET_CATEGORIES'
export const fetchGetCategories = createAction(FETCH_GET_CATEGORIES)

export const ACCEPT_GET_CATEGORIES = 'admin/ACCEPT_GET_CATEGORIES'
export const acceptGetCategories = createAction(ACCEPT_GET_CATEGORIES)

export const ABORT_GET_CATEGORIES = 'admin/ABORT_GET_CATEGORIES'
export const abortGetCategories = createAction(ABORT_GET_CATEGORIES)

export const FETCH_ADD_CATEGORY = 'admin/FETCH_ADD_CATEGORY'
export const fetchAddCategory = createAction(FETCH_ADD_CATEGORY)

export const ACCEPT_ADD_CATEGORY = 'admin/ACCEPT_ADD_CATEGORY'
export const acceptAddCategory = createAction(ACCEPT_ADD_CATEGORY)

export const ABORT_ADD_CATEGORY = 'admin/ABORT_ADD_CATEGORY'
export const abortAddCategory = createAction(ABORT_ADD_CATEGORY)

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

export const SET_HOT_AND_NEW_AND_BOTH = 'admin/SET_HOT_AND_NEW_AND_BOTH'
export const setHotAndNewAndBoth = createAction(SET_HOT_AND_NEW_AND_BOTH)

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

export const FETCH_HOTANDNEW_SAVE = 'admin/FETCH_HOTANDNEW_SAVE'
export const fetchHotAndNewSave = createAction(FETCH_HOTANDNEW_SAVE)

export const ACCEPT_HOTANDNEW_SAVE = 'admin/ACCEPT_HOTANDNEW_SAVE'
export const acceptHotAndNewSave = createAction(ACCEPT_HOTANDNEW_SAVE)

export const ABORT_HOTANDNEW_SAVE = 'admin/ABORT_HOTANDNEW_SAVE'
export const abortHotAndNewSave = createAction(ABORT_HOTANDNEW_SAVE)

export const FETCH_TODAYSLIVE_SAVE = 'admin/FETCH_TODAYSLIVE_SAVE'
export const fetchTodaysLiveSave = createAction(FETCH_TODAYSLIVE_SAVE)

export const ACCEPT_TODAYSLIVE_SAVE = 'admin/ACCEPT_TODAYSLIVE_SAVE'
export const acceptTodaysLiveSave = createAction(ACCEPT_TODAYSLIVE_SAVE)

export const ABORT_TODAYSLIVE_SAVE = 'admin/ABORT_TODAYSLIVE_SAVE'
export const abortTodaysLiveSave = createAction(ABORT_TODAYSLIVE_SAVE)

export const RERENDER_END = 'admin/RERENDER_END'
export const reRenderEnd = createAction(RERENDER_END)


const initialAdminState = {
    isAdmin : false,
    adminKey : null,

    menuMode : MENU_MODE.NOTTHING,

    searchList : List(),
    chosenTodaysLive : Map(),
    chosenHotAndNewMusics : List(),

    musicCategories : List(),
    newMusicData : List(),

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


    [SET_HOT_AND_NEW_AND_BOTH] : (state , action) => {
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

    [ACCEPT_GET_CATEGORIES] : (state , action) => {
        const newState = { ...state }
        const { categories } = action.payload
        newState.musicCategories = newState.musicCategories.clear().concat(fromJS(categories))
        return newState
    },

    [ABORT_GET_CATEGORIES] : (state , aciton) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_ADD_CATEGORY] : (state , action) => {
        const newState = { ...state }
        const { message , categories } = action.payload
        newState.musicCategories = newState.musicCategories.clear().concat(fromJS(categories))
        window.alert(message)
        return newState
    },
    
    [ABORT_ADD_CATEGORY] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },

    [ACCEPT_TODAYSLIVE_SAVE] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },

    [ABORT_TODAYSLIVE_SAVE] : (state , action) => {
        const newState = { ...state }
        //할일 없음
        return newState
    },

    [ACCEPT_HOTANDNEW_SAVE] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        
        newState.chosenHotAndNewMusics = newState.chosenHotAndNewMusics.clear()
        newState.reRender = true
        return newState
    },
    [ABORT_HOTANDNEW_SAVE] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },

    [SET_NEWMUSICDATA_END] : (state , action) => {
        const newState = { ...state }
        const newMusicData = action.payload
        newState.newMusicData = newMusicData
        return newState
    },

    [ACCEPT_MUSIC_UPLOAD] : (state , action) => {
        const newState = {...state}
        const { message , complete } = action.payload
        if(message !== '') {
            window.alert(message)
        }
        for(let i = complete.length -1  ; i > -1; i--) {
            if(complete[i]) {
                newState.newMusicData = newState.newMusicData.splice(i , 1)
            }
        }
        return newState
    },
    [ABORT_MUSIC_UPLOAD] : (state , action) => {
        const newState = { ...state }
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



function* fetchDeleteSavedHotAndNewSaga(action) {
    yield post('/admin/deletesavedhotandnew' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_DELETE_SAVED_HOTANDNEWMUSIC , ABORT_DELETE_SAVED_HOTANDNEWMUSIC)
}

function* setNewMusicDataSaga(action) {
    let newMusicData = action.payload
    const state = yield select(state => state.admin)
    

    for(let index = 0 ; index < newMusicData.size; index++) {
            if(newMusicData.getIn([index , 'singer']) !== state.newMusicData.getIn([index , 'singer'])) {
                const response = yield call (fetch ,`${process.env.REACT_APP_SERVER}/search/singeridbyname?name=${newMusicData.getIn([index , 'singer'])}`)
                if(response.ok) {
                    const fetchResult = yield call([response , 'json'])
                    newMusicData = newMusicData.setIn([index , 'singerDatabaseId'] , fetchResult._id)
                }
            }

            if(newMusicData.getIn([index , 'album']) !== state.newMusicData.getIn([index , 'album'])) {
                const response = yield call (fetch , `${process.env.REACT_APP_SERVER}/search/albumidbyname?singer=${newMusicData.getIn([index , 'singer'])}&name=${newMusicData.getIn([index , 'album'])}`)
                if(response.ok) {
                    const fetchResult = yield call([response , 'json'])
                    newMusicData = newMusicData.setIn([index , 'albumDatabaseId'] , fetchResult._id)
                }
            }
    }
        

    yield put({type : SET_NEWMUSICDATA_END , payload : newMusicData})
}

function* fetchMusicUploadSaga(action) {
    const { adminKey , newMusicData } = action.payload

    const formData = new FormData()
    

    const songs = []
    const singers = []
    const albums = []
    const categories =[]

    let albumImgIndexCount = 0

    newMusicData.forEach(
        (value) => {
                singers.push({ 'name' : value.get('singer') , 'singerDatabaseId' : value.get('singerDatabaseId') === null? '' : value.get('singerDatabaseId') })
                songs.push({ 'name' : value.get('song') })
                albums.push({ 
                    'name' : value.get('album') , 
                    'albumDatabaseId' : value.get('albumDatabaseId') === null? '' : value.get('albumDatabaseId'),
                    'albumImgIndex' : value.get('withAlbumImg') ? albumImgIndexCount++ : -1,
                })
                categories.push({ 'category' : value.get('category') })
                
                
                if(value.get('withAlbumImg'))
                    formData.append('albumImgFiles' , value.get('albumImgFile'))
                formData.append('musicFiles' , value.get('musicFile'))
        }
    )

    formData.append('adminKey' , JSON.stringify(adminKey))
    formData.append('songs' , JSON.stringify(songs))
    formData.append('singers' , JSON.stringify(singers))
    formData.append('albums' , JSON.stringify(albums))
    formData.append('categories' , JSON.stringify(categories))


    yield post(`/admin/musicupload` , {} , formData , ACCEPT_MUSIC_UPLOAD , ABORT_MUSIC_UPLOAD)
}

function* fetchTodaysLiveSaveSaga(action) {
    yield post('/admin/todayslivesave' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_TODAYSLIVE_SAVE , ABORT_TODAYSLIVE_SAVE)
}
function* fetchHotAndNewSaveSaga(action) {
    yield post('/admin/hotandnewsave' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_HOTANDNEW_SAVE , ABORT_HOTANDNEW_SAVE)
}

function* fetchGetCategoriesSaga (action) {
    yield post('/admin/getcategories' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_CATEGORIES , ABORT_GET_CATEGORIES)
}

function * fetchAddCategorySaga (action) {
    yield post('/admin/addcategory' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_ADD_CATEGORY , ABORT_ADD_CATEGORY)
}

export function* adminSaga() {
    yield takeLatest(FETCH_VALIDATE_PASSWORD , fetchValidatePasswordSaga)
    yield takeLatest(FETCH_GET_ALL_MUSICS , fetchGetAllMusicsSaga)

    yield takeLatest(FETCH_GET_CATEGORIES , fetchGetCategoriesSaga)
    yield takeLatest(FETCH_ADD_CATEGORY , fetchAddCategorySaga)

    yield takeLatest(FETCH_TODAYSLIVE_SAVE , fetchTodaysLiveSaveSaga)
    yield takeLatest(FETCH_HOTANDNEW_SAVE , fetchHotAndNewSaveSaga)

    yield takeLatest(FETCH_DELETE_SAVED_HOTANDNEWMUSIC , fetchDeleteSavedHotAndNewSaga)

    yield takeLatest(SET_NEWMUSICDATA , setNewMusicDataSaga)
    yield takeLatest(FETCH_MUSIC_UPLOAD , fetchMusicUploadSaga)

}