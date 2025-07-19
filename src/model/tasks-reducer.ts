
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { TasksStateType} from "../app/App";
import { createTodolistAC, deleteTodolistAC, todolistID1, todolistID2 } from "./todolists-reducer";

const deleteTasksAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTasks')
const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTasks')
const changeTaskStatusAC = createAction<{todolistId: string, taskId: string,isDone: boolean}>('tasks/changeTaskStatus')
const changeTaskTitleAC = createAction<{todolistId: string, taskId: string,title: string}>('tasks/changeTaskTitle')



export type DeleteTasksActionType = ReturnType<typeof deleteTasksAC>
export type CreateTasksActionType = ReturnType<typeof createTaskAC>
export type ChangeTasksStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTasksTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ActionType = 
DeleteTasksActionType | 
CreateTasksActionType | 
ChangeTasksStatusActionType |
ChangeTasksTitleActionType

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
      })
  })

// export const tasksReducer2 = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
//     switch(action.type){    
//         case 'delete_tasks':{
//             const stateCopy = {...state}
//             const tasks = state[action.payload.todolistId]
//             const filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
//             stateCopy[action.payload.todolistId] = filteredTasks
//             return stateCopy
//         }

//         case 'create_task': {
//             const newTask = { id:nanoid(), title: action.payload.title, isDone: false };
//             return {
//                 ...state,[action.payload.todolistId]:[newTask, ...state[action.payload.todolistId]]
//             }
//         }

//         case 'change_task_status': {
//             return{
//                 ...state,[action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
//                     t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)
//             }
            
//         }

//         case 'change_task_title': {
//             return{
//                 ...state,[action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
//                     t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t)
//             }
            
//         }
//         default:
//             return state
//     }

// }






