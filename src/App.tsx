import { useState } from "react"
import { Task, TodolistItem } from "./components/TodoListItem"
import { v1 } from "uuid"
import "./App.css";

export type TaskValues = 'all' | 'active' | 'completed'

export const App = () => {
  let [tasks,setTasks] =useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ])  
  const [filter, setFilter] = useState('all')

  //delete tasks
  const deleteTasks = (taskId: string) => {
    const deleteTasks = tasks.filter(t => t.id !== taskId)
    setTasks(deleteTasks)
  }

  let filteredTasks = tasks
  if(filter === 'active'){
    filteredTasks = tasks.filter(t=> !t.isDone )
  }else if(filter === 'completed'){
    filteredTasks = tasks.filter(t=> t.isDone )
  }
 //filter tasks
  const changeFilter = (filter: TaskValues) => {
    setFilter(filter)
  }
  

  const createTasks = (taskTitle: string) => {
    const newTask =  { id: v1(), title: taskTitle, isDone: true }
    const newTasks = [newTask,...tasks ]
    setTasks(newTasks)
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const task = tasks.find(t=> t.id === taskId)
    if(task){
      task.isDone = isDone
      setTasks([...tasks])
    }
  }


  return(
<TodolistItem 
title="Todolist" 
tasks={filteredTasks}
filter={filter}
deleteTasks={deleteTasks}
changeFilter ={changeFilter}
createTasks = {createTasks}
changeTaskStatus ={changeTaskStatus}
/>

  )
}