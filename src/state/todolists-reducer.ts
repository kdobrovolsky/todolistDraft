import { v1 } from "uuid";
import { FilterValues, TodolistsType } from "../app/App";
// typeOf - deleteTodolistAC — это значение (функция), а не тип. TypeScript требует явно указать, что вы хотите работать с типом функции, а не с самой функцией.
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC> //ReturnType берет из полученного типа только возвращаемое значение.
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType =DeleteTodolistActionType | CreateTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState:TodolistsType[] = [
  { id: todolistID1, title: "Todolist1", filter: "all" },
  { id: todolistID2, title: "Todolist2", filter: "all" },
]

export const todolistsReducer = (state: TodolistsType[] = initialState , action:ActionType ): TodolistsType[] => {
   switch(action.type){
    case 'delete_todolist':
      return  state.filter((tl) => tl.id !== action.payload.id)
    case 'create_todolist': {
        const newTodolist: TodolistsType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
        return [...state, newTodolist]
    }
     case 'change_todolist_title' :{
       return state.map((t) => (t.id === action.payload.id ? { ...t, title: action.payload.title } : t))
     } 
     case 'change_todolist_filter' :{
        return state.map((t) => (t.id === action.payload.id ? { ...t, filter: action.payload.filter } : t))
      } 

    default:
      return state
   }
 
  }

  export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {id}
  }as const) //as const делает тип более конкретным, т.е. вместо string мы получаем конкретный строковый тип 'delete_todolist'

  export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload:{title,id: v1()}
  }as const)


  export const changeTodolistTitleAC = ({id,title}:{id:string, title: string}) => ({
    type: 'change_todolist_title',
    payload:{id,title}
  }as const)

  export const changeTodolistFilterAC = ({id,filter}:{id: string, filter: FilterValues}) => ({
    type: 'change_todolist_filter',
    payload:{id,filter}
  }as const)