import { v1 } from "uuid"
import {FilterValues, TodolistsType } from "../App"


export type ActionType = 
     {type: 'REMOVE-TODOLIST', id: string}
    |{type: 'ADD-TODOLIST',  title: string}
    |{type: 'CHANGE-TODOLIST-TITLE', id: string, title: string}
    |{type: 'CHANGE-TODOLIST-FILTER', id: string, filter: FilterValues}


export const TodolistReducer = (state: TodolistsType[], action: ActionType) => {
    switch(action.type){
        case 'REMOVE-TODOLIST': {
          return  state.filter((t) => t.id !== action.id )
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title:action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map((t) =>
                t.id === action.id ? { ...t, title: action.title } : t
        )}
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map((t) =>
                t.id === action.id ? { ...t, filter: action.filter } : t
        )}
        default:
            throw new Error('I dont understant this  action type')
    }

}


export const RemoveTodolistsAC = (todolistId: string): ActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}


export const AddTodolistAC = (newTitle: string): ActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle}
}

export const ChangeTodolistTitleAC = (todolistId: string,newTitle: string): ActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId,title: newTitle}
}


export const ChangeTodolistFilterAC = (todolistId: string,filter: FilterValues): ActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}