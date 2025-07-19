
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { TasksStateType} from "../app/App";
import { createTodolistAC, deleteTodolistAC, todolistID1, todolistID2 } from "./todolists-reducer";

export const deleteTasksAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTasks')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTasks')
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string,isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string,title: string}>('tasks/changeTaskTitle')

const initialState:TasksStateType = {
    [todolistID1]: [
      { id: nanoid(), title: "HTML&CSS", isDone: true },
      { id: nanoid(), title: "JS", isDone: true },
      { id: nanoid(), title: "ReactJS", isDone: false },
      { id: nanoid(), title: "Rest API", isDone: false },
      { id: nanoid(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: nanoid(), title: "HTML&CSS2", isDone: true },
      { id: nanoid(), title: "JS2", isDone: true },
      { id: nanoid(), title: "ReactJS2", isDone: false },
      { id: nanoid(), title: "Rest API2", isDone: false },
      { id: nanoid(), title: "GraphQL2", isDone: false },
    ],
  }

  export const tasksReducer = createReducer(initialState,(builder)=>{
    builder.addCase(createTodolistAC,(state,action)=>{
        state[action.payload.id] = []
    }).addCase(deleteTodolistAC,(state,action)=> {
        delete state[action.payload.id]
    }).addCase(deleteTasksAC, (state, action) => {
        const { todolistId, taskId } = action.payload;
        const tasks = state[todolistId];
        if (tasks) {
          const index = tasks.findIndex(task => task.id === taskId);
          if (index !== -1) {
            tasks.splice(index, 1); 
          }
        }
      }).addCase(createTaskAC,(state,action)=> {
        const { todolistId, title } = action.payload;
        const newTask = ({id: nanoid(), title, isDone: false})
        state[todolistId].unshift(newTask)
      }).addCase(changeTaskStatusAC,(state,action)=> {
        const tasks = state[action.payload.todolistId]
        const task = tasks.find(t=> t.id === action.payload.taskId)
        if(task) task.isDone = action.payload.isDone
      }).addCase(changeTaskTitleAC,(state,action)=> {
        const tasks = state[action.payload.todolistId]
        const task = tasks.find(t=> t.id === action.payload.taskId)
        if(task) task.title = action.payload.title
      })
  })
