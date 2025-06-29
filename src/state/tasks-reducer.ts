import { v1 } from "uuid"
import {FilterValues, TasksStateType, TodolistsType } from "../App"


export type ActionType = 
     {type: 'REMOVE-TASK', taskId: string, todolistId: string}
    |{type: 'ADD-TASK',  title: string, todolistId: string}
    |{type: 'CHANGE-TASK-STATUS', taskId: string,todolistId: string , isDone:boolean}
    |{type: 'CHANGE-TASK-TITLE', taskId: string,todolistId: string , title:string}
    |{type: 'ADD-TODOLIST', taskId: string,todolistId: string , title:string}


export const TasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    switch(action.type){
      case 'REMOVE-TASK' : {
        const stateCopy = {...state}
        const tasks = state[action.todolistId]
        const filteredTasks = tasks.filter(t=> t.id !== action.taskId)
        stateCopy[action.todolistId] = filteredTasks
        return stateCopy
      }
      case 'ADD-TASK' : {
        const stateCopy = {...state}
        const tasks = state[action.todolistId]
        const newTask = { id: v1(), title: action.title, isDone: false }
        const newTasks = [newTask, ...tasks]
        stateCopy[action.todolistId] = newTasks;
        return stateCopy
      } case 'CHANGE-TASK-STATUS' : {
        const stateCopy = {...state}
        const tasks = state[action.todolistId]
        const changeTaskState = tasks.map((t) =>t.id === action.taskId ? { ...t, isDone:action.isDone } : t)
        stateCopy[action.todolistId] = changeTaskState
        return stateCopy
      }case 'CHANGE-TASK-TITLE' : {
        const stateCopy = {...state}
        const tasks = state[action.todolistId]
        const changeTaskState = tasks.map((t) =>t.id === action.taskId ? { ...t, title: action.title } : t)
        stateCopy[action.todolistId] = changeTaskState
        return stateCopy
      }case 'ADD-TODOLIST' : {
        const stateCopy = {...state}
        stateCopy[v1()] = []
        return stateCopy
      }

        default:
            throw new Error('I dont understant this  action type')
    }
}

export const removeTaskAC = (taskId: string,todolistId: string): ActionType => {
    return {type: 'REMOVE-TASK',taskId, todolistId}
}


export const addTaskAC  = (title: string,todolistId: string): ActionType => {
    return {type: 'ADD-TASK', title , todolistId}
}

export const changeTaskStatusAC  = (taskId: string, isDone:boolean,todolistId: string,): ActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone,todolistId,}
}


export const changeTaskTitleAC  = (taskId: string, title:string,todolistId: string,): ActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title,todolistId,}
}

export const addTodolistAC =(title: string) => {
return {type: 'ADD-TODOLIST', title}
}
