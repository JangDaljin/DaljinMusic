import { createActions , handleActions } from 'redux-actions'
import { List , Map } from 'immutable'


export const CHANGE_CHECKED = 'mp/CHANGE_CHECKED'
export const changeChecked = createActions(CHANGE_CHECKED)

export const ADD_LIST_ITEM = 'mp/ADD_LIST_ITEM'
export const addListItem = createActions(ADD_LIST_ITEM)

export const REMOVE_LIST_ITEM_BY_INDEX = 'mp/REMOVE_LIST_ITEM_BY_INDEX'
export const removeListItemByIndex = createActions(REMOVE_LIST_ITEM_BY_INDEX)

export const REMOVE_CHECKED_ITEM = 'mp/REMOVE_CHECKED_ITEM'
export const removeCheckedItem = createActions(REMOVE_CHECKED_ITEM)

export const CHANGE_PLAYING_OPTION = 'mp/CHANGE_PLAYING_OPTION'
export const changePlayingOption = createActions(CHANGE_PLAYING_OPTION)

export const CHANGE_CURRENT_DURATION = 'mp/CHANGE_CURRENT_DURATION'
export const changeCurrentDuration = createActions(CHANGE_CURRENT_DURATION)



const musicPlayerInitialState = {
    playList : List([]),// Map({ song : ### , album : ### , singer : ### , duration : ### , checked : ###})
    currentMusicIndex : 0,
    currentDuration : 0,
    playingOption : Map({
        loop : false,
        only : false,
        random : false,
    })
}

export const musicPlayerReducer = handleActions({
    [CHANGE_CHECKED] : (state , action) => {
        const newState = { ...state }
        const { index } = action.payload

        if(typeof index === 'undefined')
            newState.playList = newState.playList.map(value => value.update('checked' , (value) => !value ))
        if(typeof index === 'number')
            newState.playList = newState.playList.updateIn([index , 'checked'] , value => !value )
        return newState
    },
    [ADD_LIST_ITEM] : (state , action) => {
        const newState = { ...state }
        
        const { item } = action.payload
        
        if(Array.isArray(item)) {
            for(const _item of item) {
                _item.checked = false
            }
            newState.playList = newState.playList.concat(item)
        }
        else {
            newState.playList = newState.playList.push(Map({ ...item , checked : false}))
        }
        
        return newState
    },
    [REMOVE_LIST_ITEM_BY_INDEX] : (state , action) => {
        const newState = { ...state}

        const { index } = action.payload

        if(Array.isArray(index)) {
            index.sort((a , b) => b - a)
            for(const _index of index) {
                newState.playList = newState.playList.splice(_index , 1)
            }
        }
        else if(typeof(index) === undefined) {
            newState.playList = newState.playList.clear()
        }
        else {
            newState.playList = newState.playList.splice(index , 1)
        }

        return newState
    },

    [REMOVE_CHECKED_ITEM] : (state , action) => {
        const newState = { ...state }
        newState.playList = newState.playList.filter((value) => !value.get('checked'))
        return newState
    },

    [CHANGE_PLAYING_OPTION] : (state , action) => {
        const newState = { ...state }

        const { loop , random , only } = action.payload 

        if(typeof loop !== 'undefined' && typeof loop === 'boolean')
            newState.playingOption = newState.playingOption.set('loop' , loop)
        if(typeof random !== 'undefined' && typeof random === 'boolean')
            newState.playingOption = newState.playingOption.set('random' , random)
        if(typeof only !== 'undefined' && typeof only === 'boolean')
            newState.playingOption = newState.playingOption.set('only' , only)

        return newState
    },
    [CHANGE_CURRENT_DURATION] : (state , action) => {
        const newState = { ...state }
        const { duration } = action.payload
        newState.currentDuration = duration
        return newState
    }


}, musicPlayerInitialState)

