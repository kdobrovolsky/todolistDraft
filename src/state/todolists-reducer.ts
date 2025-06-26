import { v1 } from "uuid"
import { FilterValues, TodolistsType } from "../App"

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValues
}

export type ActionTypes = RemoveTodoListActionType | AddTotodlistActionType | ChangeTotodlistFilterActionType | ChangeTotodlistTitleActionType   

export const todolistsReducer = (state:TodolistsType[], action: ActionTypes):TodolistsType[] => {
    switch(action.type){
    case 'REMOVE-TODOLIST': {
        return state.filter(tl => tl.id != action.id)
    }

    case 'ADD-TODOLIST': {
        return [...state, {
            id: v1(),
            title: action.title,
            filter: 'all'
        }]
    }

    case 'CHANGE-TODOLIST-TITLE': {
       return state.map((tl) =>
            tl.id === action.id ? { ...tl, title: action.title } : tl
          )
    
    }

    case 'CHANGE-TODOLIST-FILTER':{
        return state.map((tl) =>
            tl.id === action.id ? { ...tl, filter: action.filter } : tl
          )
    }
    
        default:
            throw new Error ("I don't understand this action type")
    }
}

