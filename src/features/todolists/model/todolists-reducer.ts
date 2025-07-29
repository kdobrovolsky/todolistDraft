

import { FilterValues, TodolistsType } from "@/app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";



export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolists')
export const createTodolistAC = createAction('todolists/createTodolists', (title)=>{
  return{payload: {title,id: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{id:string,title:string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')

export let todolistID1 =nanoid();
export let todolistID2 =nanoid();

const initialState:TodolistsType[] = [
  { id: todolistID1, title: "Todolist1", filter: "all" },
  { id: todolistID2, title: "Todolist2", filter: "all" },
]

export const todolistsReducer = createReducer(initialState, (builder)=> {
  builder.addCase(deleteTodolistAC, (state,action)=> {
    const index = state.findIndex(todo => todo.id === action.payload.id)
    if (index !== -1) state.splice(index, 1)
  }).addCase(changeTodolistTitleAC,(state,action) => {
    const index = state.findIndex(todo => todo.id === action.payload.id)
    if (index !== -1) state[index].title = action.payload.title
}).addCase(changeTodolistFilterAC,(state,action)=> {
  const index = state.findIndex(todo => todo.id === action.payload.id)
    if (index !== -1) state[index].filter = action.payload.filter
}).addCase(createTodolistAC,(state,action)=> {
  state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
})
}) 








 
