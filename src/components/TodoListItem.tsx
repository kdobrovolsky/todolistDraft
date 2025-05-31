import { ChangeEvent, useState,KeyboardEvent } from "react"
import { TaskValues } from "../App"
import { Button } from "./Button"


export type Task = {
  id: string
  title: string
  isDone: boolean
}

type TodolistProps = {
  title: string
  tasks: Task[] 
  filter: string
  deleteTasks: (taskId: string)=>void
  changeFilter: (filter: TaskValues) => void
  createTasks: (taskTitle:string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({title,tasks,filter,deleteTasks,changeFilter,createTasks,changeTaskStatus}:TodolistProps) => {

  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string|null>(null)

  const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    setError(null)
  }

  const onClickButtonHandler =() => {
    if(taskTitle !== ''){
   createTasks(taskTitle.trim())
   setTaskTitle('')
  }else{
    setError('Title is required')
  }
  }

  const onKeyDownHangler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(taskTitle !== '' && event.key === 'Enter'){
        onClickButtonHandler()
            }
  }

  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input className={error ? 'error': ''} 
          value={taskTitle} 
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHangler}
          />
          <Button title="+" onClick={onClickButtonHandler} disabled={taskTitle === ''}/>
          {error && <div className={"error-message"}>{error}</div>}
        </div>
        {tasks.length === 0 ? (
           <p>No tasts</p>
        ):( 
        <ul>
          {tasks.map(task => {
             const onChangeCheckedHandler = (e:ChangeEvent<HTMLInputElement>) => {
             const newStatusValue = e.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue)
             }
          return(
           
          <li key={task.id} className={task.isDone? 'is-done': ''}>
            <input type="checkbox" checked={task.isDone} onChange={onChangeCheckedHandler}/> <span>{task.title}</span>
            <Button title="X" onClick={()=>deleteTasks(task.id)}/>
          </li>
          )
          })}
        </ul>
         )}
        <div>
        <Button className={filter === 'all'?'active-filter':''} title="All" onClick={()=>changeFilter('all')}/>
        <Button className={filter === 'active'?'active-filter':''} title="Active" onClick={()=>changeFilter('active')}/>
        <Button className={filter === 'completed'?'active-filter':''} title="Completed" onClick={()=>changeFilter('completed')}/>
        </div>
      </div>
  )
}