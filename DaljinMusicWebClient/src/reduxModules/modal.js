import { createAction , handleActions } from 'redux-actions'
import { Map , List, fromJS } from 'immutable'



export const MODAL_OPEN = 'modal/OPEN'
export const modalOpen = createAction(MODAL_OPEN)

export const MODAL_CLOSE = 'modal/CLOSE'
export const modalClose = createAction(MODAL_CLOSE)

export const MODAL_SET_CONTENTS = 'modal/SET_CONTENTS'
export const modalSetContents = createAction(MODAL_SET_CONTENTS)

const modalInitialState = {
    show : false,
    showTitleBar : true,
    showButtons : true,

    contents : Map({
        title : '',
        body : List([]),
        buttons : List([]),
    })
}

export const modalReducer = handleActions({
    [MODAL_OPEN] : (state , action) => {
        const newState = { ...state }
        newState.show = true
        return newState
    },
    [MODAL_CLOSE] : (state , action) => {
        const newState = { ...state }
        newState.show = false
        return newState
    },
    [MODAL_SET_CONTENTS] : (state , action) => {
        const newState = { ...state }
        const { title , body , buttons } = action.payload
        newState.contents = newState.contents.set('title' , title).update('body' , (list) => list.clear().concat(fromJS(body))).update('buttons' , (list)=>list.clear().concat(fromJS(buttons)))
        return newState
    },
} , modalInitialState)