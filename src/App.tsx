import { useState } from "react"
import { Task, TodolistItem } from "./components/TodoListItem"


export const App = () => {
  let [tasks,setTasks] =useState<Task[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ])  
 
  //удаление таски
  const deleteTasks = (taskId: number) => {
    const deleteTasks = tasks.filter(t => t.id !== taskId)
    setTasks(deleteTasks)
  }


  return(
<TodolistItem 
title="Todolist" 
tasks={tasks}
deleteTasks={deleteTasks}
/>

  )
}