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
  deleteTasks: (taskId: string)=>void
  changeFilter: (filter: TaskValues) => void
  createTasks: () => void
}

export const TodolistItem = ({title,tasks,deleteTasks,changeFilter,createTasks}:TodolistProps) => {
  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title="+" onClick={createTasks}/>
        </div>
        {tasks.length === 0 ? (
           <p>No tasts</p>
        ):( 
        <ul>
          {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            <Button title="X" onClick={()=>deleteTasks(task.id)}/>
          </li>
          ))}
        </ul>
         )}
        <div>
        <Button title="All" onClick={()=>changeFilter('all')}/>
        <Button title="Active" onClick={()=>changeFilter('active')}/>
        <Button title="Completed" onClick={()=>changeFilter('completed')}/>
        </div>
      </div>
  )
}