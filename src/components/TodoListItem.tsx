import { Button } from "./Button"

export type Task = {
  id: number
  title: string
  isDone: boolean
}

type TodolistProps = {
  title: string
  tasks: Task[] 
  deleteTasks: (taskId: number)=>void
}

export const TodolistItem = ({title,tasks,deleteTasks}:TodolistProps) => {
  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title="+"/>
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
        <Button title="All"/>
        <Button title="Active"/>
        <Button title="Completed"/>
        </div>
      </div>
  )
}